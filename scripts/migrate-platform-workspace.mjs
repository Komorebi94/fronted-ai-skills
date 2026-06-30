import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validatePlatformWorkspace } from "./lib/platform-workspace-validator.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const CURSOR_INTRO =
  /This repository configures how the Cursor agent works under `\.cursor\/`\. This file\s*\nexplains how the layers fit together, how they are invoked, and how conflicts\s*\nand duplication are resolved\./;

function readText(filePath) {
  return readFileSync(filePath, "utf8");
}

function writeText(filePath, content) {
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, content, "utf8");
}

function normalizePlatformReferences(content, platformPrefix) {
  return content
    .replace(/`rules\/([a-z-]+)\.mdc`/g, `\`${platformPrefix}/rules/$1.md\``)
    .replace(/`output\.mdc`/g, `\`${platformPrefix}/rules/output.md\``)
    .replaceAll("rules/*.mdc", `${platformPrefix}/rules/*.md`)
    .replaceAll("`.mdc`", "`.md`");
}

function convertMdcToCodexRule(content) {
  return content.replace(/^---[\s\S]*?---\n?/, "").trimStart();
}

function convertMdcToClaudeRule(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!frontmatterMatch) return content;

  const [, frontmatter, body] = frontmatterMatch;
  const globsMatch = frontmatter.match(/^globs:\s*(.+)$/m);
  if (!globsMatch) {
    return body.trimStart();
  }

  const paths = globsMatch[1].trim().replace(/^["']|["']$/g, "");
  return `---\npaths:\n  - ${paths}\n---\n\n${body.trimStart()}`;
}

function migrateRules(cursorDir, targetDir, platform) {
  const rulesSrc = path.join(cursorDir, "rules");
  const rulesDest = path.join(targetDir, "rules");
  mkdirSync(rulesDest, { recursive: true });

  for (const file of readdirSync(rulesSrc)) {
    if (!file.endsWith(".mdc")) continue;
    const content = readText(path.join(rulesSrc, file));
    const outName = file.replace(/\.mdc$/, ".md");
    const converted =
      platform === "claude" ? convertMdcToClaudeRule(content) : convertMdcToCodexRule(content);
    writeText(path.join(rulesDest, outName), converted);
  }
}

function migrateSkills(cursorDir, targetDir, platformPrefix) {
  const skillsSrc = path.join(cursorDir, "skills");
  const skillsDest = path.join(targetDir, "skills");

  for (const skillName of readdirSync(skillsSrc)) {
    const skillFile = path.join(skillsSrc, skillName, "SKILL.md");
    if (!existsSync(skillFile)) continue;
    const content = normalizePlatformReferences(readText(skillFile), platformPrefix);
    writeText(path.join(skillsDest, skillName, "SKILL.md"), content);
  }
}

function migrateCommands(cursorDir, targetDir, platform) {
  const commandsSrc = path.join(cursorDir, "commands");
  const commandsDest = path.join(targetDir, "commands");
  mkdirSync(commandsDest, { recursive: true });

  for (const file of readdirSync(commandsSrc)) {
    if (!file.startsWith("base-command-") || !file.endsWith(".md")) continue;
    const commandName = file.replace(/^base-command-/, "").replace(/\.md$/, "");
    const outName = platform === "claude" ? `${commandName}.md` : file;
    const platformPrefix = platform === "claude" ? ".claude" : ".codex";
    const content = readText(path.join(commandsSrc, file)).replaceAll(".cursor/", `${platformPrefix}/`);
    writeText(path.join(commandsDest, outName), content);
  }
}

function migrateFlatDir(cursorDir, subdir, targetDir, platformPrefix) {
  const src = path.join(cursorDir, subdir);
  const dest = path.join(targetDir, subdir);
  mkdirSync(dest, { recursive: true });

  for (const file of readdirSync(src)) {
    const content = readText(path.join(src, file)).replaceAll(".cursor/", `${platformPrefix}/`);
    writeText(path.join(dest, file), content);
  }
}

function migrateManifest(cursorDir, targetDir, platformPrefix, platform) {
  let content = readText(path.join(cursorDir, "manifest.yaml"));
  content = content.replaceAll(".cursor/", `${platformPrefix}/`);
  if (platform === "claude") {
    content = content.replaceAll("/base-command-", "/");
  }
  writeText(path.join(targetDir, "manifest.yaml"), content);
}

function buildRulesIndex(root, platformPrefix) {
  const rulesDir = path.join(root, platformPrefix, "rules");
  const files = readdirSync(rulesDir)
    .filter((f) => f.endsWith(".md"))
    .sort();

  return files
    .map((file) => {
      const body = readText(path.join(rulesDir, file)).replace(/^---[\s\S]*?---\n?/, "");
      const titleMatch = body.match(/^# (.+)$/m);
      const title = titleMatch ? titleMatch[1] : file.replace(/\.md$/, "");
      return `- \`${platformPrefix}/rules/${file}\` — ${title}`;
    })
    .join("\n");
}

function transformOperatingGuide(base, { title, intro, platformPrefix, rulesRow, commandsRow }) {
  let content = base
    .replace(/^# Cursor Operating Guide/m, title)
    .replace(CURSOR_INTRO, intro)
    .replaceAll(".cursor/", `${platformPrefix}/`)
    .replace(
      /\| Rules \| `[^`]+` \| Cross-cutting baselines[^\|]*\| [^|]+ \|/,
      rulesRow,
    )
    .replace(
      /\| Commands \| `[^`]+` \| [^|]+ \| [^|]+ \|/,
      commandsRow,
    );

  return normalizePlatformReferences(content, platformPrefix);
}

function buildCodexAgentsMd(cursorDir, root) {
  const base = readText(path.join(cursorDir, "AGENTS.md"));
  let content = transformOperatingGuide(base, {
    title: "# Codex Operating Guide",
    intro:
      "This repository configures how Codex works under `.codex/`. Copy `.codex/AGENTS.md` to the project root as `AGENTS.md`, and copy `.codex/skills/` to `.agents/skills/` when deploying. This file explains how the layers fit together, how they are invoked, and how conflicts and duplication are resolved.",
    platformPrefix: ".codex",
    rulesRow:
      "| Rules | `.codex/rules/*.md` | Cross-cutting baselines for behavior, quality, security, performance, testing, output, and TypeScript | Referenced from root `AGENTS.md`; read before work |",
    commandsRow:
      "| Commands | `.codex/commands/base-command-*.md` | Workflow entry points and boundaries | Named in prompt or via `$skill-name` |",
  });

  content += `

## Global Baselines (Codex)

Codex loads \`AGENTS.md\` at session start. Treat these rule files as always-on constraints and read them when relevant:

${buildRulesIndex(root, ".codex")}

Path-scoped rule: \`.codex/rules/typescript.md\` applies when editing \`**/*.{ts,tsx}\`.

## Codex Deployment

1. Copy \`.codex/AGENTS.md\` to your project root as \`AGENTS.md\` (merge with existing if needed).
2. Copy \`.codex/skills/*\` to \`.agents/skills/\` in your project.
3. Reference \`.codex/templates/\` and \`.codex/examples/\` from commands and skills.
4. Optionally add \`.codex/rules/typescript.md\` content under a TypeScript subdirectory \`AGENTS.md\` for path-scoped guidance.
`;

  return content;
}

function buildClaudeMd(cursorDir, root) {
  const base = readText(path.join(cursorDir, "AGENTS.md"));
  let content = transformOperatingGuide(base, {
    title: "# Claude Code Operating Guide",
    intro:
      "This repository configures how Claude Code works under `.claude/`. Claude loads `.claude/CLAUDE.md` every session. This file explains how the layers fit together, how they are invoked, and how conflicts and duplication are resolved.",
    platformPrefix: ".claude",
    rulesRow:
      "| Rules | `.claude/rules/*.md` | Cross-cutting baselines; optional `paths:` frontmatter for file-scoped rules | Loaded every session or when matching files are opened |",
    commandsRow:
      "| Commands | `.claude/commands/*.md` | User intent entry points | Invoked with `/command-name` |",
  });

  content += `

## Global Baselines (Claude Code)

Rules in \`.claude/rules/\` load every session (or when \`paths:\` matches open files):

${buildRulesIndex(root, ".claude")}

## Claude Code Deployment

1. Use \`.claude/CLAUDE.md\` as project memory (or copy/symlink to root \`CLAUDE.md\`).
2. Rules in \`.claude/rules/\` load automatically; \`typescript.md\` uses \`paths:\` for \`**/*.{ts,tsx}\`.
3. Skills in \`.claude/skills/\` are invoked with \`/skill-name\` or auto-matched by description.
4. Commands in \`.claude/commands/\` map to slash commands (e.g. \`/implement\`, \`/review\`).
`;

  return content;
}

export function migratePlatform(platform, { root = rootDir } = {}) {
  const cursorDir = path.join(root, ".cursor");
  const targetDir = path.join(root, platform === "codex" ? ".codex" : ".claude");
  const platformPrefix = platform === "codex" ? ".codex" : ".claude";

  if (!existsSync(cursorDir)) {
    throw new Error(`Missing .cursor directory at ${cursorDir}`);
  }

  if (existsSync(targetDir)) {
    rmSync(targetDir, { recursive: true, force: true });
  }
  mkdirSync(targetDir, { recursive: true });

  migrateRules(cursorDir, targetDir, platform);
  migrateSkills(cursorDir, targetDir, platformPrefix);
  migrateCommands(cursorDir, targetDir, platform);
  migrateFlatDir(cursorDir, "templates", targetDir, platformPrefix);
  migrateFlatDir(cursorDir, "examples", targetDir, platformPrefix);
  migrateManifest(cursorDir, targetDir, platformPrefix, platform);

  if (platform === "codex") {
    writeText(path.join(targetDir, "AGENTS.md"), buildCodexAgentsMd(cursorDir, root));
  } else {
    writeText(path.join(targetDir, "CLAUDE.md"), buildClaudeMd(cursorDir, root));
  }

  return targetDir;
}

export function migrateAllPlatforms({ root = rootDir } = {}) {
  migratePlatform("codex", { root });
  migratePlatform("claude", { root });
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url);

if (isMain) {
  migrateAllPlatforms();
  const { errors, ok } = validatePlatformWorkspace(rootDir);
  if (!ok) {
    console.error("Platform workspace validation failed:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }
  console.log("Migrated .cursor → .codex/");
  console.log("Migrated .cursor → .claude/");
  console.log("Platform migration complete.");
}

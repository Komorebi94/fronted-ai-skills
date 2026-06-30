import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const requiredCommandSections = [
  "# Objective",
  "# Use This When",
  "# Do Not Use This When",
  "# Use Relevant Skills",
  "# Constraints",
  "# Output",
];

const requiredSkillSections = [
  "## When To Use",
  "## Core Principles",
  "## Workflow",
  "## Checklist",
  "## Common Pitfalls",
  "## Verification",
  "## Output Format",
];

const AGENTS_ARTIFACT_ROWS = new Set(["implement (api work)", "pull request body"]);

export function parseInlineList(value) {
  const trimmed = value.trim();
  if (!trimmed || trimmed === "[]") return [];
  return trimmed
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function parseManifest(text) {
  const result = { commands: [], artifacts: [], skills: [] };
  let section = null;
  let current = null;

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trimEnd();

    if (line === "commands:" || line === "artifacts:" || line === "skills:") {
      section = line.slice(0, -1);
      current = null;
      continue;
    }

    const entryMatch = line.match(/^  - name: (.+)$/);
    if (entryMatch && section) {
      current = { name: entryMatch[1].trim() };
      result[section].push(current);
      continue;
    }

    const keyMatch = line.match(/^    ([a-z]+):(?: (.*))?$/);
    if (keyMatch && current) {
      const [, key, rawValue = ""] = keyMatch;
      current[key] =
        key === "skills" || key === "rules" ? parseInlineList(rawValue) : rawValue.trim() || null;
    }
  }

  return result;
}

export function normalizeTemplatePath(value) {
  if (!value) return null;
  const trimmed = value.trim().replace(/^`|`$/g, "");
  if (trimmed.startsWith(".cursor/templates/")) return trimmed;
  return `.cursor/templates/${trimmed}`;
}

export function normalizeExamplePath(value) {
  if (!value) return null;
  const trimmed = value.trim().replace(/^`|`$/g, "");
  if (!trimmed || trimmed === "—" || trimmed === "-") return null;
  if (trimmed.startsWith(".cursor/examples/")) return trimmed;
  return `.cursor/examples/${trimmed}`;
}

export function parseAgentsCommandMap(agentsText) {
  const sectionMatch = agentsText.match(
    /### Command ↔ Template ↔ Example Map\n\n([\s\S]*?)\n\nThe machine-readable source/,
  );
  if (!sectionMatch) {
    return { rows: [], error: "Could not find Command ↔ Template ↔ Example Map section" };
  }

  const rows = [];
  for (const line of sectionMatch[1].split("\n")) {
    if (!line.startsWith("| `")) continue;

    const match = line.match(/^\| `([^`]+)` \| `([^`]+)` \| (.+) \|$/);
    if (!match) continue;

    const [, commandName, template, exampleCell] = match;
    const normalizedName = commandName.trim().toLowerCase();
    if (AGENTS_ARTIFACT_ROWS.has(normalizedName)) continue;

    rows.push({
      name: commandName.trim(),
      template: normalizeTemplatePath(template),
      example: normalizeExamplePath(exampleCell.trim()),
    });
  }

  return { rows, error: null };
}

function readText(rootDir, relativePath) {
  return readFileSync(path.join(rootDir, relativePath), "utf8");
}

function relativeExists(rootDir, relativePath) {
  return existsSync(path.join(rootDir, relativePath));
}

function listFiles(rootDir, relativeDir, predicate) {
  const directory = path.join(rootDir, relativeDir);
  if (!existsSync(directory)) return [];

  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && predicate(entry.name))
    .map((entry) => path.join(relativeDir, entry.name));
}

function listSkillDirs(rootDir) {
  const skillsDir = path.join(rootDir, ".cursor/skills");
  if (!existsSync(skillsDir)) return [];

  return readdirSync(skillsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

function listSkillFiles(rootDir) {
  return listSkillDirs(rootDir).map((name) => `.cursor/skills/${name}/SKILL.md`);
}

function assertFile(rootDir, errors, relativePath, label) {
  if (!relativePath) return;
  if (!relativeExists(rootDir, relativePath)) {
    errors.push(`${label} does not exist: ${relativePath}`);
  }
}

function hasFrontmatterDescription(text) {
  return /^---[\s\S]*?\ndescription:\s+\S[\s\S]*?\n---/.test(text);
}

export function validateWorkspace(rootDir, { strict = false } = {}) {
  const errors = [];
  const warnings = [];
  const manifestPath = path.join(rootDir, ".cursor/manifest.yaml");
  const agentsPath = path.join(rootDir, "AGENTS.md");

  if (!existsSync(manifestPath)) {
    errors.push("Missing .cursor/manifest.yaml");
    return { errors, warnings, ok: false };
  }

  const manifest = parseManifest(readFileSync(manifestPath, "utf8"));
  const commandFiles = new Set(listFiles(rootDir, ".cursor/commands", (name) => name.endsWith(".md")));
  const templateFiles = new Set(
    listFiles(rootDir, ".cursor/templates", (name) => name.endsWith(".template.md")),
  );
  const exampleFiles = new Set(
    listFiles(rootDir, ".cursor/examples", (name) => name.endsWith(".example.md")),
  );
  const referencedTemplates = new Set();
  const referencedExamples = new Set();
  const manifestCommandFiles = new Set();
  const manifestSkillNames = new Set((manifest.skills ?? []).map((skill) => skill.name));
  const referencedSkillNames = new Set();
  const primaryTemplateOwners = new Map();

  for (const skill of manifest.skills ?? []) {
    assertFile(rootDir, errors, skill.file, `Skill "${skill.name}" file`);
    const expectedPath = `.cursor/skills/${skill.name}/SKILL.md`;
    if (skill.file && skill.file !== expectedPath) {
      errors.push(`Skill "${skill.name}" file path should be ${expectedPath}, got ${skill.file}`);
    }
  }

  for (const skillDir of listSkillDirs(rootDir)) {
    if (!manifestSkillNames.has(skillDir)) {
      errors.push(`Skill directory is not listed in manifest.skills: ${skillDir}`);
    }
  }

  for (const command of manifest.commands) {
    assertFile(rootDir, errors, command.file, `Command "${command.name}" file`);
    assertFile(rootDir, errors, command.template, `Command "${command.name}" template`);
    assertFile(rootDir, errors, command.example, `Command "${command.name}" example`);

    if (!command.example) {
      const message = `Command "${command.name}" has no example`;
      if (strict) errors.push(message);
      else warnings.push(message);
    }

    if (command.file) manifestCommandFiles.add(command.file);
    if (command.template) referencedTemplates.add(command.template);
    if (command.example) referencedExamples.add(command.example);

    if (command.template) {
      const owner = primaryTemplateOwners.get(command.template);
      if (owner) {
        errors.push(
          `Template ${command.template} is primary for both "${owner}" and "${command.name}"`,
        );
      } else {
        primaryTemplateOwners.set(command.template, command.name);
      }
    }

    for (const skill of command.skills ?? []) {
      referencedSkillNames.add(skill);
      const skillPath = `.cursor/skills/${skill}/SKILL.md`;
      assertFile(rootDir, errors, skillPath, `Command "${command.name}" skill "${skill}"`);
      if (!manifestSkillNames.has(skill)) {
        errors.push(`Command "${command.name}" references skill not listed in manifest.skills: ${skill}`);
      }
    }

    if (!command.file || !relativeExists(rootDir, command.file)) continue;

    const commandText = readText(rootDir, command.file);
    if (!hasFrontmatterDescription(commandText)) {
      errors.push(`Command "${command.name}" missing frontmatter description`);
    }

    for (const section of requiredCommandSections) {
      if (!commandText.includes(section)) {
        errors.push(`Command "${command.name}" missing section: ${section}`);
      }
    }

    if (command.template && !commandText.includes(`Use \`${command.template}\``)) {
      errors.push(`Command "${command.name}" does not reference template: ${command.template}`);
    }

    for (const skill of command.skills ?? []) {
      if (!commandText.includes(`\`${skill}\``)) {
        errors.push(`Command "${command.name}" does not reference skill: ${skill}`);
      }
    }
  }

  for (const artifact of manifest.artifacts) {
    assertFile(rootDir, errors, artifact.template, `Artifact "${artifact.name}" template`);
    assertFile(rootDir, errors, artifact.example, `Artifact "${artifact.name}" example`);

    if (artifact.template) referencedTemplates.add(artifact.template);
    if (artifact.example) referencedExamples.add(artifact.example);
  }

  for (const commandFile of commandFiles) {
    if (!manifestCommandFiles.has(commandFile)) {
      errors.push(`Command file is not listed in manifest: ${commandFile}`);
    }
  }

  for (const templateFile of templateFiles) {
    if (!referencedTemplates.has(templateFile)) {
      errors.push(`Template is not referenced by manifest: ${templateFile}`);
    }
  }

  for (const exampleFile of exampleFiles) {
    if (!referencedExamples.has(exampleFile)) {
      errors.push(`Example is not referenced by manifest: ${exampleFile}`);
    }
  }

  for (const skillName of manifestSkillNames) {
    if (!referencedSkillNames.has(skillName)) {
      warnings.push(`Skill "${skillName}" is listed in manifest but not referenced by any command`);
    }
  }

  for (const skillFile of listSkillFiles(rootDir)) {
    assertFile(rootDir, errors, skillFile, "Skill file");
    if (!relativeExists(rootDir, skillFile)) continue;

    const skillText = readText(rootDir, skillFile);
    for (const section of requiredSkillSections) {
      if (!skillText.includes(section)) {
        errors.push(`Skill missing section ${section}: ${skillFile}`);
      }
    }
  }

  if (existsSync(agentsPath)) {
    const agentsText = readFileSync(agentsPath, "utf8");
    const { rows, error } = parseAgentsCommandMap(agentsText);

    if (error) {
      errors.push(`AGENTS.md: ${error}`);
    } else {
      const agentsByName = new Map(rows.map((row) => [row.name, row]));
      const manifestByName = new Map(manifest.commands.map((command) => [command.name, command]));

      for (const command of manifest.commands) {
        const agentsRow = agentsByName.get(command.name);
        if (!agentsRow) {
          errors.push(`AGENTS.md missing command in map: ${command.name}`);
          continue;
        }

        if (agentsRow.template !== command.template) {
          errors.push(
            `AGENTS.md template mismatch for "${command.name}": manifest=${command.template}, agents=${agentsRow.template}`,
          );
        }

        const manifestExample = command.example ?? null;
        if (agentsRow.example !== manifestExample) {
          errors.push(
            `AGENTS.md example mismatch for "${command.name}": manifest=${manifestExample ?? "none"}, agents=${agentsRow.example ?? "none"}`,
          );
        }
      }

      for (const row of rows) {
        if (!manifestByName.has(row.name)) {
          errors.push(`AGENTS.md lists unknown command: ${row.name}`);
        }
      }
    }
  } else {
    errors.push("Missing AGENTS.md");
  }

  return { errors, warnings, ok: errors.length === 0 };
}

export {
  requiredCommandSections,
  requiredSkillSections,
};

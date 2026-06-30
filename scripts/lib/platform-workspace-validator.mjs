import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { parseManifest } from "./cursor-workspace-validator.mjs";

const PLATFORM_CONFIG = {
  codex: {
    dir: ".codex",
    guideFile: "AGENTS.md",
  },
  claude: {
    dir: ".claude",
    guideFile: "CLAUDE.md",
  },
};

const ORPHANED_INTRO = /^explains how the layers fit together/m;

function readText(rootDir, relativePath) {
  return readFileSync(path.join(rootDir, relativePath), "utf8");
}

function assertGuideIntro(errors, rootDir, platformKey, guideRelativePath) {
  const guidePath = path.join(rootDir, guideRelativePath);
  if (!existsSync(guidePath)) {
    errors.push(`Missing ${guideRelativePath}`);
    return;
  }

  const lines = readText(rootDir, guideRelativePath).split(/\r?\n/);
  for (const line of lines) {
    if (ORPHANED_INTRO.test(line.trim())) {
      errors.push(`${guideRelativePath} has broken intro (orphaned continuation line)`);
      break;
    }
  }
}

function assertNoMdcReferences(errors, rootDir, platformDir, guideFile) {
  const fullGuide = path.join(rootDir, platformDir, guideFile);
  if (!existsSync(fullGuide)) return;

  const text = readFileSync(fullGuide, "utf8");
  if (/`rules\/[a-z-]+\.mdc`/.test(text)) {
    errors.push(`${platformDir}/${guideFile} still references rules/*.mdc`);
  }
  if (/`output\.mdc`/.test(text)) {
    errors.push(`${platformDir}/${guideFile} still references output.mdc`);
  }
}

export function validatePlatformWorkspace(rootDir, { platforms = ["codex", "claude"] } = {}) {
  const errors = [];

  for (const platformKey of platforms) {
    const { dir: platformDir, guideFile } = PLATFORM_CONFIG[platformKey];
    const manifestPath = path.join(platformDir, "manifest.yaml");
    const fullManifest = path.join(rootDir, manifestPath);

    if (!existsSync(fullManifest)) {
      errors.push(`Missing ${manifestPath}`);
      continue;
    }

    const manifest = parseManifest(readText(rootDir, manifestPath));
    assertGuideIntro(errors, rootDir, platformKey, path.join(platformDir, guideFile));
    assertNoMdcReferences(errors, rootDir, platformDir, guideFile);

    for (const command of manifest.commands ?? []) {
      if (!command.file) continue;

      if (platformKey === "claude" && command.file.includes("base-command-")) {
        errors.push(`Claude manifest uses stale base-command path: ${command.file}`);
      }

      const commandPath = path.join(rootDir, command.file);
      if (!existsSync(commandPath)) {
        errors.push(`Platform command file does not exist: ${command.file}`);
      }
    }
  }

  return { errors, ok: errors.length === 0 };
}

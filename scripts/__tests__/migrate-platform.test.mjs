import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { migrateAllPlatforms } from "../migrate-platform-workspace.mjs";
import { validatePlatformWorkspace } from "../lib/platform-workspace-validator.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("claude manifest paths match command files", () => {
  migrateAllPlatforms({ root: rootDir });

  for (const line of readFileSync(path.join(rootDir, ".claude/manifest.yaml"), "utf8").split("\n")) {
    const match = line.match(/^\s+file: (.+)$/);
    if (!match) continue;
    const filePath = match[1].trim();
    if (!filePath.includes("/commands/")) continue;

    assert.ok(!filePath.includes("base-command-"), `stale path: ${filePath}`);
    assert.ok(existsSync(path.join(rootDir, filePath)), `missing: ${filePath}`);
  }
});

test("platform guides have intact intro and no stale mdc references", () => {
  migrateAllPlatforms({ root: rootDir });

  for (const [platformDir, guideFile] of [
    [".codex", "AGENTS.md"],
    [".claude", "CLAUDE.md"],
  ]) {
    const text = readFileSync(path.join(rootDir, platformDir, guideFile), "utf8");
    const lines = text.split(/\r?\n/);

    assert.ok(
      !lines.some((line) => /^explains how the layers fit together/.test(line.trim())),
      `${platformDir}/${guideFile} has broken intro`,
    );
    assert.ok(!/`rules\/[a-z-]+\.mdc`/.test(text), `${platformDir}/${guideFile} still has rules/*.mdc`);
    assert.ok(!/`output\.mdc`/.test(text), `${platformDir}/${guideFile} still has output.mdc`);
  }
});

test("validatePlatformWorkspace passes after migration", () => {
  migrateAllPlatforms({ root: rootDir });
  const result = validatePlatformWorkspace(rootDir);
  assert.deepEqual(result.errors, []);
  assert.equal(result.ok, true);
});

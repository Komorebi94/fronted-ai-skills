import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  normalizeExamplePath,
  normalizeTemplatePath,
  parseAgentsCommandMap,
  parseInlineList,
  parseManifest,
  validateWorkspace,
} from "../lib/cursor-workspace-validator.mjs";

test("parseInlineList handles empty and populated lists", () => {
  assert.deepEqual(parseInlineList("[]"), []);
  assert.deepEqual(parseInlineList("[a, b, c]"), ["a", "b", "c"]);
});

test("parseManifest reads commands, artifacts, and skills", () => {
  const manifest = parseManifest(`
version: 1

commands:
  - name: ask
    file: .cursor/commands/base-command-ask.md
    skills: []
    template: .cursor/templates/answer.template.md
    example:

skills:
  - name: frontend-engineering
    file: .cursor/skills/frontend-engineering/SKILL.md

artifacts:
  - name: pull-request
    template: .cursor/templates/pr-description.template.md
    example:
`);

  assert.equal(manifest.commands.length, 1);
  assert.equal(manifest.skills.length, 1);
  assert.equal(manifest.artifacts.length, 1);
  assert.equal(manifest.commands[0].name, "ask");
});

test("normalizeTemplatePath and normalizeExamplePath", () => {
  assert.equal(normalizeTemplatePath("answer.template.md"), ".cursor/templates/answer.template.md");
  assert.equal(normalizeExamplePath("—"), null);
  assert.equal(
    normalizeExamplePath("review-finding.example.md"),
    ".cursor/examples/review-finding.example.md",
  );
});

test("parseAgentsCommandMap skips artifact rows", () => {
  const agentsText = `
### Command ↔ Template ↔ Example Map

| Command | Template | Example |
|---|---|---|
| \`ask\` | \`answer.template.md\` | — |
| \`implement\` (API work) | \`api-integration.template.md\` | \`api-integration.example.md\` |
| Pull request body | \`pr-description.template.md\` | \`pr-description.example.md\` |

The machine-readable source for this mapping is \`.cursor/manifest.yaml\`.
`;

  const { rows, error } = parseAgentsCommandMap(agentsText);
  assert.equal(error, null);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].name, "ask");
});

test("validateWorkspace passes for the real repository", () => {
  const rootDir = path.resolve(import.meta.dirname, "../..");
  const result = validateWorkspace(rootDir);
  assert.equal(result.ok, true, result.errors.join("\n"));
});

test("validateWorkspace reports missing AGENTS command rows", () => {
  const tempDir = mkdtempSync(path.join(os.tmpdir(), "cursor-workspace-"));

  try {
    writeFixture(tempDir, {
      missingAgentsCommand: true,
    });

    const result = validateWorkspace(tempDir);
    assert.equal(result.ok, false);
    assert.ok(result.errors.some((error) => error.includes(".cursor/AGENTS.md missing command")));
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});

test("validateWorkspace strict mode requires examples", () => {
  const tempDir = mkdtempSync(path.join(os.tmpdir(), "cursor-workspace-"));

  try {
    writeFixture(tempDir, {
      includeExample: false,
    });

    const relaxed = validateWorkspace(tempDir);
    assert.equal(relaxed.ok, true);
    assert.ok(relaxed.warnings.some((warning) => warning.includes("has no example")));

    const strict = validateWorkspace(tempDir, { strict: true });
    assert.equal(strict.ok, false);
    assert.ok(strict.errors.some((error) => error.includes("has no example")));
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});

function writeFixture(rootDir, { missingAgentsCommand = false, includeExample = true } = {}) {
  mkdirSync(path.join(rootDir, ".cursor/commands"), { recursive: true });
  mkdirSync(path.join(rootDir, ".cursor/templates"), { recursive: true });
  mkdirSync(path.join(rootDir, ".cursor/examples"), { recursive: true });
  mkdirSync(path.join(rootDir, ".cursor/skills/demo-skill"), { recursive: true });

  const commandBody = `---
description: Demo command
---

# Objective

Demo.

# Use This When

- Demo.

# Do Not Use This When

- Never.

# Use Relevant Skills

- Use \`demo-skill\` for demo work.

# Constraints

- Demo.

# Output

Use \`.cursor/templates/answer.template.md\` as the primary output shape.
`;

  writeFileSync(path.join(rootDir, ".cursor/commands/base-command-ask.md"), commandBody);
  writeFileSync(path.join(rootDir, ".cursor/templates/answer.template.md"), "# Answer\n");
  if (includeExample) {
    writeFileSync(path.join(rootDir, ".cursor/examples/answer.example.md"), "# Answer Example\n");
  }

  writeFileSync(
    path.join(rootDir, ".cursor/skills/demo-skill/SKILL.md"),
    `# Demo Skill

## When To Use

Demo.

## Core Principles

Demo.

## Workflow

1. Demo.

## Checklist

- Demo.

## Common Pitfalls

- Demo.

## Verification

- Demo.

## Output Format

Demo.
`,
  );

  writeFileSync(
    path.join(rootDir, ".cursor/manifest.yaml"),
    `version: 1

commands:
  - name: ask
    file: .cursor/commands/base-command-ask.md
    skills: [demo-skill]
    template: .cursor/templates/answer.template.md
    example: ${includeExample ? ".cursor/examples/answer.example.md" : ""}

skills:
  - name: demo-skill
    file: .cursor/skills/demo-skill/SKILL.md

artifacts: []
`,
  );

  const agentsRows = missingAgentsCommand
    ? ""
    : `| \`ask\` | \`answer.template.md\` | ${includeExample ? "`answer.example.md`" : "—"} |`;

  writeFileSync(
    path.join(rootDir, ".cursor/AGENTS.md"),
    `### Command ↔ Template ↔ Example Map

| Command | Template | Example |
|---|---|---|
${agentsRows}

The machine-readable source for this mapping is \`.cursor/manifest.yaml\`.
`,
  );
}

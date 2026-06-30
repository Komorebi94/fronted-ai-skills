# Cursor AI Engineering Workspace

This repository contains reusable Cursor agent configuration for production
software engineering workflows. It is designed to be copied or packaged across
projects without coupling prompts to one application framework.

## Structure

| Path | Purpose |
|---|---|
| `AGENTS.md` | Human-facing operating guide, precedence rules, and command selection guide |
| `.cursor/rules/` | Global baselines that apply across tasks |
| `.cursor/commands/` | User intent entry points and workflow boundaries |
| `.cursor/skills/` | Reusable engineering methodology and checklists |
| `.cursor/templates/` | Canonical output skeletons |
| `.cursor/examples/` | Quality examples for standard artifacts |
| `.cursor/manifest.yaml` | Machine-readable mapping for validation |
| `scripts/validate-cursor-workspace.mjs` | No-dependency consistency checker |
| `scripts/lib/cursor-workspace-validator.mjs` | Shared validation logic used by CLI and tests |
| `.github/workflows/validate.yml` | CI workflow for validate + test |

## Command Selection

Use the narrowest command that matches the user's intent:

- `ask`: direct answer or small clarification.
- `research`: evidence-backed investigation across code, docs, APIs, or options.
- `analyze`: local technical analysis of a code path, log, error, or problem.
- `explain`: explain how code or architecture works.
- `review`: general code or PR review.
- `audit`: security, privacy, compliance, reliability, or operational risk audit.
- `find-bug`: hidden defect and correctness-risk discovery.
- `architecture`: evaluate an existing system design.
- `design`: propose a new feature, UI, API, or system design.
- `plan`: create an execution plan without editing files.
- `implement`: modify the codebase and verify the change.
- `generate`: produce a focused artifact.
- `refactor`: preserve behavior while improving structure.
- `optimize`: improve meaningful performance bottlenecks.
- `test`: add, update, or design tests.
- `migrate`: move code, data, APIs, config, or behavior across states.
- `upgrade`: change dependency, SDK, framework, runtime, or platform versions.
- `document`: create or improve maintained documentation.
- `compare`: compare options or implementations.
- `commit`: prepare a git commit only when explicitly requested.

## Maintenance Workflow

When adding a command:

1. Add `.cursor/commands/base-command-<name>.md`.
2. Include `# Use This When` and `# Do Not Use This When` to prevent overlap.
3. Reference relevant skills by name.
4. Reference one primary template in `# Output`.
5. Add or reuse a template and optional example.
6. Update `.cursor/manifest.yaml` and `AGENTS.md`.
7. Run `npm run validate`.

When adding a skill:

1. Add `.cursor/skills/<name>/SKILL.md`.
2. Keep the standard 7-section shape.
3. Reference relevant rules instead of copying global baselines.
4. Register the skill in `.cursor/manifest.yaml` under `skills:`.
5. Add the skill to commands that need its methodology.
6. Run `npm run validate`.

When adding a template or example:

1. Keep the artifact framework-agnostic unless the artifact itself is domain-specific.
2. Reference templates from commands or manifest artifacts.
3. Add examples only when they improve output quality and do not become copy targets.
4. Run `npm run validate`.

## Validation

Run:

```sh
npm run validate
npm test
npm run validate:strict
```

The validator checks:

- Manifest references exist.
- Every command is listed in the manifest.
- Every skill is listed in `manifest.skills` and matches its directory.
- Every command has the standard sections and frontmatter `description`.
- Every command references its manifest template.
- Command skill references match manifest skills.
- Every skill has the standard 7 sections.
- Templates and examples are not orphaned.
- `AGENTS.md` command/template/example map matches the manifest.
- Duplicate primary templates across commands are rejected.

Warnings:

- Commands without examples (use `npm run validate:strict` to fail on these).
- Skills listed in manifest but not referenced by any command.

CI runs `npm run validate` and `npm test` on push and pull requests.

## Reuse Strategy

For a few projects, copy this repository's `.cursor/` configuration and keep
changes small. For many projects or team-wide distribution, package the system
as a Cursor Plugin so rules, commands, skills, and updates can be versioned
centrally.

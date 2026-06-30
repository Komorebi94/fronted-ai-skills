# AI Engineering Workspace

Reusable agent configuration for production software engineering workflows across **Cursor**, **Codex**, and **Claude Code**. Copy or package the platform folder that matches your tool.

## Structure

| Path | Platform | Purpose |
|---|---|---|
| `README.md` | All | 仓库入口与三平台说明 |
| `COMMANDS.md` | All | Command 功能说明（16 个 workflow） |
| `.cursor/` | Cursor | AGENTS.md, rules, commands, skills, templates, examples, manifest |
| `.codex/` | Codex | AGENTS.md, rules, skills, commands, templates, examples, manifest |
| `.claude/` | Claude Code | CLAUDE.md, rules, skills, commands, templates, examples, manifest |
| `scripts/validate-cursor-workspace.mjs` | Cursor | No-dependency consistency checker |
| `scripts/migrate-platform-workspace.mjs` | Codex / Claude | Regenerate platform folders from `.cursor/` |
| `scripts/lib/cursor-workspace-validator.mjs` | Cursor | Shared validation logic |
| `.github/workflows/validate.yml` | Cursor | CI workflow for validate + test |

## Platform Quick Start

### Cursor

Copy `.cursor/` into your project. Rules auto-apply via `.mdc` frontmatter. See [`.cursor/AGENTS.md`](./.cursor/AGENTS.md) for architecture and precedence. Invoke workflows with slash commands (see [COMMANDS.md](./COMMANDS.md)).

### Codex

1. Copy [`.codex/AGENTS.md`](./.codex/AGENTS.md) → project root `AGENTS.md`
2. Copy [`.codex/skills/`](./.codex/skills/) → `.agents/skills/`
3. Reference templates/examples from `.codex/` or copy alongside

See [`.codex/AGENTS.md`](./.codex/AGENTS.md) for precedence and command selection.

### Claude Code

1. Use [`.claude/CLAUDE.md`](./.claude/CLAUDE.md) as project memory (or root `CLAUDE.md`)
2. Rules load from [`.claude/rules/`](./.claude/rules/)
3. Invoke workflows with `/analyze`, `/implement`, etc. (see [COMMANDS.md](./COMMANDS.md))

See [`.claude/CLAUDE.md`](./.claude/CLAUDE.md) for precedence and command selection.

## Sync Across Platforms

Source of truth for content is `.cursor/`. After editing rules, skills, commands, templates, or examples:

```sh
node scripts/migrate-platform-workspace.mjs
npm run validate:platforms
```

This regenerates `.codex/` and `.claude/` with platform-native paths and formats, then validates manifest paths and guide integrity.

## Command Selection

Use the narrowest command that matches the user's intent:

- `analyze`: local technical analysis of a code path, log, error, or problem.
- `explain`: explain how code or architecture works.
- `review`: general code or PR review.
- `audit`: security, privacy, compliance, reliability, or operational risk audit.
- `find-bug`: hidden defect and correctness-risk discovery.
- `compare`: compare options or implementations.
- `architecture`: evaluate an existing system design.
- `design`: propose a new feature, UI, API, or system design.
- `plan`: create an execution plan without editing files.
- `implement`: modify the codebase and verify the change.
- `refactor`: preserve behavior while improving structure.
- `optimize`: improve meaningful performance bottlenecks.
- `test`: add, update, or design tests.
- `upgrade`: change dependency, SDK, framework, runtime, or platform versions.
- `document`: create or improve maintained documentation.
- `commit`: prepare a git commit only when explicitly requested.

Simple questions do not need a command; rely on always-applied rules and direct chat.
See [COMMANDS.md](./COMMANDS.md) for full documentation.

## Maintenance Workflow

When adding a command:

1. Add `.cursor/commands/base-command-<name>.md`.
2. Include `# Use This When` and `# Do Not Use This When` to prevent overlap.
3. Reference relevant skills by name.
4. Reference one primary template in `# Output`.
5. Add or reuse a template and optional example.
6. Update `.cursor/manifest.yaml` and `.cursor/AGENTS.md`.
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
- `.cursor/AGENTS.md` command/template/example map matches the manifest.
- Duplicate primary templates across commands are rejected.

Warnings:

- Commands without examples (use `npm run validate:strict` to fail on these).
- Skills listed in manifest but not referenced by any command.

CI runs `npm run validate` and `npm test` on push and pull requests.

## Reuse Strategy

- **Cursor**: copy `.cursor/` into your project; package as a Cursor Plugin for team distribution.
- **Codex**: copy `.codex/AGENTS.md` → root `AGENTS.md` and `.codex/skills/` → `.agents/skills/`.
- **Claude Code**: copy `.claude/` into your project; use `.claude/CLAUDE.md` as project memory.

For many projects, keep this repo as the single source and run `npm run migrate:platforms` after editing `.cursor/`.

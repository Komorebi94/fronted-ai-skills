# Cursor Operating Guide

This repository configures how the Cursor agent works under `.cursor/`. This file
explains how the layers fit together, how they are invoked, and how conflicts
and duplication are resolved.

## Layered Architecture

| Layer | Path | Purpose | How it loads |
|---|---|---|---|
| Rules | `.cursor/rules/*.mdc` | Cross-cutting baselines for behavior, quality, security, performance, testing, output, and TypeScript | `alwaysApply` or glob metadata |
| Commands | `.cursor/commands/base-command-*.md` | User intent entry points and workflow boundaries | Invoked explicitly by the user |
| Skills | `.cursor/skills/*/SKILL.md` | Reusable engineering methodology and checklists | Referenced by commands and applied by agent judgment |
| Templates | `.cursor/templates/*.template.md` | Canonical output skeletons | Referenced by commands and manifest |
| Examples | `.cursor/examples/*.example.md` | Few-shot quality references | Consulted as a quality bar, not copied verbatim |
| Manifest | `.cursor/manifest.yaml` | Machine-readable command, skill, template, and example mapping | Used by validation tooling |

Mental model: **Rules (global constraints) → Commands (intent and workflow) → Skills (methodology) → Templates/Examples (output shape) → Manifest (validation contract).**

## How a Request Flows

1. A user message, optionally via a command, sets the intent.
2. Always-applied rules constrain every response.
3. The command's `Use This When` / `Do Not Use This When` sections define the boundary.
4. The command's `Use Relevant Skills` section points to the domain skills to apply.
5. The skill's `Workflow` / `Checklist` guide the work.
6. The command's referenced template defines the primary output shape.
7. Matching examples are quality references, not required text to copy.

### Command Selection Guide

Human-readable command documentation: [COMMANDS.md](../COMMANDS.md).

| User intent | Prefer command | Avoid confusing it with |
|---|---|---|
| Specific code path, logs, or technical problem | `analyze` | `find-bug` for hidden defect discovery |
| Explain how something works | `explain` | `document` for maintained documentation |
| Review code or a PR | `review` | `audit` for security/privacy/compliance risk |
| Find hidden bugs | `find-bug` | `review` for broader engineering quality |
| Security, privacy, compliance, or operational risk | `audit` | `review` for general correctness |
| Compare options or implementations | `compare` | `design` when proposing a new solution |
| Evaluate existing architecture | `architecture` | `plan` for execution steps |
| Design a new feature/API/UI/system change | `design` | `architecture` for evaluating an existing system |
| Create an execution plan without edits | `plan` | `implement` when edits are requested |
| Modify the codebase | `implement` | `upgrade` or `optimize` for version or performance work |
| Behavior-preserving structure change | `refactor` | `implement` for behavior changes |
| Performance improvement | `optimize` | `refactor` for readability-only changes |
| Tests or coverage strategy | `test` | `find-bug` when the defect is unknown |
| Dependency, SDK, runtime, or platform version change | `upgrade` | `implement` when versions stay the same |
| Create or improve maintained documentation | `document` | `explain` for understanding existing code |
| Commit current changes | `commit` | PR creation unless explicitly requested |

Simple questions and lightweight clarifications do not need a command; rely on always-applied rules and direct chat.

### Command ↔ Template ↔ Example Map

| Command | Template | Example |
|---|---|---|
| `analyze` | `analysis-report.template.md` | `analysis-report.example.md` |
| `explain` | `explanation.template.md` | — |
| `review` | `review-report.template.md` | `review-finding.example.md` |
| `audit` | `security-audit.template.md` | `security-audit.example.md` |
| `find-bug` | `bug-report.template.md` | `bug-investigation.example.md` |
| `compare` | `comparison.template.md` | — |
| `architecture` | `architecture-review.template.md` | `architecture-review.example.md` |
| `design` | `design-doc.template.md` | `design-doc.example.md` |
| `plan` | `implementation-plan.template.md` | `implementation-plan.example.md` |
| `implement` | `implementation-summary.template.md` | `implementation-result.example.md` |
| `refactor` | `refactor-summary.template.md` | `refactor-summary.example.md` |
| `optimize` | `optimization-plan.template.md` | `performance-analysis.example.md` |
| `test` | `test-plan.template.md` | `test-plan.example.md` |
| `upgrade` | `upgrade-summary.template.md` | — |
| `document` | `documentation.template.md` | `documentation.example.md` |
| `commit` | `commit-summary.template.md` | `commit-summary.example.md` |
| `implement` (API work) | `api-integration.template.md` | `api-integration.example.md` |
| Pull request body | `pr-description.template.md` | `pr-description.example.md` |

### Standalone Artifacts

| Artifact | Template | Example | When to use |
|---|---|---|---|
| Refactor plan | `refactor-plan.template.md` | — | Large behavior-preserving refactors planned via `plan` before `refactor` |
| API integration | `api-integration.template.md` | `api-integration.example.md` | API-focused implementation summaries |
| Pull request body | `pr-description.template.md` | `pr-description.example.md` | PR descriptions when explicitly requested |

The machine-readable source for this mapping is `.cursor/manifest.yaml`.
Update the manifest, command output reference, template, and example together.

## Precedence (Conflict Resolution)

When guidance overlaps or conflicts, apply in this order:

1. Explicit user instruction in the current request.
2. `.cursor/rules/*.mdc` baselines.
3. The active command's boundary, skill, constraint, and output sections.
4. The applied skill's guidance.
5. Templates and examples for shape only.
6. `.cursor/manifest.yaml` for validation metadata only; it does not override behavior.

Output ordering note: `output.mdc` requires leading with the result. For
`review`, `find-bug`, and `audit`, findings are often the result, so they may
come before summary when that improves reviewability.

## Single Source of Truth

To avoid drift, each concept has one owner. Other files reference it instead of
restating it.

- Cross-cutting baselines live in `rules/`. Skills and commands reference them
  and add only workflow-specific depth.
  - Type-safety baseline → `rules/typescript.mdc` and `skills/typescript-quality`.
  - Performance baseline → `rules/performance.mdc` and `skills/performance-optimization`.
  - Testing baseline → `rules/testing.mdc` and `skills/testing-strategy`.
  - Security baseline → `rules/security.mdc` and `skills/security-review`.
  - Architecture review methodology → `skills/architecture-review`.
- Output skeletons live in `templates/`; commands must reference the canonical
  template rather than duplicating a separate shape.
- `.cursor/manifest.yaml` owns machine-readable mappings. This file explains
  the design for maintainers.

## Adding or Changing Configuration

- **New rule**: only for a genuinely cross-cutting baseline. Keep it short,
  imperative, and `alwaysApply` only if it must constrain every response.
- **New command**: follow the existing shape — frontmatter `description`, then
  `# Objective`, `# Use This When`, `# Do Not Use This When`,
  `# Use Relevant Skills`, `# Constraints`, `# Output`.
- **New skill**: follow the 7-section shape — `When To Use`, `Core Principles`,
  `Workflow`, `Checklist`, `Common Pitfalls`, `Verification`, `Output Format`.
  Reference relevant rules rather than copying them. Register it in
  `.cursor/manifest.yaml` under `skills:`.
- **New artifact**: add a `*.template.md` skeleton and, when helpful, a matching
  `*.example.md`, then wire both into the relevant command, this file, and
  `.cursor/manifest.yaml`.
- **Validation**: run `npm run validate` after changing commands, skills,
  templates, examples, or manifest entries.

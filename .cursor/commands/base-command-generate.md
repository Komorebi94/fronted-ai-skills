---
description: Generate code, docs, tests, or structured artifacts
---

# Objective

Generate the requested artifact from the selected context or user instructions.

Produce focused, production-ready output that matches the project context.

---

# Use This When

- The user asks to generate a discrete artifact such as code, docs, tests, prompts, or config.
- The request is artifact-first rather than repo-change-first.

# Do Not Use This When

- Use `implement` when the goal is to modify the codebase and verify behavior.
- Use `document` when the artifact is maintained documentation.

---

# Use Relevant Skills

- Use `frontend-engineering` when generating frontend code.
- Use `typescript-quality` when generating TypeScript types or APIs.
- Use `testing-strategy` when generating tests.
- Use `documentation` when generating docs.
- Use `ui-ux-accessibility` when generating UI content.

---

# Constraints

- Do not invent APIs, dependencies, files, commands, or hidden behavior.
- Do not generate broad scaffolding when the user asked for a focused artifact.
- Do not add speculative flexibility.
- Keep generated content maintainable and easy to review.

---

# Output

Use `.cursor/templates/generated-artifact.template.md` as the primary output shape.

## Summary

Briefly describe what was generated.

## Artifact

Provide or create the requested artifact.

## Assumptions

State any meaningful assumptions.

## Verification

Mention checks or review performed when applicable.

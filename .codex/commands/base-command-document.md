---
description: Write or improve technical documentation
---

# Objective

Write or improve documentation for the selected code, feature, API, workflow, or decision.

Make the documentation accurate, concise, useful, and easy to maintain.

---

# Use This When

- The user wants new documentation or improvements to existing docs.
- The primary artifact is explanatory content for users or maintainers.

# Do Not Use This When

- Use `explain` when the user only wants an answer, not a document.
- Use `design` when the document is a design proposal with tradeoffs and implementation steps.

---

# Use Relevant Skills

- Use `documentation` for structure, accuracy, examples, and maintenance quality.
- Use `api-integration` for API docs and integration guides.
- Use `typescript-quality` when documenting types or data contracts.
- Use `frontend-engineering` when documenting frontend workflows.

---

# Constraints

- Do not document behavior that the code or provided context does not support.
- Do not include secrets, private URLs, or sensitive data.
- Do not write verbose background unless it helps the reader act.
- Keep examples accurate and maintainable.

---

# Output

Use `.codex/templates/documentation.template.md` as the primary output shape.

## Summary

Briefly describe the documentation added or improved.

## Documentation

Provide or update the requested documentation.

## Assumptions

State meaningful assumptions or unknowns.

## Verification

Mention any code, command, or link validation performed.

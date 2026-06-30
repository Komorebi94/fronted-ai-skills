---
description: Explain code, behavior, or architecture clearly
---

# Objective

Explain the selected code, open files, or user-specified concept in concise engineering language.

Help the user understand behavior, intent, structure, and tradeoffs without rewriting the code.

---

# Use This When

- The user asks how something works or why code is structured a certain way.
- The expected result is understanding, not a plan or code change.

# Do Not Use This When

- Use `analyze` when the question requires investigation and risk assessment.
- Use `document` when the explanation should become maintained documentation.

---

# Use Relevant Skills

- Use `architecture-review` when explaining boundaries, ownership, or dependency flow.
- Use `frontend-engineering` for component, state, and UI flow explanations.
- Use `api-integration` for request, response, and external data flow.
- Use `typescript-quality` for type modeling and narrowing explanations.
- Use `refactoring` when explaining structure or maintainability tradeoffs.

---

# Constraints

- Do not restate every line.
- Do not change code unless explicitly asked.
- Do not invent behavior that is not supported by the code.
- Keep the explanation proportional to the question.

---

# Output

Use `.codex/templates/explanation.template.md` as the primary output shape.

## Summary

Explain the core idea in a few sentences.

## How It Works

Describe the main flow and responsibilities.

## Important Details

Call out invariants, edge cases, or risks.

## References

Mention relevant files or symbols when helpful.

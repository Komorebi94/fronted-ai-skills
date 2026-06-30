---
description: Refactor code while preserving behavior
---

# Objective

Improve structure, readability, and maintainability in the selected code, open files, diff, or requested scope.

Preserve behavior exactly unless the user explicitly asks for a behavior change.

---

# Use This When

- The user asks to improve structure, naming, responsibilities, duplication, or maintainability.
- Behavior should remain unchanged.

# Do Not Use This When

- Use `implement` when product behavior changes.
- Use `architecture` when evaluating system structure before deciding what to change.
- Use `plan` when the refactor spans multiple modules and needs an approved step plan before edits. For that plan output, use `.cursor/templates/refactor-plan.template.md`.

---

# Use Relevant Skills

- Use `refactoring` for behavior-preserving structure changes.
- Use `architecture-review` when module boundaries or dependency direction affect the refactor.
- Use `typescript-quality` when type modeling or narrowing can clarify the code.
- Use `frontend-engineering` when refactoring components, hooks, or state ownership.
- Use `testing-strategy` to verify behavior remains unchanged.

---

# Constraints

- Do not change business logic, public contracts, persisted data, or user-facing behavior.
- Do not introduce broad abstractions for one-off code.
- Do not rewrite unrelated files or mix refactoring with feature work.
- Prefer existing project patterns over new architecture.
- Keep changes small and reviewable.

---

# Output

Use `.cursor/templates/refactor-summary.template.md` as the primary output shape.

## Summary

Briefly explain what was refactored and why.

## Changes

List the structural improvements made or proposed.

## Behavior Preservation

State how existing behavior was preserved.

## Verification

Describe tests, checks, or reasoning used to validate the refactor.
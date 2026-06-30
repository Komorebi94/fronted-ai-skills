---
description: Implement a requested change with focused verification
---

# Objective

Implement the requested change in the selected scope or codebase.

Choose the smallest production-ready solution that satisfies the requirement.

---

# Use This When

- The user asks to change files, implement behavior, or complete a concrete engineering task.
- The expected result is working code or configuration plus verification.

# Do Not Use This When

- Use `plan` when requirements or approach need approval before edits.
- Use `upgrade` when the main work is a dependency, SDK, or platform version change.
- Use `optimize` when the main work is performance improvement without product behavior changes.

---

# Use Relevant Skills

- Use `frontend-engineering` for UI, component, state, and client behavior.
- Use `api-integration` for request/response work.
- Use `typescript-quality` for type-safe implementation.
- Use `testing-strategy` when behavior or shared logic changes.
- Use `ui-ux-accessibility` for screens, forms, interactions, and accessibility.

---

# Constraints

- Do not change unrelated behavior.
- Do not overwrite user changes or revert unrelated files.
- Do not invent APIs, dependencies, or hidden requirements.
- Do not add abstractions unless they remove real complexity.
- Keep changes scoped and reviewable.

---

# Output

Use `.cursor/templates/implementation-summary.template.md` as the primary output shape.

## Summary

Briefly describe the implemented change.

## Changes

List code, config, dependency, or test changes.

## Verification

List tests, lints, type checks, or manual reasoning performed.

## Notes

Mention important assumptions, risks, or follow-ups.
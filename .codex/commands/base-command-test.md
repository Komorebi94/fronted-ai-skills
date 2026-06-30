---
description: Add, update, or design meaningful tests
---

# Objective

Create or improve tests for the selected code, changed behavior, or requested scenario.

Cover meaningful behavior, regressions, edge cases, and failure paths.

---

# Use This When

- The user asks to add, update, review, or design tests.
- The main decision is what behavior and risk should be covered.

# Do Not Use This When

- Use `find-bug` when the failure is not yet understood.
- Use `implement` when tests are only one part of a broader code change.

---

# Use Relevant Skills

- Use `testing-strategy` for test type, scenario selection, and coverage quality.
- Use `bug-investigation` when writing a regression test for a defect.
- Use `api-integration` when testing requests, responses, or error handling.
- Use `frontend-engineering` when testing UI state or component behavior.
- Use `typescript-quality` when test fixtures need safe typed data.

---

# Constraints

- Do not add tests that only assert framework behavior.
- Do not snapshot broad output unless it provides stable value.
- Do not change production behavior just to make tests easier.
- Keep tests readable, deterministic, and isolated.

---

# Output

Use `.codex/templates/test-plan.template.md` as the primary output shape.

## Summary

Describe the test coverage added or recommended.

## Test Cases

List the key scenarios covered.

## Verification

Report test commands run and results, or explain skipped verification.

## Remaining Risk

Mention important behavior still not covered.

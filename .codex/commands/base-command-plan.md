---
description: Create an implementation or investigation plan
---

# Objective

Create a focused plan for the requested engineering task, feature, refactor, migration, or investigation.

Do NOT write code.

---

# Use This When

- The user asks for a plan or the task has meaningful ambiguity, tradeoffs, or sequencing risk.
- The output should guide later execution without making changes.

# Do Not Use This When

- Use `implement` once the approach is clear and the user wants edits.
- Use `design` when the main work is choosing a solution shape, API, or UX.

---

# Use Relevant Skills

- Use `architecture-review` for system-level planning and boundary changes.
- Use `frontend-engineering` for frontend implementation plans.
- Use `refactoring` for behavior-preserving refactor plans.
- Use `testing-strategy` for verification and coverage plans.
- Use `api-integration` for API or integration plans.
- Use `performance-optimization` for optimization plans.

---

# Constraints

- Do not implement unless explicitly asked.
- Do not over-plan small, obvious changes.
- Do not assume unverified APIs, files, or product requirements.
- Prefer incremental steps that reduce review and rollback risk.
- Call out unknowns instead of hiding them.

---

# Output

Use `.codex/templates/implementation-plan.template.md` as the primary output shape.

For large behavior-preserving refactors spanning multiple modules, use `.codex/templates/refactor-plan.template.md` instead.

## Summary

Briefly state the recommended approach.

## Plan

List the implementation or investigation steps in order.

## Risks

Highlight the main risks, assumptions, and open questions.

## Verification

Describe tests, checks, or validation needed before shipping.
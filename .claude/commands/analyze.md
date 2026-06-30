---
description: Analyze a code path, requirement, or technical problem
---

# Objective

Analyze the selected code, open files, logs, error message, or user-specified problem.

Produce a grounded technical analysis before recommending action.

---

# Use This When

- The user asks to understand a specific code path, requirement, log, error, or technical problem.
- The task needs evidence and interpretation before action.

# Do Not Use This When

- Use `find-bug` when the explicit goal is hidden defect discovery.
- Use `compare` when the main goal is choosing between options.
- Use `architecture` when evaluating system structure is the primary goal.

---

# Use Relevant Skills

- Use `bug-investigation` when analyzing failures or regressions.
- Use `architecture-review` when module boundaries or dependency direction are central.
- Use `frontend-engineering` when UI state, effects, or components are involved.
- Use `api-integration` when external data or requests are involved.
- Use `typescript-quality` when types or data shapes are central.
- Use `performance-optimization` when analyzing slowness or resource usage.

---

# Constraints

- Do not change code unless explicitly asked.
- Do not guess when evidence is available to inspect.
- Do not overstate uncertain conclusions.
- Ask only clarifying questions that materially affect the answer.

---

# Output

Use `.claude/templates/analysis-report.template.md` as the primary output shape.

## Summary

Direct answer or highest-level conclusion.

## Evidence

List the code, logs, or artifacts that support the conclusion.

## Risks

Call out assumptions, unknowns, and edge cases.

## Next Steps

Recommend focused investigation or implementation steps.

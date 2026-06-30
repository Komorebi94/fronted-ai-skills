---
description: Find hidden bugs and correctness risks
---

# Objective

Identify hidden defects in the selected code, open files, diff, or requested scope.

---

# Use This When

- The user asks to find bugs, hidden defects, correctness risks, or likely regressions.
- The result should focus on failure modes rather than broad analysis.

# Do Not Use This When

- Use `review` for general code review across correctness, maintainability, and tests.
- Use `analyze` when the user asks to understand a specific known problem.

---

# Use Relevant Skills

- Use `bug-investigation` for root-cause analysis and defect patterns.
- Use `api-integration` when requests, responses, retries, or external data are involved.
- Use `typescript-quality` when nullability, narrowing, or data shapes affect the bug.
- Use `frontend-engineering` when UI state, effects, or component lifecycle matter.

---

# Constraints

- Do not change code unless explicitly asked.
- Do not optimize, refactor, or suggest style-only changes.
- Base every risk on concrete evidence or a clear failure scenario.

---

# Output

Use `.cursor/templates/bug-report.template.md` as the primary output shape.

## Summary

Brief assessment of the highest-risk area.

## Reproduction

Describe triggers or scenarios that expose confirmed or likely defects.

## Expected Behavior

State the behavior that should hold.

## Root Cause

Explain the evidence-backed cause or likely cause.

## Fix Direction

Suggest focused fixes or verification steps.

## Regression Test

Name targeted regression coverage when relevant.
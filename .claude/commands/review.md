---
description: Review code for correctness and engineering quality
---

# Objective

Review the selected code, open files, diff, or requested scope as a senior software engineer.

---

# Use This When

- The user asks for a code review, PR review, diff review, or engineering-quality assessment.
- Findings should prioritize correctness, regressions, security, maintainability, and missing tests.

# Do Not Use This When

- Use `audit` for security, privacy, compliance, or operational risk as the primary goal.
- Use `find-bug` when the user only wants hidden defect discovery.

---

# Use Relevant Skills

- Use `code-review` for review criteria and finding format.
- Use `security-review` when security or privacy findings are in scope.
- Use `bug-investigation` when runtime behavior or regressions are suspicious.
- Use `typescript-quality` when type safety affects correctness.
- Use `testing-strategy` when evaluating coverage gaps.
- Use `api-integration` for request, response, and external data risks.

---

# Constraints

- Do not change code.
- Put findings before summary.
- Base every issue on evidence and a plausible failure scenario.
- Ignore style-only issues unless they affect maintainability or correctness.

---

# Output

Use `.claude/templates/review-report.template.md` as the primary output shape.

## Findings

List issues ordered by severity with evidence, impact, and fix direction.

## Missing Tests

Call out important coverage gaps when relevant.

## Open Questions

List unknowns that affect finding severity or confidence.

## Summary

Brief assessment, confidence, and residual risk.
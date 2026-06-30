---
description: Optimize meaningful performance bottlenecks
---

# Objective

Identify and improve meaningful performance issues in the selected code, open files, diff, or requested scope.

---

# Use This When

- The user asks to investigate or improve latency, rendering, memory, network, bundle size, or hot-path cost.
- The optimization should be tied to meaningful impact.

# Do Not Use This When

- Use `refactor` when the goal is readability without performance evidence.
- Use `analyze` when the performance problem is only one possible cause.

---

# Use Relevant Skills

- Use `performance-optimization` for bottleneck analysis and optimization patterns.
- Use `frontend-engineering` for rendering, effects, state, and UI performance.
- Use `api-integration` for network, caching, retries, and duplicate requests.
- Use `testing-strategy` when behavior preservation needs coverage.

---

# Constraints

- Do not change business logic, API behavior, return values, or persisted data formats.
- Optimize only meaningful hot paths or repeated work.
- Prefer measurable improvements over clever rewrites.
- State assumptions when impact cannot be measured.

---

# Output

Use `.codex/templates/optimization-plan.template.md` as the primary output shape.

## Summary

Briefly describe the likely bottleneck and overall recommendation.

## Proposed Optimization

List opportunities ordered by expected impact. Include evidence and affected code.

## Expected Benefit

Explain the expected runtime, rendering, memory, or network improvement.

## Risks

Call out behavior, complexity, cache invalidation, or compatibility risks.

## Verification

Describe tests, profiling, benchmarks, or reasoning needed to confirm the improvement.

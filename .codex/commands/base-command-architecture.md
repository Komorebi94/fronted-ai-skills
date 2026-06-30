---
description: Analyze architecture, boundaries, and system design
---

# Objective

Analyze the selected codebase area or requested system from an architecture perspective.

Evaluate whether the current structure supports the product, team, reliability, and change requirements.

---

# Use This When

- The user asks whether the architecture, boundaries, or system design are reasonable.
- The task is evaluative or directional, not immediate implementation.

# Do Not Use This When

- Use `design` when creating a new solution from requirements.
- Use `plan` when the user wants execution steps for an already chosen direction.

---

# Use Relevant Skills

- Use `architecture-review` for system boundaries, dependency direction, ownership, and evolution risks.
- Use `frontend-engineering` for frontend architecture, state ownership, and component boundaries.
- Use `api-integration` for integration boundaries and external data flow.
- Use `refactoring` for incremental structure improvements.
- Use `performance-optimization` when scalability or hot paths influence architecture.

---

# Constraints

- Do not propose a rewrite unless incremental options are not viable.
- Do not introduce new infrastructure without a clear need.
- Preserve public contracts and persisted data unless a migration is planned.
- Separate short-term fixes from long-term architecture direction.

---

# Output

Use `.codex/templates/architecture-review.template.md` as the primary output shape.

## Summary

Concise architecture assessment.

## Current Shape

Describe the main modules, flows, and boundaries.

## Risks

List architectural risks ordered by impact.

## Recommendations

Suggest practical improvements and tradeoffs.

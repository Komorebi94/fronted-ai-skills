---
name: architecture-review
description: Reviews system architecture, module boundaries, dependency direction, data flow, ownership, scalability, and evolution risks. Use for architecture analysis and design reviews.
---

# Architecture Review

## When To Use

Use this skill for system design reviews, module boundary analysis, dependency direction, data flow, scalability, ownership, migration strategy, and long-term maintainability decisions.

## Core Principles

Follows `.codex/rules/engineering.md` for baseline engineering judgment. This skill adds:

- Optimize boundaries around ownership, change frequency, and data flow.
- Prefer evolutionary changes that reduce risk without freezing future options.
- Treat architecture as constraints and tradeoffs, not diagram polish.

## Workflow

1. Identify the system goal, current scope, stakeholders, and constraints.
2. Map modules, dependencies, data flow, side effects, and ownership boundaries.
3. Evaluate coupling, cohesion, duplication, cross-layer leakage, and failure modes.
4. Check scalability, migration, compatibility, observability, and operational risks.
5. Compare incremental options and their tradeoffs.
6. Recommend prioritized changes with verification or rollout steps.

## Checklist

- Responsibilities are clear at module, layer, and boundary levels.
- Dependencies point in intentional directions and avoid cycles.
- Data ownership, validation, and transformation boundaries are explicit.
- Shared abstractions remove real complexity instead of hiding local variation.
- Migration and compatibility risks are named when contracts change.
- The recommended path can be implemented and reviewed in small steps.

## Common Pitfalls

- Proposing a rewrite when an incremental boundary improvement is enough.
- Confusing folder hierarchy with ownership and dependency design.
- Adding generic abstractions before repeated behavior is proven.
- Ignoring operational constraints, rollout, and rollback.
- Optimizing for one project while making cross-project reuse harder.

## Verification

- Cross-check recommendations against existing code, docs, and constraints.
- Confirm proposed boundaries preserve public contracts or include migration steps.
- Validate risk claims with concrete examples.
- State what must be measured, tested, or reviewed before implementation.

## Output Format

```markdown
## Summary

## Current Shape

## Strengths

## Risks

## Recommendations
```

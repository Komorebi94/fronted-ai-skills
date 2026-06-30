---
name: frontend-engineering
description: Guides production-ready frontend implementation and review. Use when building UI, components, state flows, forms, client-side data fetching, routing, or frontend architecture.
---

# Frontend Engineering

## When To Use

Use this skill for frontend feature work, component design, UI state, client data flow, and frontend architecture decisions.

## Core Principles

Follows `.codex/rules/engineering.md`, `.codex/rules/security.md`, and `.codex/rules/performance.md` for baseline engineering, safety, and performance rules. This skill adds:

- Keep components focused and state ownership clear.
- Represent loading, empty, error, success, and disabled states intentionally.
- Keep UI, data fetching, and side effects separated by clear boundaries.

## Workflow

1. Understand the user flow, data dependencies, and UI states.
2. Locate existing components, hooks, services, styles, and patterns.
3. Decide where state should live and how it changes.
4. Implement behavior with clear boundaries between UI, data, and side effects.
5. Handle loading, error, empty, invalid, and permission states.
6. Verify rendering, accessibility, responsive layout, and edge cases.

## Checklist

- State is not duplicated without a clear reason.
- Effects have correct dependencies and cleanup.
- Forms validate inputs and communicate errors clearly.
- Data fetching handles cancellation, stale results, and retries when needed.
- Components are composable without leaking unrelated concerns.
- UI remains usable with slow networks, missing data, and narrow screens.

## Common Pitfalls

- Storing derived state that can drift from source data.
- Putting business logic directly into presentational components.
- Ignoring loading, empty, disabled, and permission states.
- Running effects too often because dependencies are unstable.
- Treating API data as trusted because TypeScript has a type.

## Verification

- Exercise loading, success, empty, error, and retry states.
- Check keyboard and responsive behavior for changed UI.
- Confirm effects clean up subscriptions, timers, and requests.
- Run focused component, integration, type, or lint checks when available.

## Output Format

```markdown
## Approach

## UI States

## Implementation Notes

## Verification
```

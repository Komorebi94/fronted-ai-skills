---
name: performance-optimization
description: Optimizes meaningful frontend and application performance bottlenecks. Use when improving render performance, expensive computation, network behavior, caching, large lists, bundle size, or hot paths.
---

# Performance Optimization

## When To Use

Use this skill when performance, latency, rendering, memory, network usage, or bundle size is part of the task.

## Core Principles

Follows `rules/performance.mdc` for baseline performance rules. This skill adds:

- Avoid memoization, caching, or batching when the saved work is trivial.
- Keep cache invalidation and stale-data risks explicit.
- Apply the bottleneck workflow and checks below before optimizing.

## Workflow

1. Identify the hot path, frequency, input size, and user impact.
2. Distinguish real bottlenecks from style or readability concerns.
3. Check render-time work, repeated effects, network calls, and large data operations.
4. Choose the smallest behavior-preserving optimization.
5. Evaluate complexity, memory cost, stale data risk, and rollback path.
6. Verify with profiling, tests, benchmarks, or concrete reasoning.

## Checklist

- Avoid unnecessary renders and unstable props or callbacks.
- Move expensive work out of render paths and repeated loops.
- Use pagination, virtualization, lazy loading, or batching for large data.
- Deduplicate requests and cancel stale async work.
- Use memoization only when dependencies are stable and cost is meaningful.
- Avoid growing caches without invalidation or size control.

## Common Pitfalls

- Optimizing code that is not on a hot path.
- Adding memoization with unstable dependencies.
- Caching data without invalidation, size limits, or stale-data handling.
- Improving microbenchmarks while worsening readability or memory usage.
- Changing behavior while trying to improve performance.

## Verification

- Use profiling, timings, render counts, or network traces when available.
- Compare before and after behavior for the same inputs.
- Test cache invalidation, stale results, and repeated interactions.
- State assumptions clearly when performance cannot be measured.

## Output Format

```markdown
## Bottleneck

## Optimization

## Expected Benefit

## Risks

## Verification
```

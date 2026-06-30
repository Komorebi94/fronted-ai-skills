---
name: bug-investigation
description: Investigates bugs by tracing state, data flow, async behavior, lifecycle, and error paths. Use when debugging failures, finding hidden bugs, analyzing regressions, or explaining root causes.
---

# Bug Investigation

## When To Use

Use this skill when the task is to find, explain, reproduce, or fix a bug.

## Core Principles

Follows `.claude/rules/core.md` and `.claude/rules/testing.md` for evidence-based changes and regression coverage. This skill adds:

- Reproduce or define the failure before changing code.
- Separate symptoms, evidence, root cause, and fix direction.
- Consider empty, invalid, boundary, concurrent, and stale-state cases.

## Workflow

1. Identify expected behavior, actual behavior, and reproduction steps.
2. Trace control flow, data flow, state changes, and side effects.
3. Inspect async behavior, lifecycle cleanup, request ordering, and stale closures.
4. Check error handling, fallback states, retries, cancellation, and logging.
5. Form a root-cause hypothesis and verify it against code or runtime evidence.
6. Propose or implement the smallest fix and targeted regression test.

## Checklist

- Race conditions and stale async results.
- Null, undefined, empty, and boundary values.
- Mutated state, lost updates, and invalid derived state.
- Missing cleanup for timers, subscriptions, listeners, or requests.
- Duplicate requests, infinite loops, and incorrect dependencies.
- Unhandled promises, swallowed errors, and misleading UI states.

## Common Pitfalls

- Fixing the symptom before proving the root cause.
- Ignoring timing, concurrency, or stale closure behavior.
- Assuming API responses always match the expected shape.
- Adding broad guards that hide invalid states instead of correcting them.
- Missing a regression test for the exact failure mode.

## Verification

- Confirm the reproduction fails before the fix and passes after it.
- Test the boundary or concurrent case that triggered the bug.
- Check that error states and cleanup paths still behave correctly.
- Prefer a focused regression test over broad snapshot updates.

## Output Format

```markdown
## Summary

## Reproduction

## Root Cause

## Fix Direction

## Regression Test
```

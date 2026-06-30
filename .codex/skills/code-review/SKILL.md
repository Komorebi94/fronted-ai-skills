---
name: code-review
description: Reviews code for correctness, regressions, security, maintainability, and missing tests. Use when reviewing pull requests, diffs, selected code, or when the user asks for a code review.
---

# Code Review

## When To Use

Use this skill for PR reviews, diff reviews, suspicious code changes, or review-style requests.

## Core Principles

Follows `.codex/rules/output.md` and `.codex/rules/self-review.md` for response ordering and completion checks. This skill adds:

- Prioritize bugs, regressions, security risks, data loss, and missing tests.
- Base every finding on concrete evidence and a plausible failure scenario.
- Prefer fewer high-confidence findings over broad speculation.

## Workflow

1. Understand the requirement and expected behavior.
2. Read the changed code and relevant surrounding context.
3. Check contracts, state, async behavior, error paths, and edge cases.
4. Check security, privacy, performance, and type-safety implications.
5. Verify whether tests cover the changed or risky behavior.
6. Report findings with severity, evidence, impact, and fix direction.

## Checklist

- Correct behavior and business rules are preserved.
- Public APIs, persisted data, and compatibility are not broken.
- Error, loading, empty, invalid, and boundary states are handled.
- Async work is cancellable or guarded when needed.
- User input and external data are validated at boundaries.
- Tests cover meaningful behavior and regression-prone paths.

## Common Pitfalls

- Reviewing style before correctness.
- Reporting speculative issues without a concrete failure mode.
- Missing changes in adjacent files that affect the same behavior.
- Treating lack of tests as acceptable for shared logic or bug fixes.
- Suggesting large rewrites when a focused fix would address the risk.

## Verification

- Compare intended behavior with changed behavior.
- Check tests for the riskiest paths, not just changed lines.
- Confirm findings reference concrete code and expected impact.
- If context is missing, mark the finding as a question or assumption.

## Output Format

```markdown
## Findings
- [Severity] Title
  Evidence:
  Impact:
  Fix direction:

## Open Questions

## Summary
```

---
name: testing-strategy
description: Designs and implements meaningful tests for behavior, regressions, edge cases, and failure paths. Use when adding tests, reviewing test coverage, or choosing unit, integration, or end-to-end coverage.
---

# Testing Strategy

## When To Use

Use this skill when creating tests, evaluating coverage, or deciding how to verify a change.

## Core Principles

Follows `.claude/rules/testing.md` for when and what to test. This skill adds:

- Choose the test type (unit, integration, end-to-end) by risk and surface area.
- Keep tests deterministic with clear setup, mocks only at boundaries, and explicit assertions.
- Apply the design workflow below to pick scenarios that would fail for the defect.

## Workflow

1. Identify the behavior and risk being tested.
2. Choose unit, integration, or end-to-end coverage based on risk and surface area.
3. Inspect existing test style, helpers, fixtures, and commands.
4. Add focused cases that would fail for the bug or regression.
5. Keep mocks at system boundaries.
6. Run targeted tests or explain skipped verification.

## Checklist

- Business logic and data transformations are covered.
- Public APIs and shared utilities have boundary tests.
- Error paths and invalid input are covered.
- Async behavior avoids flaky timing.
- Tests remain readable and isolated.
- Snapshot tests are narrow and stable when used.

## Common Pitfalls

- Testing implementation details instead of observable behavior.
- Mocking so much that the real integration risk disappears.
- Adding broad snapshots that fail noisily without proving behavior.
- Skipping failure paths because the happy path is covered.
- Using timers, network, or shared state in ways that make tests flaky.

## Verification

- Run the smallest test command that covers the changed behavior.
- Confirm tests fail for the original bug when writing regression coverage.
- Check that mocks match the real boundary contract.
- State remaining risk when full test coverage is impractical.

## Output Format

```markdown
## Coverage Goal

## Test Cases

## Test Type

## Verification

## Remaining Risk
```

---
name: refactoring
description: Refactors code while preserving behavior. Use when improving structure, naming, responsibilities, duplication, coupling, or maintainability without changing product behavior.
---

# Refactoring

## When To Use

Use this skill for behavior-preserving code cleanup, structural improvement, and maintainability work.

## Core Principles

Follows `.claude/rules/core.md`, `.claude/rules/engineering.md`, and `.claude/rules/code-quality.md` for behavior preservation and code quality baselines. This skill adds:

- Define the exact behavior, contracts, data shapes, return values, and side effects that must stay unchanged.
- Improve responsibility boundaries, naming, control flow, and dependency direction.
- Keep refactoring separate from feature work and bug fixes unless the user explicitly asks otherwise.

## Workflow

1. Understand current behavior and business rules.
2. Identify responsibilities, duplication, coupling, and confusing control flow.
3. Define what must remain unchanged.
4. Make the smallest structural improvement.
5. Keep refactoring separate from feature work and bug fixes when possible.
6. Verify behavior with tests, types, snapshots, or clear reasoning.

## Checklist

- Names reveal domain intent.
- Functions stay at one level of abstraction.
- Branching and nesting are simpler.
- Shared logic is extracted only when reuse is real.
- Module boundaries and dependency direction stay clear.
- Type safety improves or remains intact.

## Common Pitfalls

- Mixing refactoring with feature changes.
- Creating abstractions for a single use case.
- Moving code without understanding side effects or ownership.
- Renaming public APIs without migration or compatibility handling.
- Making the diff too large to review safely.

## Verification

- Run existing tests or type checks that cover the refactored path.
- Compare inputs, outputs, side effects, and error behavior.
- Check imports, exports, public APIs, and generated artifacts.
- Explain behavior preservation when automated tests are not available.

## Output Format

```markdown
## Summary

## Changes

## Behavior Preservation

## Verification
```

---
name: typescript-quality
description: Improves TypeScript type safety and domain modeling. Use when working with TypeScript, API response types, generics, unknown data, discriminated unions, type guards, or removing any.
---

# TypeScript Quality

## When To Use

Use this skill for TypeScript code, type modeling, API boundaries, narrowing, generics, and type-safety reviews.

## Core Principles

Follows `.claude/rules/typescript.md` for baseline type-safety rules. This skill adds:

- Prefer domain types over loosely shaped objects, and model invalid states as unrepresentable.
- Apply the modeling and narrowing workflow below at data boundaries.

## Workflow

1. Identify boundaries where data enters the system.
2. Reuse existing domain types before creating new ones.
3. Model state variants with discriminated unions when useful.
4. Narrow `unknown` with validation, type guards, or explicit runtime checks.
5. Keep generics constrained and readable.
6. Verify imports, exports, nullability, and async error paths.

## Checklist

- No unnecessary `any`.
- Nullable and optional values are handled explicitly.
- API responses are validated or safely narrowed.
- Type assertions are justified by local evidence.
- Utility types clarify intent instead of hiding domain meaning.
- Async flows preserve type safety across success and failure paths.

## Common Pitfalls

- Replacing `any` with unsafe assertions instead of real narrowing.
- Using broad object types that lose domain meaning.
- Modeling impossible states as optional fields instead of state variants.
- Letting generated or external data bypass runtime validation.
- Overusing generics when a concrete domain type is clearer.

## Verification

- Run type checks when practical.
- Confirm boundary data is narrowed before use.
- Check nullable paths, error paths, and async results.
- Make sure public types remain compatible unless the change is intentional.

## Output Format

```markdown
## Type Issues

## Safer Model

## Runtime Boundaries

## Verification
```

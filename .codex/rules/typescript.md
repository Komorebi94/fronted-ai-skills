# TypeScript

## Always

- Avoid `any`; use `unknown` for untrusted or not-yet-narrowed values.
- Narrow `unknown` with type guards, schema validation, or explicit runtime checks before use.
- Prefer inferred types for local obvious values and explicit types for public APIs, boundaries, and complex data.
- Reuse existing domain types before declaring new overlapping types.
- Avoid type assertions that hide real uncertainty; justify unavoidable assertions with local evidence.
- Preserve type safety across async flows, error handling, and nullable values.
- Prefer discriminated unions for state variants and result shapes.
- Use utility types when they clarify intent without obscuring the domain model.
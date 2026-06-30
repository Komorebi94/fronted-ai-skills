# Testing

## When To Add Or Update Tests

- Add or update tests when changing business logic, bug fixes, public APIs, shared utilities, data transformations, or edge-case handling.
- Cover happy paths, boundary cases, invalid input, and failure paths that the change can affect.
- Prefer behavior-focused tests over implementation-coupled tests.
- Keep tests deterministic, isolated, and readable.
- Reuse existing test helpers and patterns before creating new ones.
- Do not add low-value tests that only assert framework behavior or implementation details.
- If tests are not practical, explain the verification performed and remaining risk.
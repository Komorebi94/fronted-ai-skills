---
description: Compare technical options or implementations
---

# Objective

Compare the requested implementations, options, APIs, libraries, designs, or code paths.

Return a clear recommendation when the evidence supports one.

---

# Use This When

- The user asks to compare options, implementations, APIs, libraries, designs, or code paths.
- The output should make tradeoffs and decision criteria explicit.

# Do Not Use This When

- Use `analyze` when the options are not yet understood and need investigation first.
- Use `design` when the user wants a new proposed solution, not a comparison.

---

# Use Relevant Skills

- Use `architecture-review` when comparing system boundaries or long-term maintainability.
- Use `frontend-engineering` when comparing UI or frontend implementations.
- Use `api-integration` when comparing API contracts or external integrations.
- Use `performance-optimization` when performance is a decision factor.
- Use `typescript-quality` when type safety affects the comparison.
- Use `testing-strategy` when testability or regression risk matters.

---

# Constraints

- Do not treat superficial style differences as meaningful unless they affect maintainability.
- Do not invent unstated requirements.
- Do not recommend a larger solution without a clear benefit.
- State when more evidence is needed to decide confidently.

---

# Output

Use `.claude/templates/comparison.template.md` as the primary output shape.

## Recommendation

State the preferred option and why.

## Same

List important shared behavior or equivalent properties.

## Different

List meaningful differences and their impact.

## Risks

Call out compatibility, regression, migration, or validation risks.

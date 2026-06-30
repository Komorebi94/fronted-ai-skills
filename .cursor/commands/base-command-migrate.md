---
description: Plan or perform a migration safely
---

# Objective

Plan or perform the requested migration across code, data, APIs, dependencies, or configuration.

Move from the current state to the target state safely, with compatibility and rollback considered.

---

# Use This When

- The user asks to move code, data, APIs, configuration, or behavior from one state to another.
- Compatibility, rollout, rollback, or cleanup matters.

# Do Not Use This When

- Use `upgrade` for dependency, SDK, framework, or runtime version changes.
- Use `refactor` for behavior-preserving structure changes without migration steps.

---

# Use Relevant Skills

- Use `architecture-review` when boundaries, ownership, or rollout strategy affect the migration.
- Use `api-integration` when API contracts or clients change.
- Use `typescript-quality` when data models or types change.
- Use `testing-strategy` for compatibility and regression coverage.
- Use `documentation` for migration guides and operational notes.
- Use `frontend-engineering` when frontend behavior or state changes.

---

# Constraints

- Prefer small reversible steps over one large rewrite.
- Do not remove compatibility before confirming it is no longer needed.
- Do not change unrelated behavior during migration.
- Clearly mark manual or operational steps.

---

# Output

Use `.cursor/templates/migration-plan.template.md` as the primary output shape.

## Summary

Describe the migration goal and recommended path.

## Migration Steps

List ordered implementation and operational steps.

## Risks

Call out compatibility, data, deployment, and rollback risks.

## Verification

Describe tests, checks, monitoring, and cleanup validation.

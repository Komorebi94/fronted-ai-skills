---
description: Upgrade dependencies, APIs, or platform versions
---

# Objective

Upgrade the requested dependency, API, framework, runtime, or platform integration.

Apply the upgrade safely while preserving expected behavior and compatibility.

---

# Use This When

- The user asks to upgrade a dependency, SDK, API version, framework, runtime, or platform.
- The target is a version or package change with compatibility implications.

# Do Not Use This When

- Use `plan` when the upgrade needs an approved rollout plan before edits.
- Use `implement` when the version is unchanged and only product behavior changes.

---

# Use Relevant Skills

- Use `typescript-quality` when types or APIs change.
- Use `testing-strategy` for regression coverage.
- Use `api-integration` when SDKs, clients, or external APIs change.
- Use `documentation` for migration notes and breaking changes.
- Use `frontend-engineering` when framework behavior affects UI code.

---

# Constraints

- Keep the upgrade scoped to the requested target.
- Do not opportunistically upgrade unrelated dependencies.
- Do not ignore breaking changes or failed verification.
- Do not fabricate release-note details; use verified sources when needed.

---

# Output

Use `.cursor/templates/upgrade-summary.template.md` as the primary output shape.

## Summary

Describe what was upgraded and why.

## Changes

List code, config, dependency, and test changes.

## Breaking Changes

Call out required migration notes and compatibility risks.

## Verification

List checks run or explain what could not be run.

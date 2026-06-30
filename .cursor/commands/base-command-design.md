---
description: Design a feature, UI, API, or system change
---

# Objective

Design the requested feature, UI, API, data model, or system change.

Produce a practical design that satisfies the goal while fitting the existing system.

---

# Use This When

- The user asks to design a feature, UI, API, data model, or system change.
- The main work is choosing the shape of a solution before implementation.

# Do Not Use This When

- Use `architecture` when reviewing whether an existing system structure is healthy.
- Use `plan` when the design is already chosen and only execution steps are needed.

---

# Use Relevant Skills

- Use `architecture-review` when system boundaries or long-term maintainability matter.
- Use `frontend-engineering` for frontend feature and component design.
- Use `ui-ux-accessibility` for UI states, interactions, and accessibility.
- Use `api-integration` for API contracts and external data flow.
- Use `typescript-quality` for data models and state variants.
- Use `testing-strategy` for verification design.

---

# Constraints

- Do not over-design for speculative future requirements.
- Do not introduce new infrastructure or abstractions without clear need.
- Do not assume requirements that the user did not provide.
- Preserve compatibility unless a migration is explicitly planned.

---

# Output

Use `.cursor/templates/design-doc.template.md` as the primary output shape.

## Summary

State the recommended design.

## Design

Describe the main flows, components, APIs, data, or architecture.

## Tradeoffs

Explain key decisions and alternatives.

## Implementation Plan

List practical implementation steps and verification needs.

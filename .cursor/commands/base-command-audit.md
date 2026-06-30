---
description: Audit code for security, reliability, and compliance risks
---

# Objective

Audit the selected code, open files, dependency surface, or requested feature area.

Identify security, reliability, privacy, compliance, and operational risks with concrete evidence.

---

# Use This When

- The user asks for a security, privacy, compliance, reliability, or operational risk audit.
- Findings need severity, evidence, impact, and remediation.

# Do Not Use This When

- Use `review` for general engineering correctness and maintainability review.
- Use `architecture` for broad system design health without a risk-audit focus.

---

# Use Relevant Skills

- Use `security-review` for security, privacy, compliance, and sensitive data risks.
- Use `code-review` for evidence-based finding format.
- Use `api-integration` for external data, auth, request, and response risks.
- Use `frontend-engineering` for client-side security and sensitive UI state.
- Use `typescript-quality` when unsafe data shapes or narrowing affect risk.

---

# Constraints

- Do not overstate risk when evidence is weak.
- Do not recommend heavy controls for low-impact issues.
- Do not expose secrets in the response.
- Mark assumptions and required follow-up validation clearly.

---

# Output

Use `.cursor/templates/security-audit.template.md` as the primary output shape.

## Summary

Brief risk assessment.

## Findings

List risks ordered by severity with evidence and impact.

## Controls

Suggest focused fixes, compensating controls, or risk-reducing safeguards.

## Open Questions

List unknowns that affect risk classification.

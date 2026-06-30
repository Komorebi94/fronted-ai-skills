---
name: security-review
description: Reviews security, privacy, compliance, authorization, sensitive data, logging, and supply-chain risks. Use for audits, threat reviews, or risk-focused analysis.
---

# Security Review

## When To Use

Use this skill for security audits, privacy reviews, auth and permission checks, sensitive data handling, dependency risk, logging risk, and compliance-sensitive changes.

## Core Principles

Follows `rules/security.mdc` for baseline security rules. This skill adds:

- Classify risk by exploitability, impact, exposure, and available controls.
- Separate confirmed vulnerabilities from assumptions and follow-up questions.
- Prefer focused mitigations that fit the system's trust boundaries.

## Workflow

1. Define the asset, actor, trust boundary, and requested scope.
2. Trace data entry, authorization, storage, logging, rendering, and outbound calls.
3. Check authentication, authorization, input validation, secrets, privacy, and error disclosure.
4. Review dependency, configuration, and operational controls when they affect risk.
5. Classify findings by severity with evidence, impact, and remediation.
6. State residual risk and unknowns that require validation.

## Checklist

- User input and external data are validated at boundaries.
- Authorization is enforced server-side or at the trusted boundary.
- Secrets, tokens, PII, and internal identifiers are not exposed in code, logs, URLs, or UI.
- Errors are user-safe while retaining diagnostic paths for maintainers.
- Network calls, redirects, file paths, and dynamic content avoid injection risks.
- Dependencies, environment variables, and permissions follow least privilege.

## Common Pitfalls

- Treating client-side checks as authorization.
- Reporting hypothetical issues without an abuse path or impact.
- Hiding sensitive values in UI but leaking them through logs or URLs.
- Adding broad sanitization instead of validating at the boundary.
- Ignoring rollout, monitoring, and rollback for security-sensitive changes.

## Verification

- Confirm the risky path with code, config, tests, or runtime evidence.
- Check both success and failure paths for leaks or bypasses.
- Validate remediation preserves expected behavior and compatibility.
- Mark unverified assumptions as open questions.

## Output Format

```markdown
## Summary

## Findings

## Controls

## Open Questions
```

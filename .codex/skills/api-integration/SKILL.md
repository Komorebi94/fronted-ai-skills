---
name: api-integration
description: Implements and reviews client API integrations safely. Use when handling requests, responses, loading states, errors, retries, cancellation, API contracts, or external data.
---

# API Integration

## When To Use

Use this skill for frontend or client-side API calls, SDK usage, response handling, and integration reviews.

## Core Principles

Follows `.codex/rules/security.md`, `.codex/rules/typescript.md`, and `.codex/rules/engineering.md` for boundary safety, type safety, and compatibility baselines. This skill adds:

- Keep request construction, response parsing, and caller state boundaries clear.
- Handle loading, empty, error, timeout, cancellation, and retry behavior intentionally.
- Make compatibility and contract changes explicit before changing clients.

## Workflow

1. Understand the endpoint, contract, auth requirements, and caller expectations.
2. Inspect existing API clients, request helpers, types, and error patterns.
3. Model request parameters and response data safely.
4. Handle cancellation, stale responses, retries, and duplicate requests when relevant.
5. Map API errors to user-facing or caller-facing states.
6. Verify success, failure, empty, invalid, and slow-network cases.

## Checklist

- Request params are validated, encoded, and not built from unsafe strings.
- Auth, permissions, and sensitive data are handled safely.
- Response shape is typed and narrowed at the boundary.
- Errors do not leak secrets or confusing internal details.
- Retries are bounded and do not duplicate side effects.
- UI or caller handles loading, empty, error, and success states.

## Common Pitfalls

- Trusting API response types without runtime checks at the boundary.
- Retrying non-idempotent requests without safeguards.
- Ignoring cancellation, stale responses, or duplicate in-flight requests.
- Leaking tokens, IDs, or internal errors into logs or UI.
- Handling only HTTP success while missing malformed success payloads.

## Verification

- Test success, empty, validation failure, server error, timeout, and cancellation.
- Confirm request params are encoded and sensitive data is not logged.
- Check that UI or callers receive stable, documented error shapes.
- Validate retry and deduplication behavior when present.

## Output Format

```markdown
## Contract

## Data Flow

## Error Handling

## State Handling

## Risks

## Verification
```

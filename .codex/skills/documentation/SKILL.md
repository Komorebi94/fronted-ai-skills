---
name: documentation
description: Writes and reviews technical documentation, README content, API docs, design docs, changelogs, and migration guides. Use when documenting code, workflows, decisions, setup, or user-facing behavior.
---

# Documentation

## When To Use

Use this skill for writing, editing, or reviewing technical documentation.

## Core Principles

Follows `.codex/rules/output.md` and `.codex/rules/security.md` for concise output and sensitive data handling. This skill adds:

- Write for the reader's task, not the author's knowledge.
- Keep examples accurate, runnable, and consistent with code.
- State prerequisites, assumptions, limitations, and expected outcomes.

## Workflow

1. Identify the audience, goal, scope, and document type.
2. Read the relevant code, commands, config, examples, or existing docs.
3. Choose a structure that matches the reader's workflow.
4. Include setup, usage, examples, edge cases, and troubleshooting when useful.
5. Review for accuracy, stale assumptions, security risks, and missing steps.
6. Verify commands, links, and examples when practical.

## Checklist

- The first section tells the reader what they can do.
- Prerequisites and required configuration are clear.
- Commands and code examples match the repository.
- Edge cases, errors, migration notes, or compatibility risks are included when relevant.
- No secrets, internal-only URLs, or sensitive data are exposed.
- The document has a clear maintenance owner or update trigger when needed.

## Common Pitfalls

- Documenting intended behavior that the code does not actually support.
- Copying stale commands or examples from unrelated projects.
- Hiding required setup in prose instead of explicit steps.
- Writing for maintainers only when the reader is a new user.
- Including secrets, private links, or environment-specific values.

## Verification

- Check commands, file paths, config keys, and examples against the repo.
- Confirm links and references point to maintained sources.
- Validate migration or setup steps in order when practical.
- Mark assumptions when behavior cannot be verified from code or docs.

## Output Format

```markdown
## Summary

## Documentation

## Assumptions

## Verification
```

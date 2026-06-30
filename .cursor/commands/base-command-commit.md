---
description: Prepare a clear commit from current changes
---

# Objective

Prepare a commit for the current changes only when the user explicitly asks to commit.

Create a focused, accurate commit that includes only relevant changes.

---

# Use This When

- The user explicitly asks to commit current changes.
- The work requires staging, committing, and reporting the result.

# Do Not Use This When

- Use PR tooling only when the user asks to create or update a pull request.
- Do not use this command for status-only or diff-only requests.

---

# Use Relevant Skills

- Use `code-review` to sanity-check changes before committing.
- Use `security-review` to identify secrets or sensitive files before staging.
- Use `documentation` when commit context includes docs or migration notes.
- Use `testing-strategy` when summarizing verification.

---

# Constraints

- Do not commit unless the user explicitly asks.
- Do not push unless the user explicitly asks.
- Do not include unrelated user changes.
- Do not skip hooks or amend commits unless explicitly allowed and safe.
- Do not run destructive git commands.
- Exclude secrets, credentials, environment files, and generated noise.

---

# Output

Use `.cursor/templates/commit-summary.template.md` as the primary output shape.

## Summary

Describe what was committed.

## Commit

Report the commit hash and message when available.

## Verification

Report post-commit status and any hook or check results.

## Notes

Mention excluded files, risks, or follow-ups.

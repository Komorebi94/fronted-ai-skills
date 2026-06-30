---
description: Research codebase, docs, APIs, or technical options
---

# Objective

Research the requested topic using the codebase, provided artifacts, official documentation, or reliable sources as appropriate.

Produce a verified answer, recommendation, or technical summary grounded in evidence.

---

# Use This When

- The user asks for evidence-backed research across code, docs, APIs, or options.
- The answer depends on sources that should be inspected instead of recalled.

# Do Not Use This When

- Use `ask` for direct answers that do not need research.
- Use `analyze` for a specific local code path, log, or technical problem.

---

# Use Relevant Skills

- Use `documentation` when researching docs, guides, examples, or writeups.
- Use `api-integration` when researching APIs, SDKs, or external contracts.
- Use `typescript-quality` when researching type behavior or data modeling.
- Use `frontend-engineering` when researching frontend implementation patterns.

---

# Constraints

- Do not fabricate sources, APIs, commands, or implementation details.
- Do not rely on memory when current docs or code are needed.
- Do not over-research when the answer is already supported by local context.
- Mark uncertainty clearly.

---

# Output

Use `.cursor/templates/research-summary.template.md` as the primary output shape.

## Answer

Give the direct answer or recommendation first.

## Evidence

List supporting files, links, docs, or command results.

## Tradeoffs

Explain relevant constraints, risks, and alternatives.

## Next Steps

Include only useful follow-up actions.

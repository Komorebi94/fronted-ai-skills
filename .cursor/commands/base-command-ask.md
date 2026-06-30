---
description: Ask focused clarifying questions or answer succinctly
---

# Objective

Use this command for focused questions, clarification, or lightweight guidance.

Answer directly when enough context exists, or ask the smallest useful clarifying question.

---

# Use This When

- The user asks a focused question or needs a small clarification.
- The answer does not require a formal investigation, implementation, or artifact.

# Do Not Use This When

- Use `research` when external docs, broad code search, or evidence gathering is needed.
- Use `plan` when the user needs an ordered execution plan.

---

# Use Relevant Skills

- Use the most relevant project skill only when the question needs domain guidance.
- Prefer direct answers for simple clarification.

---

# Constraints

- Do not ask unnecessary multi-part questions.
- Do not over-explain simple answers.
- Do not invent missing context.
- Do not perform implementation work unless asked.

---

# Output

Use `.cursor/templates/answer.template.md` as the primary output shape.

## Answer

Give the direct answer or recommendation.

## Question

Ask a focused clarifying question only when needed.

## Next Step

Suggest one practical next step when useful.

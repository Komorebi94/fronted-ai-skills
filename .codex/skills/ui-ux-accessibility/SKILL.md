---
name: ui-ux-accessibility
description: Reviews and improves UI, UX, responsive behavior, and accessibility. Use when building screens, components, forms, interactions, empty states, loading states, or accessibility improvements.
---

# UI UX Accessibility

## When To Use

Use this skill for UI implementation, UX review, accessibility review, responsive layout, and interaction design.

## Core Principles

Follows `.codex/rules/engineering.md` for correctness and maintainability baselines. This skill adds:

- UI must communicate state clearly.
- Accessibility is part of correctness, not polish.
- Prefer semantic HTML and native controls before custom interactions.
- Keep visual hierarchy and interaction feedback consistent.

## Workflow

1. Identify the user goal, context, and primary interaction.
2. Map all states: loading, empty, error, disabled, success, partial data, and permission denied.
3. Check semantic structure, labels, focus order, keyboard access, and ARIA usage.
4. Check responsive behavior, overflow, text wrapping, and touch targets.
5. Review contrast, spacing, hierarchy, affordance, and feedback.
6. Verify with manual interaction or targeted accessibility checks when possible.

## Checklist

- Interactive elements are reachable and usable by keyboard.
- Inputs have labels, validation messages, and clear error recovery.
- Focus is visible and managed across dialogs, drawers, menus, and route changes.
- Loading and error states are announced or visible where appropriate.
- Layout works across expected screen sizes and content lengths.
- Color is not the only way to communicate meaning.

## Common Pitfalls

- Using clickable `div` elements instead of semantic buttons or links.
- Adding ARIA where native HTML would be clearer and safer.
- Forgetting focus management in modals, drawers, menus, and route changes.
- Designing only the ideal state and missing empty or error states.
- Relying on color alone for validation, status, or priority.

## Verification

- Navigate changed UI with keyboard only.
- Check labels, names, roles, focus order, and visible focus state.
- Test long text, small screens, loading, empty, and error states.
- Use automated accessibility checks when available, then manually verify interactions.

## Output Format

```markdown
## UX Summary

## Accessibility Issues

## UI States

## Recommendations

## Verification
```

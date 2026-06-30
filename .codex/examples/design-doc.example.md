# Design Doc Example

## Summary

Introduce a shared filtering model so list pages can reuse URL state, validation, and reset behavior without coupling page-specific UI.

## Goals

- Keep filter state shareable through URLs.
- Preserve page-specific labels, defaults, and available filters.
- Make invalid query parameters fall back to safe defaults.

## Non-Goals

- Replacing existing table components.
- Adding server-side filtering in this change.

## Design

Create a small filter schema per page and a shared parser that converts URL params into validated state. Pages own their UI and pass normalized filters to existing data loaders.

## Tradeoffs

This adds a small schema layer, but it prevents each page from hand-rolling URL parsing and invalid-state handling.

## Edge Cases

- Unknown query keys are ignored.
- Invalid enum values fall back to defaults.
- Empty filters produce the canonical unfiltered URL.

## Implementation Plan

1. Add the shared parser and schema shape.
2. Migrate one list page as the reference implementation.
3. Add regression tests for invalid and empty URL states.

## Verification

Run focused unit tests for parsing and manually check URL sharing on the migrated page.

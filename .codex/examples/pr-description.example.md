# Pull Request Example

## Summary

- Adds validated URL filter parsing for account list pages.
- Keeps existing table rendering and data loading behavior unchanged.

## Test Plan

- [ ] Run unit tests for filter parsing.
- [ ] Manually verify empty, invalid, and shared filter URLs.

## Risks

Low. The main risk is URL compatibility for existing bookmarked filters; invalid values fall back to existing defaults.

## Notes

Follow-up: migrate the remaining list pages after this reference implementation is reviewed.

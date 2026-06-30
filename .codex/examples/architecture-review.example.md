# Architecture Review Example

## Summary

The feature is split into clear UI, state, and API layers, but ownership of derived state is duplicated between the page and table components.

## Current Shape

The page loads data, derives filter state from the URL, and passes both raw and normalized values into the table. The table also recalculates selected filters for display.

## Strengths

- API access is isolated behind a client module.
- URL state makes filtered views shareable.
- Error and empty states are handled at the page boundary.

## Risks

- Medium: duplicated derived filter state can drift when defaults change.
- Low: table components know about URL-specific concepts, making reuse harder.

## Recommendations

1. Move filter normalization into a shared page-level adapter.
2. Pass table-ready filter labels instead of raw query data.
3. Add tests around invalid URL params before moving more pages to this pattern.

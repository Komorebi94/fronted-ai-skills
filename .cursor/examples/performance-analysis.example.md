# Performance Analysis Example

## Bottleneck

`ProductTable` filters and sorts the full product list on every render, including renders caused by unrelated UI state changes.

## Optimization

Move the filtered and sorted result into a memoized selector keyed by `products`, `filters`, and `sort`. Keep the comparator stable and avoid recomputing when only modal state changes.

## Expected Benefit

Large product lists avoid repeated `filter` and `sort` work during unrelated interactions. This should reduce render latency for lists with thousands of rows.

## Risks

Incorrect dependencies could show stale results. Memoization adds value only if the product list is large or the table renders frequently.

## Verification

Measure render time before and after with the same product count. Add a test that changing filters updates the visible rows correctly.

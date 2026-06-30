# Research Summary Example

## Answer

Prefer React Query's `queryClient.cancelQueries` plus an abort `signal` when switching list filters quickly. This avoids stale responses overwriting the current filter without adding custom request-id bookkeeping in every caller.

## Evidence

- Project already uses `@tanstack/react-query` in `src/features/orders/hooks/useOrders.ts`.
- React Query docs: cancelled queries ignore late results when a newer query for the same key starts.
- Existing bug report: filter changes within 300ms show rows from the previous filter.

## Tradeoffs

- Cancelling in-flight requests increases repeat network work when users flip filters rapidly.
- Request-id guards still help for mutations that are not keyed by query cache.
- Unknown: whether the list endpoint supports HTTP abort without server-side side effects.

## Next Steps

1. Add `signal` support to the orders API client if missing.
2. Pass `queryClient.cancelQueries({ queryKey: ['orders'] })` before filter changes.
3. Add an integration test that changes filters faster than the mock latency.

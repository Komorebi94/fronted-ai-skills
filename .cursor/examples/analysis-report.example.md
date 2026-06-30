# Analysis Report Example

## Summary

The checkout page hangs in "Processing" because `submitOrder()` never clears `isSubmitting` when the payment API returns a 409 conflict.

## Evidence

- `src/pages/Checkout.tsx` sets `isSubmitting(true)` before `await submitOrder(payload)`.
- `submitOrder` throws on non-2xx responses, including 409 duplicate-order conflicts.
- The `catch` branch shows a toast but does not reset `isSubmitting`.
- Repro: submit twice within one second with the same cart id; second submit leaves the button disabled.

## Risks

- Users cannot retry without refreshing, which may lose form edits.
- Other submit paths may share the same state hook and have the same missing reset.
- Unknown whether analytics events fire twice on duplicate submits.

## Next Steps

1. Reset `isSubmitting` in a `finally` block in `Checkout.tsx`.
2. Search for other callers of `useSubmittingState` with the same pattern.
3. Add a regression test for failed submit followed by successful retry.

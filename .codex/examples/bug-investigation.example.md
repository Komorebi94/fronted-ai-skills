# Bug Investigation Example

## Summary

Search results sometimes show data for the previous query because slower requests can resolve after newer ones.

## Reproduction

1. Type `react`.
2. Quickly replace it with `typescript`.
3. Wait for both requests to finish.
4. The results may show `react` while the input shows `typescript`.

## Root Cause

`runSearch(query)` stores the response without verifying that the response still belongs to the latest query. There is no abort controller or request sequence guard.

## Fix Direction

Track the active request id and ignore responses that do not match the latest id. If the request helper supports cancellation, abort the previous request when a new query starts.

## Regression Test

Mock two requests where the older request resolves last. Assert that only the latest query updates the rendered results.

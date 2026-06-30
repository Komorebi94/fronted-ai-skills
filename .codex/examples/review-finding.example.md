# Review Finding Example

## Findings

- High: Stale request results can overwrite newer user data.
  Evidence: `loadUserProfile()` updates state after `await fetchProfile(userId)` without checking whether `userId` is still current.
  Impact: Fast account switching can show the previous user's profile in the current session.
  Fix direction: Abort the previous request or compare a request id before committing state.

- Medium: Error path leaves the save button disabled.
  Evidence: `isSaving` is set to `true` before submit, but the `catch` branch returns before resetting it.
  Impact: A failed save requires a page refresh before the user can retry.
  Fix direction: Reset `isSaving` in a `finally` block.

## Missing Tests

- Add a regression test for out-of-order profile requests.
- Add a failed-submit test that verifies the user can retry.

## Summary

The main risk is stale async state. The fix should be small and covered with focused regression tests.

# Migration Plan Example

## Summary

Move account settings from the legacy endpoint to the versioned profile API while keeping the old client path available during rollout.

## Migration Steps

1. Add the new profile API client behind a feature flag.
2. Read from the new endpoint and compare required fields with the legacy response.
3. Switch writes after parity checks pass.
4. Remove the legacy path after one release cycle without regressions.

## Compatibility

Persisted settings keep the same field names in application state. Missing fields from either API fall back to current defaults.

## Rollback

Disable the feature flag to return reads and writes to the legacy endpoint.

## Verification

Run contract tests for both clients, regression tests for settings save behavior, and a manual rollback check in staging.

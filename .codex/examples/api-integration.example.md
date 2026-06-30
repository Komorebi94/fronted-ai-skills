# API Integration Example

## Contract

`GET /users/:id/preferences` returns user notification settings. The client treats the response as untrusted until it is narrowed.

## Data Flow

The route param is normalized before building the request. The response is parsed into a `UserPreferences` object before updating UI state.

## Error Handling

- `404`: show the default preferences empty state.
- `401`: surface the existing sign-in required message.
- Network timeout: show retry UI without clearing the previous successful preferences.

## Risks

Malformed success payloads can otherwise produce invalid toggle states. A response parser should fail closed and show a recoverable error.

## Verification

Test success, `404`, timeout, malformed payload, and request cancellation when switching users.

# Documentation Example

## Summary

Documented how to configure local API credentials for development without exposing secrets in source control.

## Documentation

### Local API Credentials

Create a local environment file and set the following values:

```bash
API_BASE_URL=https://api.example.test
API_CLIENT_ID=local-client
```

Do not commit local credential files. Use the shared development secret manager for values that differ per developer.

### Troubleshooting

If requests return `401`, confirm that the client id matches the selected environment and that the local server has been restarted after editing the environment file.

## Assumptions

The project already ignores local environment files.

## Verification

Checked the documented variable names against the API client configuration.

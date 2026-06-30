# Performance

## Always

- Prefer clear, correct code before micro-optimizing.
- Optimize when code is on a hot path, handles large data, runs in tight loops, or affects frequent rendering.
- Avoid unnecessary work, allocation, network calls, and re-rendering in repeated execution paths.
- Prefer lazy or memoized computation only when the saved work is meaningful.
- Choose algorithms and data structures appropriate to expected input size.
- Measure or reason from concrete evidence before adding complex optimizations.
- Keep optimization changes behavior-preserving unless the user asks otherwise.
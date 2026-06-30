# Refactor Summary Example

## Summary

Extracted invoice total calculation from the component into a focused utility while preserving rendered output and validation behavior.

## Changes

- Moved discount, tax, and subtotal calculation into `calculateInvoiceTotals()`.
- Replaced duplicated inline calculations in the summary and submit payload.
- Kept component state shape and public props unchanged.

## Behavior Preservation

Inputs, displayed totals, validation messages, and submit payload fields remain unchanged. The refactor only centralizes existing calculation logic.

## Verification

- Existing invoice form tests pass.
- Added a focused utility test for subtotal, tax, discount, and zero-item cases.

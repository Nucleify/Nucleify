# Investor Surface — coverage strip

## Change
Coverage is a full-width **tab strip** (4 surfaces) with a sliding accent thumb and a single **detail stage** below (large index, title, outcome, description, proof). Dial + accordion ledger removed.

## Why
Left dial / right list left dead space and felt unfinished. Horizontal tabs use the panel width and read like diligence tooling.

## Verify
1. `/en/investor` → Coverage.
2. Hover / keyboard arrows across tabs → thumb + stage update.
3. `pnpm -C web exec vitest run vitests/pages/investor_content.spec.ts`

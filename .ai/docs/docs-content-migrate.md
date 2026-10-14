# Docs content — migrate-any-stack (audit)

`docs/content/{en,pl}` (16 pages each) aligned with repo reality and README messaging:

- Tagline: build once / migrate any framework; seven shells
- Six **exported** `nuc_*` modules (`shared_modules/index.ts` + package `exports`)
- Canonical = `make web`; convert = `TARGET=next|solid|svelte`; demos = `make vue|react|nuxt|next|solid|svelte`
- UI = Lit `nui-*` / `portable/nui/`; no `ad-*` product tree
- Pre-commit = `.config/bash/hook-checks.sh`; pre-push noop
- People & Credits: human GitHub contributors only (no automation bots);
- Bundle: `pnpm --filter @nucleify/docs generate:markdown-bundle`

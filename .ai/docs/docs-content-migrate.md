# Docs content - migrate-any-stack (audit)

`docs/content/{en,pl}` (16 pages each) aligned with repo reality and README messaging:

- Tagline: build once / migrate any framework; seven shells
- **Product convert first** - existing apps migrate without a `*.nuc.tsx` rewrite; portable authoring is optional
- Six **exported** `nuc_*` modules (`shared_modules/index.ts` + package `exports`)
- Canonical = `make web`; convert = `TARGET=next|solid|svelte|astro`; demos = `make vue|react|nuxt|next|solid|svelte|astro`
- UI = Lit `nui-*` / `portable/nui/`; no `ad-*` product tree
- Pre-commit = `.config/bash/hook-checks.sh`; pre-push noop
- People & Credits: human GitHub contributors only (no automation bots);
- Bundle: `pnpm --filter @nucleify/docs generate:markdown-bundle`
- Related note: `.ai/docs/migrate-without-nuc-tsx.md`

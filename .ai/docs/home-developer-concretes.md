# Home — developer concretes (copy + section order)

Home marketing narrative shifted from ROI fluff to shippable artefacts.

## What changed

- **Order:** `hero → compiler_demo (Emit) → pillars (Ship) → stack → clone → close` (pulse removed).
- **Pillars:** three concretes — portable emit, `shared_modules` domain, Supabase data plane — instead of `$200k` / `70%` / months.
- **Compiler demo:** `InboxBadge.nuc.tsx` with distinct idioms per shell (Vue `ref`/`computed`, Nuxt `useState` auto-import, React hooks, Next `usePathname`, Svelte runes, Solid signals, Astro frontmatter + `<script>`).
- **Emit board highlighting:** lightweight token spans via `web/src/sections/compiler_demo/highlight.ts` (keywords, strings, tags, attrs) — no Shiki.
- Sync compiler CMS props from `home.ts`: `pnpm exec vite-node --config vitest.config.ts .config/scripts/sync-compiler-cms-props.mts`
- **Copy:** hero/stack/clone/close name artefacts (`shared_modules`, Supabase gateway, `make web target=…`).
- **Modules board (hero):** `nuc_api` note/lane call out Supabase gateway explicitly.

## Sources

- Defaults: `shared_modules/nuc_admin/cms/defaults/content/home.ts`
- CMS section props: `shared_modules/nuc_admin/cms/defaults/marketing_props.ts`
- Layout: `shared_modules/nuc_admin/cms/default_pages.ts` (`DEFAULT_HOME_SECTIONS`)

## Verify

1. After copy/layout changes: regenerate seeder, then apply to the DB the site reads:
   ```sh
   pnpm exec vite-node --config vitest.config.ts .config/scripts/gen-cms-defaults.mts
   pnpm supabase:seeders:apply:linked   # or :local when local Postgres is up
   ```
   `HOME_META` in `.config/scripts/gen-cms-defaults.mts` must match `DEFAULT_HOME_SECTIONS`.
2. Hard-refresh `/en/home` (published CMS wins over code fallbacks).
3. Confirm rail has no Scale/pulse; Ship → Emit → Stack → Clone → Contact.
4. Pillars show Supabase + file/command proofs; emit board shows `SessionGate`.
5. `pnpm -s check && pnpm -s typeslint && pnpm -s slint && pnpm -s tests`

## Note

Older `.ai/specs/value-prop-and-messaging/*` still documents CFO-style ROI numbers; **home surface** follows developer concretes. Investor follows `.ai/docs/investor-capital-concretes.md`.

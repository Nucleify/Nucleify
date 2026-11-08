# Migrations company — delivery concretes (copy)

Marketing page for firms that migrate **other** companies’ stacks: `/{lang}/migrations-company`. Distinct from home (builder) and investor (capital): SOW margin, client briefs, reusable playbook.

## What shipped

- **Route / CMS slug:** `migrations-company` (canonical fallback + seeder). Legacy `/company` smashes here.
- **Composition:** intro → thesis → savings → wedge → surface → ask (shared widgets; CMS props carry delivery copy).
- **Hero:** `Win the migration brief.` / `Keep the hours.` (two lines) · short support · eyebrow `For migration companies`.
- **Glance:** `7→1` shells/playbook — product facts, no `$` hero.
- **Ask types:** Price a client migration · Guided conversion · Retainer / tooling · Partner chat.

## Sources

- Defaults: `shared_modules/nuc_admin/cms/defaults/content/company.ts`
- CMS section props: `COMPANY_SECTION_DEFAULTS` in `marketing_props.ts`
- Layout: `DEFAULT_COMPANY_SECTIONS` in `cms/default_pages.ts`

## Verify

1. Regenerate and apply seeder:
   ```sh
   pnpm exec vite-node --config vitest.config.ts .config/scripts/gen-cms-defaults.mts
   pnpm supabase:seeders:apply:linked
   ```
2. Hard-refresh `/en/migrations-company`.
3. Confirm two-line headline, short support, eyebrow `For migration companies`.
4. `pnpm -s check && pnpm -s typeslint && pnpm -s slint && pnpm -s tests`

# Investor — capital concretes (copy)

Investor marketing narrative shifted from modeled burn dollars to diligence-ready product facts, keeping a capital lens (moat, attach, rewrite avoided).

## What changed

- **Intro glance:** `7→1` shells/nucleus product snapshot — no `$180k` hero figure.
- **Thesis:** rewrite as second product · nucleus as durable asset · budget after usage — proofs name `shared_modules`, Supabase, land→earn.
- **Keep (savings slot):** three product facts — seven shells, zero runtime lock-in, one Supabase data plane.
- **Wedge / surface / ask:** open-core land → architecture stick → same-nucleus expand → paid-after-prod; timing chip is `Wave timing`, not `18-36mo`.
- **SEO:** IR-first nucleus, seven shells, open install + paid attach — no dollar range.

## Sources

- Defaults: `shared_modules/nuc_admin/cms/defaults/content/investor.ts`
- CMS section props: `shared_modules/nuc_admin/cms/defaults/marketing_props.ts` (`INVESTOR_*`)
- Keep layout: `web/src/sections/savings/` — head + three equal fact cards (wedge-kinship)

## Verify

1. Regenerate seeder, then apply to the DB the site reads:
   ```sh
   pnpm exec vite-node --config vitest.config.ts .config/scripts/gen-cms-defaults.mts
   pnpm supabase:seeders:apply:linked   # or :local when local Postgres is up
   ```
2. Hard-refresh `/en/investor` (published CMS wins over code fallbacks).
3. Confirm intro plate shows `7→1` / shells·nucleus; Keep rail has no `$`.
4. `pnpm -s check && pnpm -s typeslint && pnpm -s slint && pnpm -s tests`

## Note

Older `.ai/specs/value-prop-and-messaging/*` may still document CFO-style ROI numbers; **investor surface** follows `.ai/specs/plan.md` (capital concretes). Home follows `.ai/docs/home-developer-concretes.md`.

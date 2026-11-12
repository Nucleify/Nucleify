# nucleify investor copy

Sources: `content/investor.ts` + `INVESTOR_*` in `marketing_props.ts`.

your-product migrate is as-is; `shared_modules` / portable IR are post-join diligence — not gates ([your-product-migrate.md](./your-product-migrate.md)).

```bash
pnpm exec vite-node --config vitest.config.ts .config/scripts/gen-cms-defaults.mts
pnpm supabase:seeders:apply:linked
```

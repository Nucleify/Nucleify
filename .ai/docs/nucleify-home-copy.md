# nucleify home copy

Sources: `shared_modules/nuc_admin/cms/defaults/content/home.ts` + `marketing_props.ts`.

Order: `hero → compiler_demo → pillars → stack → clone → close`.

Public migrate line is **your-product** yes/as-is ([your-product-migrate.md](./your-product-migrate.md)). Demo `make web TARGET=…` is **nucleify** ([nucleify-migrate.md](./nucleify-migrate.md)).

```bash
pnpm exec vite-node --config vitest.config.ts .config/scripts/gen-cms-defaults.mts
pnpm supabase:seeders:apply:linked
```

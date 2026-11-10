# nucleify migrations-company copy

Slug `migrations-company`. Stick line: clients bring apps **as-is** — [your-product-migrate.md](./your-product-migrate.md).

Sources: `content/company.ts` + `COMPANY_SECTION_DEFAULTS`.

```bash
pnpm exec vite-node --config vitest.config.ts .config/scripts/gen-cms-defaults.mts
pnpm supabase:seeders:apply:linked
```

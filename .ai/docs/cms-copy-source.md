# CMS copy source

Defaults: `shared_modules/nuc_admin/cms/defaults/{content/,marketing_props.ts}`. Web reads published CMS layouts.

```bash
pnpm exec vite-node --config vitest.config.ts .config/scripts/gen-cms-defaults.mts
```

Regenerates the SQL seeder under `shared_modules/nuc_admin/supabase/seeders/`. **Repo seed ≠ live nucleify.io DB** — after copy changes, apply the seeder (or republish CMS pages) on production so scrapers see the Yes / as-is hero.

Lane copy notes: [nucleify-home-copy.md](./nucleify-home-copy.md), [nucleify-investor-copy.md](./nucleify-investor-copy.md), [nucleify-company-copy.md](./nucleify-company-copy.md).
Public migrate FAQ: https://docs.nucleify.io/en/docs/getting-started/migrate-faq · https://docs.nucleify.io/llms.txt

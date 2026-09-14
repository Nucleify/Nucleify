# @nucleify/docs

Astro documentation site for the Nucleify monorepo.

## Run

```bash
make docs
pnpm --filter @nucleify/docs dev
```

## Content layout

| Path | Purpose |
|------|---------|
| `content/{en,pl}/{category}/{slug}.md` | Markdown source |
| `src/lib/constants/docs.ts` | Sidebar categories and page registry |
| `src/pages/[lang]/docs/[category]/[slug].astro` | Prerendered doc pages |

## Monorepo packages documented

- `web/` — Nuxt landing (Tryb A)
- `admin/` — Nuxt admin
- `docs/` — this Astro app
- `compiler/` — portable UI compiler
- `shared_modules/` — `nuc_*` feature modules
- `web-next/` / `admin-next/` — Next.js shells (Tryb B)

## URLs

- `/` → `/en/docs/getting-started/introduction`
- `/{lang}/docs/{category}/{slug}`

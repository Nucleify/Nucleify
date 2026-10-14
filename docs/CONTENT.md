# Docs content (`@nucleify/docs`)

Astro documentation site. Markdown lives under `content/{en,pl}/{category}/{slug}.md`.

## Layout

| Path | Purpose |
|------|---------|
| `content/en/…` / `content/pl/…` | Localized Markdown |
| `src/lib/constants/docs.ts` | Sidebar categories + page titles (EN/PL) |
| `src/pages/[lang]/docs/[category]/[slug].astro` | Prerendered routes |
| `scripts/generate-doc-markdown-bundle.mjs` | Regenerates `markdown_bundle.generated.ts` |

After editing Markdown:

```bash
pnpm --filter @nucleify/docs run generate:markdown-bundle
```

Register new pages in `DOC_CATEGORIES` (`src/lib/constants/docs.ts`) with `title: { en, pl }`.

See `docs/README.md` for run commands.

# Marketing copy source

Section copy and demo data live in CMS (`cms_documents` + `shared_modules/nuc_admin/cms/defaults/marketing_props.ts`). The web app reads props from published layouts; it does not keep a parallel `pages/home/constants/content.ts` bag.

## Web helpers (generic)

| Path | Role |
|------|------|
| `web/src/utils/hrefs.ts` | `pageHref` / `docsPageHref` / investor home+docs hrefs |
| `web/src/utils/donut_arcs.ts` | Donut arcs (pillars share chart + thesis equal slices) |
| `web/src/cms/use_section_props.ts` | `pickCopy` / coalesce helpers |
| `web/src/types/marketing.ts` | Shared section item types |

Sections use `pickCopy(cms, keys)` and `coalesceArray(cms.items, [])` — empty when CMS omits data.

## Regenerating the seeder

```sh
pnpm exec vite-node --config web/vitest.config.ts .config/scripts/gen-cms-defaults.mts
```

Writes SQL from `marketing_props.ts` only.

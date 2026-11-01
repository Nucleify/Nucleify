# Admin CMS — full marketing editability

## What

Published `home` / `investor` page documents now store **full section props**: marketing copy, demo/list data (module board, pillars, stack, compiler nodes, pulse shells, investor surfaces…), and **layout knobs** (`railLabel`, `anchorId`, `showPanel` / `panelSide`, `showShareChart`, …). Admin LayoutEditor uses collapsible section cards with Content / Data / Layout tabs driven by each widget’s `adminFields`.

## Why

Section order alone was not enough — editors need the same content the Nucleify landing shows, without editing Vue constants.

## Pieces

| Piece | Path |
|-------|------|
| Default props (generated) | `shared_modules/nuc_admin/cms/defaults/marketing_props.ts` |
| Generator | `.config/scripts/gen-cms-defaults.mts` |
| Seeder | `…/seeders/20261024120000_nuc_admin_cms_default_pages_seeder.sql` |
| Widget `adminFields` | `shared_modules/nuc_admin/cms/widgets/*` |
| LayoutEditor cards | `admin/src/components/cms/LayoutEditor.vue` |
| Web merge / bind | `web/src/cms/section_registry.ts`, section SFCs |

## Regenerate defaults + seeder

After changing `web/src/pages/home|investor/constants/content.ts`:

```sh
pnpm exec vite-node .config/scripts/gen-cms-defaults.mts
pnpm supabase:seeders:apply:local
```

## Web behaviour

Sections receive CMS props via `v-bind="sectionBindAttrs(section)"`. Missing values fall back to local constants. `showSection: false` hides a block from the page and rail.

## Verify

```sh
pnpm supabase:seeders:apply:local
# Admin → Pages → home — expand a section; Content/Data/Layout filled
# Publish; open /en/home — matches Nucleify copy
pnpm -s check && pnpm -s typeslint && pnpm -s slint && pnpm -s tests
```

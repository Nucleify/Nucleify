# Admin CMS v2 — SchemaFormRenderer + Pages (slice 4)

## What

Config-driven page editor: `SchemaFormRenderer` maps `FieldConfig[]` to `Field*` controls; Pages collection list + document edit with main/sidebar split and draft/publish.

## Why

Editors should create/update PageLayout JSON without hand-written HTML; sidebar fields come from `admin.position: 'sidebar'`.

## UI

| Piece | Path |
|-------|------|
| Schema form | `admin/src/components/cms/SchemaFormRenderer.vue` |
| Document chrome | `DocumentForm.vue`, `DocumentMetaSidebar.vue` |
| Blocks (basic) | `FieldBlocks.vue` — add / reorder up-down / props JSON |
| Routes | `/[lang]/collections/pages`, `/[lang]/collections/pages/[id]` (`new` = create) |
| Composable | `use_document_form.ts` |

Rail: **Pages** under Collections.

## Verify

```sh
pnpm supabase:migrations:apply:local
pnpm supabase:seeders:apply:local
pnpm --filter @nucleify/admin dev
# Collections → Pages → Create → add home.hero section → Save draft → Publish
pnpm -s check && pnpm -s typeslint && pnpm -s slint && pnpm -s tests
```

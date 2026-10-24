# Admin CMS v2 — layout editor / blocks (slice 5)

## What

Drag-reorderable page sections with `WidgetPicker` and props forms derived from each widget’s `propsSchema`.

## Why

Section order and widget props must be editable in admin and persisted in PageLayout JSON.

## Pieces

| Piece | Role |
|-------|------|
| `LayoutEditor.vue` | DnD reorder, remove, props form |
| `WidgetPicker.vue` | Add section by registered type |
| `widget_props_fields.ts` | `propsSchema` → `FieldConfig[]` |
| `FieldBlocks.vue` | Thin alias → `LayoutEditor` |

## Verify

```sh
pnpm --filter @nucleify/admin dev
# Pages → edit → add home.hero + home.pillars → drag reorder → Save draft
# API document `data.sections` order matches UI
pnpm -s check && pnpm -s typeslint && pnpm -s slint && pnpm -s tests
```

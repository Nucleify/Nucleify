# Admin CMS — layout editor / blocks

## What

Collapsible section cards with drag reorder, WidgetPicker, and typed props forms from each widget’s `adminFields` (Content / Data / Layout tabs). Arrays use `FieldArray`; nested groups use `FieldGroup`. Fallback: `propsSchema` → JSON only when `adminFields` is missing.

## Why

Editors need scannable section cards and structured fields — not raw JSON for every prop.

## Pieces

| Piece | Role |
|-------|------|
| `LayoutEditor.vue` | Cards, collapse, DnD, remove, props form |
| `WidgetPicker.vue` | Add section by registered type |
| `defaultPropsForType` | Prefills new sections from marketing defaults |
| `widget_props_fields.ts` | Legacy `propsSchema` → `FieldConfig[]` |
| `FieldBlocks.vue` | Thin alias → `LayoutEditor` |

## Verify

```sh
pnpm --filter @nucleify/admin dev
# Pages → edit home → expand Home hero → edit headline / modules → Save draft
pnpm -s check && pnpm -s typeslint && pnpm -s slint && pnpm -s tests
```

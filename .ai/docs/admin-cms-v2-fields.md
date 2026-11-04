# Admin CMS v2 — UI kit discipline (slice 2)

## What

Admin forms use thin `Field*` wrappers over `nui-*` only. Native `<select>` / `<input type="checkbox">` removed from pages.

## Why

Schema-driven editors (later slices) need a single field chrome (`FieldShell`) and no parallel form controls.

## Components

| Component | Role |
|-----------|------|
| `FieldShell` | Label, hint, error slot |
| `FieldText` | `nui-input-text` + expose `.value` |
| `FieldTextarea` | `nui-textarea` + expose `.value` |
| `FieldSelect` | `nui-select` + `v-model` |
| `FieldCheckbox` | `nui-checkbox` + `update:checked` |

`portable/nui` registers `nui-checkbox` with the other deferred controls.

## Verify

```sh
pnpm --filter @nucleify/admin dev
# Users / Roles / CMS / Settings / Login — no native select/checkbox
pnpm -s check && pnpm -s typeslint && pnpm -s slint && pnpm -s tests
```

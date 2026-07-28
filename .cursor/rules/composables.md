---
description: Nuxt composables, React hooks, useConfig, apiUrl, and i18n
globs: nuxt/composables/**,**/use_*.ts,**/*.react.ts,modules/*/utils/api.ts
alwaysApply: false
---

# Composables & Hooks

## Nuxt Auto-imports

Directories auto-imported (no explicit import): `nuxt/composables/**`, `nuxt/atomic/**`, `modules/**` (Vue surface only).

## useConfig / apiUrl / appUrl

Runtime config in `nuxt/composables/config/`:

```typescript
const config = useConfig()
apiUrl()   // API base (e.g. '/api' or full URL)
appUrl()   // App URL
appEnv()   // 'local' | 'production' | …
```

Used in request composables:

```typescript
await apiHandle<T>({ url: `${apiUrl()}/calendar/events`, … })
```

## Key Module Utilities

| Composable / hook | Module | Purpose |
|-------------------|--------|---------|
| `useOfficeType()` | `nuc_pages` | Layout: `front-office` / `back-office` |
| `useDarkMode()` | `nuc_dark_mode` | Dark mode state |
| `useLoading()` | `nuc_globals/loading` | `{ loading, setLoading }` |
| `useNucDialog()` | `nuc_templates/dialog` | Dialog close helper |
| `useToolbarStyle()` | `nuc_templates/dock` | Dock vs sidebar (`use_toolbar_style.ts` / `.react.ts`) |
| `entityRequests()` | per module | CRUD via `apiHandle` |

## React

React hooks live beside Vue composables with `.react.ts` suffix. Import from `nucleify` (via `index.react.ts`). Use `useSyncExternalStore` for shared client stores when syncing with vanilla TS modules.

## i18n

- **Vue:** `const { t } = useI18n()` from `vue-i18n`
- **React:** `import { t } from 'nucleify'` (locale store in `nuc_languages`)
- Keys in DB seeder; use `t('calendar-today')` directly — no constant indirection files

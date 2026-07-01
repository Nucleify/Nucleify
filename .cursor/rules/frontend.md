---
description: Nuxt/Next structure, Atomic Design, module barrels, and UI conventions
globs: nuxt/**,next/**,modules/**/atomic/**
alwaysApply: false
---

# Frontend

**Nuxt 3.21** (`srcDir: 'nuxt'`) and **Next 16** (`next/`) share modules via the `nucleify` alias. Vue 3.5 Composition API, PrimeVue 4.3 / PrimeReact 10.9, Pinia 3.0, SCSS, TypeScript 5.8.

## Structure

```
nuxt/                          # Nuxt app
├── atomic/                    # Global Atomic Design (ad- prefix, auto-imported)
│   ├── boson/
│   ├── atom/
│   ├── molecule/
│   └── organism/
├── pages/[lang]/              # Thin wrappers → module pages
├── layouts/                   # default, front-office, back-office
└── plugins/modules.ts         # registerNuc* plugins

next/                          # Next app (App Router)
├── app/[lang]/                # Thin wrappers → module pages
├── atomic/                    # React Ad* components (PrimeReact)
└── types/

modules/nuc_*/                 # Feature modules (submodules)
├── atomic/                    # bosons, pages, templates
├── index.ts                   # Vue barrel
└── index.react.ts             # React barrel
```

## Atomic Component File Structure (Nuxt)

```
nuxt/atomic/{level}/{component}/
├── index.vue
├── index.ts
├── _index.scss
└── types/
    ├── interfaces.ts
    └── variables.ts
```

React equivalents live in `next/atomic/` with `.tsx` + `index.module.scss`.

## Module Atomic Structure

```
atomic/
├── bosons/
│   ├── constants/fields/
│   ├── types/api/
│   ├── types/object/
│   └── utils/api/             # *Requests() composables
├── pages/
└── templates/
```

## Conventions

- Vue: `<script setup lang="ts">`, SCSS modules where used
- React: `'use client'` when needed; **named exports only** in module `.tsx`
- Props: `defineProps<Interface>()` / typed React props
- Types: `NucPascalCase` prefix (e.g. `NucCalendarEventObjectInterface`)
- Imports: `import { … } from 'nucleify'` — never deep `../../../modules/…`
- i18n: Vue `useI18n()` + `t('key')`; React `t` from `nucleify` (`nuc_languages`)
- Translation keys in `modules/nuc_languages/supabase/seeders/` (en, pl, vn)

## Module Barrel Exports

Every module exposes its public API through root `index.ts` (Vue) and `index.react.ts` (React).

### `index.ts` (Vue / Nuxt)

- **Vue components** (`.vue`): `export { default as NucName } from './…'`
- **Everything else:** `export * from './…'`

```typescript
export { default as NucDock } from './index.vue'
export { default as NucDockSettingsCard } from './components/settings-card/index.vue'
export * from './nuc_dock'
export * from './utils/use_toolbar_style'
```

### `index.react.ts` (React / Next)

- **Always** `export * from './…'`
- Named exports in `.tsx` — no `export default` in module components

```typescript
export * from './index.tsx'
export * from './components/settings-card/index.tsx'
export * from './utils/use_toolbar_style.react'
```

Framework-specific pairs (`use_foo.ts` / `use_foo.react.ts`) go in the matching barrel only.

## API Communication

```typescript
export function calendarRequests(): NucCalendarRequestsInterface {
  const { items: events, setItems: setEvents } = useEntityResults()
  const { loading, setLoading } = useLoading()

  async function getEventsInRange(from: string, to: string): Promise<void> {
    await apiHandle<NucCalendarEventObjectInterface[]>({
      url: `${apiUrl()}/calendar/events?from=${from}&to=${to}`,
      setLoading,
      onSuccess: setEvents,
    })
  }
  return { events, loading, getEventsInRange, … }
}
```

## State

Pinia 3.0 + `pinia-plugin-persistedstate`. Utilities from `nuc_stores`: `initialStoreState`, `setAllStatesTo`, `toggleState`.

## Auth

Supabase Auth via `@supabase/supabase-js`. Session handled server-side in API gateway (`withGatewayUser`).

## Plugin Registration (Nuxt)

1. Export `registerNucExample` from `modules/nuc_example/nuc_example.ts`
2. Re-export from `modules/index.ts`
3. Import and call in `nuxt/plugins/modules.ts` (alphabetically, after `registerNucGlobals`)

## Layouts

- `front-office` — public (landing, docs, login)
- `back-office` — authenticated (entities, settings, calendar)
- Selected via `useOfficeType()` (`nuc_pages`)
- Dock vs sidebar layout: `useToolbarStyle()` (`nuc_dock`)

## Pages

Thin wrappers only:

```vue
<!-- nuxt/pages/[lang]/calendar.vue -->
<template>
  <nuc-calendar-page />
</template>
```

```tsx
// next/app/[lang]/calendar/page.tsx
import { NucCalendarPage } from 'nucleify'
export default function Page() {
  return <NucCalendarPage />
}
```

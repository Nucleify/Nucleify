---
description: Nuxt/Next structure, module barrels, and nucleify-ui conventions
globs: nuxt/**,next/**,modules/**
alwaysApply: false
---

# Frontend

**Nuxt** (`srcDir: 'nuxt'`) and **Next** (`next/`) share modules via the `nucleify` alias. UI is **`nucleify-ui`** (Lit `nui-*`). Feature UI in `modules/nuc_*` is being rewritten from scratch.

## Structure

```
nuxt/                          # Nuxt app
├── pages/[lang]/              # Thin route wrappers
├── layouts/                   # App layouts
└── plugins/                   # nucleify-ui + registerNuc*

next/                          # Next app (App Router)
├── app/[lang]/                # Thin route wrappers
└── nucleify.ts                # React barrel → modules

modules/nuc_*/                 # Feature modules (submodules)
├── constants/ types/ utils/   # Shared non-UI
├── pages/ components/         # Feature UI (nui-*)
├── index.ts                   # Vue barrel
└── index.react.ts             # React barrel
```

## Module Structure

```
modules/nuc_example/
├── constants/
├── types/
│   ├── api/
│   └── object/
├── utils/
│   └── api.ts
├── pages/
├── components/
└── styles/
```

## Conventions

- UI: `nui-*` from `nucleify-ui` only (no `nuxt/atomic` / `next/atomic` / `ad-*`)
- Vue: `<script setup lang="ts">`
- React: `'use client'` when needed; **named exports only** in module `.tsx`
- Types: `NucPascalCase` prefix
- Inside rewrite modules: relative imports — not `from 'nucleify'`
- i18n: Vue `useI18n()`; React via `nuc_languages`

## Module Barrel Exports

- **Vue** `index.ts`: `export { default as NucName } from './….vue'` + `export * from './…'`
- **React** `index.react.ts`: `export * from './….tsx'` (named exports only)

## Plugin Registration (Nuxt)

```typescript
// nuxt/plugins/modules.ts
registerNucExample(nuxtApp.vueApp)
```

```typescript
// modules/nuc_example/nuc_example.ts
export function registerNucExample(app: App): void {
  app.component('nuc-example', NucExample)
}
```

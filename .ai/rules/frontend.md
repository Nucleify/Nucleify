# Frontend

Nuxt 3.20 (`srcDir: 'nuxt'`), Vue 3.5 Composition API, PrimeVue 4.3, Pinia 3.0, SCSS, TypeScript 5.8.

## Structure

```
nuxt/
├── app.vue
├── assets/                    # Global SCSS
├── atomic/                    # Atomic Design (ad- prefix, auto-imported)
│   ├── boson/                 # Pure TS helpers (transformProps, camelToKebab)
│   ├── atom/                  # PrimeVue wrappers (AdButton, AdIcon, AdLabel, AdInputText)
│   ├── molecule/              # Composed atoms (AdAnchor, AdFloatLabel, AdTile)
│   └── organism/              # Complex UI (AdCard, AdDialog, AdDataTable, AdChart, AdMenu)
├── composables/
├── layouts/                   # default, front-office, back-office
├── pages/                     # Thin wrappers: <nuc-example-page />
└── plugins/
```

## Atomic Component File Structure

```
nuxt/atomic/{level}/{component}/
├── index.vue                  # <script setup lang="ts"> + <style lang="scss" module>
├── index.ts                   # export { default as AdName } from './index.vue' + export * from './types'
├── _index.scss                # Optional scoped styles
└── types/
    ├── index.ts
    ├── interfaces.ts          # Props interface extends PrimeVue props
    └── variables.ts           # Type aliases (optional)
```

## Module Atomic Structure (`modules/nuc_*/atomic/`)

```
atomic/
├── bosons/
│   ├── constants/fields/      # useEntityFields()
│   ├── types/api/{Entity}/    # NucEntityRequestsInterface
│   ├── types/object/{Entity}/ # NucEntityObjectInterface
│   └── utils/api/             # entityRequests() composables
├── pages/                     # Full-page components
└── templates/                 # Reusable templates
```

## Conventions

- `<script setup lang="ts">` — always
- `<style lang="scss" module>` — reference via `$style['class-name']`
- Props: `defineProps<Interface>()`, interfaces extend PrimeVue props
- PrimeVue wrappers: `v-bind="transformProps(props, excludedProps)"`
- Types: `NucPascalCase` prefix (e.g. `NucArticleObjectInterface`)
- Imports: `nucleify` alias for cross-module (`import { ... } from 'nucleify'`)
- Barrel files (`index.ts`) at every directory level
- Pages are thin wrappers rendering module components

## API Communication

```typescript
// modules/nuc_*/atomic/bosons/utils/api/entity_requests.ts
export function entityRequests(close?: CloseDialogType): NucEntityRequestsInterface {
  const results = ref([])
  const { loading, setLoading } = useLoading()

  async function getAll(loading?: boolean): Promise<void> {
    await apiHandle<NucEntityObjectInterface[]>({
      url: apiUrl() + '/entities',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response) => { results.value = response },
    })
  }

  return { results, loading, getAll, ... }
}
```

## State

Pinia 3.0 + `pinia-plugin-persistedstate`. Utilities from `nuc_stores`: `initialStoreState`, `setAllStatesTo`, `toggleState`.

## Auth

`@qirolab/nuxt-sanctum-authentication` for Laravel Sanctum SPA auth.

## Plugin Registration

New modules must be registered in `nuxt/plugins/modules.ts`:

1. Export `registerNucExample` from `modules/nuc_example/nuc_example.ts`
2. Re-export from `modules/index.ts`
3. Import and call in `nuxt/plugins/modules.ts`:

```typescript
// nuxt/plugins/modules.ts (enforce: 'pre')
registerNucGlobals(nuxtApp.vueApp)  // always first
registerNucExample(nuxtApp.vueApp)  // add alphabetically
```

## Layouts

- `front-office` — public pages (landing, docs, offer)
- `back-office` — authenticated pages (entities, admin, settings)
- Selected via `useOfficeType()` composable

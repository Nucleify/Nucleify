# Frontend (Nuxt / Vue)

## Overview

Frontend is built on **Nuxt 3** with **Vue 3** (Composition API), **TypeScript**, **PrimeVue 4**, **Pinia**, and **SCSS**. The source directory is `nuxt/` and modules extend it from `modules/`.

---

## Stack

- **Framework:** Nuxt 3.20 (`srcDir: 'nuxt'`)
- **Vue:** 3.5 (Composition API with `<script setup>`)
- **UI Library:** PrimeVue 4.3 (Lara theme, dark mode)
- **State Management:** Pinia 3.0 with `pinia-plugin-persistedstate`
- **Styling:** SCSS with CSS Modules
- **Charts:** Chart.js 4.4
- **Animations:** GSAP 3.13
- **Icons:** Nuxt Icon with `@iconify-json/mdi` and `@iconify-json/prime`
- **Linting:** Biome 2.1, Stylelint
- **Testing:** Vitest 3.2, Cypress (E2E)
- **Storybook:** 8.6
- **TypeScript:** 5.8

---

## Project Structure

```
nuxt/
├── app.vue                    # Root component
├── assets/                    # Global SCSS
├── atomic/                    # Atomic Design components (ad- prefix)
│   ├── atom/                  # Buttons, inputs, labels, icons
│   ├── molecule/              # Anchors, float labels, tiles
│   ├── organism/              # Cards, dialogs, charts, tables
│   └── boson/                 # Shared utilities (transformProps)
├── composables/               # Nuxt composables (config, runtime)
├── config/                    # App config (schema-org)
├── layouts/                   # Nuxt layouts
│   ├── default.vue
│   ├── front-office.vue
│   └── back-office.vue
├── pages/                     # Nuxt pages (file-based routing)
│   ├── index.vue
│   ├── home.vue
│   ├── login.vue
│   ├── register.vue
│   ├── admin.vue
│   ├── offer.vue
│   ├── settings.vue
│   ├── docs.vue
│   ├── entities/              # Entity CRUD pages
│   └── structural/            # Structural entity pages
├── plugins/                   # Nuxt plugins
└── server/                    # Server-side config
```

---

## Nuxt Configuration Highlights

- `srcDir: 'nuxt'` — source directory is `nuxt/`, not the root
- `publicDir: './public'` — public assets at project root
- **Auto-import** atomic components with `ad` prefix from `atom/`, `molecule/`, `organism/`
- **Alias:** `atomic` → `~/atomic` for module imports
- **Module imports:** `modules/**` are auto-imported
- **SSR:** controlled by `SSR` env variable
- **Layouts:** `front-office` and `back-office` based on route context

---

## Component Conventions

### Script Setup
All components use `<script setup lang="ts">` with TypeScript:

```vue
<script setup lang="ts">
import type { ButtonInterface } from '.'
const props = defineProps<ButtonInterface>()
</script>
```

### PrimeVue Wrappers
Atomic components wrap PrimeVue components and forward props with `transformProps`:

```vue
<template>
  <Button v-bind="transformProps(props, excludedProps)">
    <slot />
  </Button>
</template>
```

### Styling
- Use **SCSS** with `<style lang="scss" module>` (CSS Modules)
- Reference styles with `$style['class-name']` in templates
- Import component SCSS via `@import 'index';`
- Global SCSS imported in `nuxt/assets/` and `modules/*/_index.scss`
- Global SCSS variables available via `vite.css.preprocessorOptions.scss.additionalData`

### TypeScript
- **Interfaces** for component props, extending PrimeVue types
- **Type aliases** for union types and custom variants
- All types exported through barrel files (`index.ts`)
- Use `atomic` alias for cross-module imports: `import { ... } from 'atomic'`

---

## State Management

### Pinia
- Stores use `pinia-plugin-persistedstate` for persistence
- Module `nuc_stores` provides utilities: `initialStoreState`, `setAllStatesTo`, `toggleState`
- Type-safe store interfaces in `nuc_stores/pinia/types/`

### Storage Utilities (`nuc_stores`)
- `cookie/` — `getItem`, `setItem`
- `localStorage/` — `getItem`, `setItem`
- `sessionStorage/` — `getItem`, `setItem`
- Each utility has its own tests

---

## API Communication

### Pattern
Modules define API request composable functions in `atomic/bosons/utils/api/`:

```typescript
export function articleRequests(close?: CloseDialogType): NucArticleRequestsInterface {
  const results = ref([])
  const { loading, setLoading } = useLoading()

  async function getAllArticles(loading?: boolean): Promise<void> {
    await apiHandle<NucArticleObjectInterface[]>({
      url: apiUrl() + '/articles',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response) => { results.value = response },
    })
  }

  return { results, loading, getAllArticles, ... }
}
```

### `apiHandle` Utility (`nuc_api`)
Central API handler that wraps fetch calls with loading state, error handling, and response unwrapping:

```typescript
export async function apiHandle<T>({ url, method, data, id, setLoading, onSuccess }: ApiHandleOptionsInterface<T>): Promise<void>
```

### Auth
Uses `@qirolab/nuxt-sanctum-authentication` for Laravel Sanctum SPA authentication.

---

## Layouts

- `default.vue` — base layout
- `front-office.vue` — public-facing pages (landing, docs, offer)
- `back-office.vue` — authenticated dashboard pages (entities, admin, settings)
- Layout selection is dynamic via `useOfficeType()` composable

---

## Pages

Pages in `nuxt/pages/` are thin wrappers that render module components:

```vue
<template>
  <div id="home">
    <nuc-home-page />
  </div>
</template>
```

Module page components (registered via `nuc_example.ts`) contain the actual logic.

---

## Testing

### Vitest
- Config in `vitest.config.ts` at project root
- Module-level tests in `modules/nuc_*/vitests/`
- Global tests in `vitests/`
- API request tests organized by entity and status code

### Cypress
- E2E tests in `cypress/e2e/`
- Component tests in `cypress/component/`
- Fixtures in `cypress/fixtures/`

### Storybook
- Stories co-located with atomic components as `index.stories.ts`
- Configured at `http://localhost:6006`

---

## Build & Optimization

- **Code splitting:** Manual chunks for `vue`, `pinia`, `primevue`, `chartjs`, `gsap`, `marked`, `highlightjs`
- **Minification:** Terser with `drop_console` and `drop_debugger`
- **CSS:** Code splitting enabled, SCSS preprocessor with global imports
- **Compression:** Brotli + Gzip for public assets
- **Fonts:** Google Fonts (Inter) with preconnect and download
- **Icons:** SVG mode with server bundles for `prime` and `mdi` collections


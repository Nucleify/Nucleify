# Atomic Design

## Overview

This project follows the **Atomic Design** methodology for organizing UI components into a hierarchical structure that promotes reusability, maintainability, and scalability.

There are two layers of Atomic Design in this project:
1. **Global atomic components** in `nuxt/atomic/` — reusable, PrimeVue-based wrappers (prefixed with `ad-`)
2. **Module-level atomic structures** in `modules/*/atomic/` — domain-specific bosons, pages, and templates

---

## Global Atomic Components (`nuxt/atomic/`)

### Hierarchy

#### 1. Bosons (`nuxt/atomic/boson/`)
Shared utility logic used across atomic components (e.g. `transformProps`, `camelToKebab`). These are **not** Vue components — they are pure TypeScript helpers.

#### 2. Atoms (`nuxt/atomic/atom/`)
Fundamental, indivisible UI building blocks. Each atom wraps a PrimeVue component with a typed interface.

- Examples: `AdButton`, `AdIcon`, `AdLabel`, `AdImage`, `AdInputText`, `AdTextarea`, `AdCheckbox`, `AdSkeleton`
- Auto-imported with prefix `ad-` (configured in `nuxt.config.ts`)

#### 3. Molecules (`nuxt/atomic/molecule/`)
Combinations of atoms that form a single functional unit.

- Examples: `AdAnchor` (combines `AdIcon` + `AdImage` + `AdLabel`), `AdFloatLabel`, `AdTile`

#### 4. Organisms (`nuxt/atomic/organism/`)
Complex UI structures composed of molecules and/or atoms. They may contain internal logic and state.

- Examples: `AdCard`, `AdDialog`, `AdDataTable`, `AdChart`, `AdMenu`, `AdToast`, `AdTabs`

### Component File Structure

Every atomic component follows this structure:

```
nuxt/atomic/{level}/{component-name}/
├── index.vue          # Vue component
├── index.ts           # Re-exports component + types
├── index.stories.ts   # Storybook stories (optional)
├── _index.scss        # Component-scoped styles (optional)
└── types/
    ├── index.ts       # Re-exports all type files
    ├── interfaces.ts  # Props interface (extends PrimeVue props)
    └── variables.ts   # Type aliases and unions (optional)
```

### Conventions

- **Props interfaces** extend the corresponding PrimeVue component props (e.g. `ButtonInterface extends ButtonProps`)
- **CSS Modules** are used via `<style lang="scss" module>` with `$style` references
- **`transformProps`** utility forwards PrimeVue-compatible props using `v-bind="transformProps(props)"`
- **Exports** in `index.ts` always use: `export { default as AdComponentName } from './index.vue'` and `export * from './types'`
- Components are auto-imported in `nuxt.config.ts` with `prefix: 'ad'`

---

## Module-Level Atomic Structures (`modules/*/atomic/`)

Each module with frontend logic has its own `atomic/` folder with a domain-specific hierarchy:

### Hierarchy

#### 1. Bosons (`modules/*/atomic/bosons/`)
Module-specific constants, types, and utility functions. These are **not** Vue components.

```
atomic/bosons/
├── constants/         # Field definitions, roles, config
│   ├── fields/        # Entity field configs (e.g. useArticleFields())
│   └── index.ts
├── types/
│   ├── api/           # API response/request interfaces per entity
│   │   └── {Entity}/
│   │       ├── interfaces.ts
│   │       └── index.ts
│   └── object/        # Object shape interfaces per entity
│       └── {Entity}/
│           ├── interfaces.ts
│           └── index.ts
├── utils/
│   └── api/           # API request composables per entity (e.g. articleRequests())
│       ├── {entity}_requests.ts
│       └── index.ts
└── index.ts
```

#### 2. Pages (`modules/*/atomic/pages/`)
Full-page Vue components specific to a module (e.g. entity dashboard pages).

#### 3. Templates (`modules/*/atomic/templates/`)
Reusable template components within the module scope (e.g. dashboard panels).

### Conventions

- All module exports go through barrel files (`index.ts`) at every level
- Module `index.ts` re-exports: module main file, `atomic/`, and `vitests/`
- Types use `NucPascalCase` prefix naming (e.g. `NucArticleObjectInterface`, `NucArticleRequestsInterface`)
- API requests are composable functions returning refs and async methods
- All imports from other modules use the `atomic` path alias (configured as `import { ... } from 'atomic'`)


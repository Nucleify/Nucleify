# Coding Standards

Conventions for readable, consistent code across the Nucleify monorepo. When in doubt, match surrounding files in the package you are editing.

---

## Monorepo structure

```txt
nucleify/
├── web/               # @nucleify/web — Nuxt landing
├── admin/             # @nucleify/admin — Nuxt admin
├── docs/              # @nucleify/docs — Astro docs
├── compiler/          # @nucleify/compiler — portable UI compiler
├── shared_modules/    # six nuc_* feature modules
├── portable/nui/      # design tokens
├── overrides/         # per-package file overrides
├── supabase/          # merged DB config
└── .config/           # shared tooling
```

Do **not** use obsolete paths: root `modules/`, `nuxt/` as srcDir, `~/atomic`, or fictional modules like `nuc_users` / `nuc_auth`.

---

## Package commands

| Package | Dev command |
|---------|-------------|
| `web/` | `make web` or `pnpm dev` |
| `admin/` | `make admin` or `pnpm admin` |
| `docs/` | `make docs` or `pnpm docs` |
| `compiler/` | `make compiler` |

Install/bootstrap: `make run` (not legacy `make nuxt`).

---

## Shared module structure

```txt
shared_modules/nuc_example/
├── config.json
├── nuc_example.ts           # registerNucExample (Vue plugin)
├── index.ts                 # Vue barrel
├── index.react.ts           # React barrel (when needed)
├── _index.scss
├── supabase/api/handle.ts
├── constants/
├── types/
├── utils/
├── components/              # optional
└── vitests/
```

**Import rules:**

- Inside modules: relative imports only
- Never import from `web/`, `admin/`, or `docs/` inside modules
- Never `import from 'nucleify'` inside modules (circular)
- Apps import via `modules/…` alias or explicit `shared_modules/…` paths

---

## Web app structure

```txt
web/src/
├── pages/[lang]/            # thin i18n wrappers
├── pages/home/              # landing composition
├── plugins/modules.ts       # registerNuc*
├── composables/             # app-specific only
├── layouts/
├── assets/                  # SCSS entry
├── nucleify.ts              # re-exports
└── server/api/[...slug].ts  # gateway
```

- Vue SFCs: `<script setup lang="ts">`
- UI: `nui-*` from `nucleify-ui`
- Domain logic: `shared_modules/`, not `web/src/`

---

## File and folder naming

| Kind | Convention | Example |
|------|------------|---------|
| Vue SFC | PascalCase | `NucHomeHero.vue` |
| Composable | `use_` + snake_case | `use_dark_mode.ts` |
| React hook sibling | `.react.ts` | `use_dark_mode.react.ts` |
| Portable component | PascalCase + `.nuc.tsx` | `Counter.nuc.tsx` |
| Utils | snake_case | `api_request.ts` |
| Types | snake_case files | `interfaces.ts`, `variables.ts` |
| Tests | `*.test.ts` in `vitests/` | `darken_color.test.ts` |
| SCSS partials | `_name.scss` | `_mixins.scss` |

---

## TypeScript

- Strict typing — avoid `any` unless Nuxt config forces it (document with biome-ignore)
- Export types from `types/` — do not duplicate interfaces across files
- Use `.react.ts` type siblings when React props diverge from Vue

---

## Vue components

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SomeType } from 'modules/nuc_example/types/interfaces'

const props = defineProps<{ id: string }>()
const open = ref(false)
</script>

<template>
  <nui-button @click="open = !open">{{ props.id }}</nui-button>
</template>
```

- Prefer composition API with `<script setup>`
- Use `nui-*` for primitives; module components for domain UI

---

## Portable components

Author in `*.nuc.tsx` per `compiler/PORTABLE.md`:

- No stores, routers, or Supabase inside portable files
- Props + events only for external coupling
- Run `pnpm compiler:build` after changes; commit authoring + emit
- Import edits: `pnpm compiler -- import --from=vue|react`

---

## API handlers

- Entry: `handle.ts` exports `handle*Api`
- Register in `shared_modules/nuc_api/supabase/api/gateway_dispatch.ts`
- Return `apiNotHandled()` for non-matching prefixes
- Use `withGatewayUser` for authenticated routes
- Enable RLS on exposed tables

---

## SCSS

- Module styles: `shared_modules/nuc_*/styles/`
- Atomic hierarchy under `components/atoms|molecules|organisms/`
- App entry imports module `_index.scss` files
- Lint: `pnpm slint`

---

## Testing

- Module tests: `shared_modules/nuc_*/vitests/`
- Nuxt tests: `web/vitests/`
- Run `pnpm tests` before commit
- Meaningful behavior tests — avoid asserting implementation details

---

## Lint & format

```bash
pnpm check       # Biome (lint + format check)
pnpm write       # Biome auto-fix
pnpm typeslint   # tsc --noEmit -p web/tsconfig.json
pnpm slint       # Stylelint on SCSS
pnpm tests       # Vitest
```

Husky runs these on commit/push via `.config/bash/hook-checks.sh`.

---

## Git & commits

- Focused commits — one concern per change when possible
- Do not commit `.env`, emit demos (`vue/demo`, etc.), or `*.ir.json`
- Follow existing commit message style in the repo

---

## Cursor rules & agents

- Monorepo rules: `.cursor/rules/`
- Package rules: `{pkg}/.config/rules/`
- Sync: `pnpm sync-rules`
- Feature workflow agents: `web/.cursor/agents/`

---

## Related docs

- [Modules](/en/docs/core-concepts/modules)
- [Feature-Sliced Design](/en/docs/core-concepts/feature-sliced-design)
- [Vitest](/en/docs/tests/vitest)
- [Code of Conduct](/en/docs/about/code-of-conduct)

Root reference: `CODE_STANDARDS.md` in the repository (keep in sync with this page).

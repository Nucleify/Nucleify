# Quick Start

Run Nucleify, explore the repo, and make your first change in under ten minutes.

---

## 1. Bootstrap

```bash
git clone https://github.com/Nucleify/Nucleify.git
cd Nucleify
make run
```

Fill in `SUPABASE_*` values in the root `.env` if you plan to hit module API routes.

---

## 2. Start the landing app

```bash
make web
```

Visit [http://localhost:7777/en/home](http://localhost:7777/en/home).

Marketing pages share `web/src/pages/[lang]/[slug].vue`, which loads the published CMS layout into the marketing shell (`usePublicShellPage`). Section SFCs live under `web/src/sections/`.

```vue
<!-- web/src/pages/[lang]/[slug].vue -->
<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed } from 'vue'
import { usePublicShellPage } from '../../composables/use_public_shell_page'

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))
await usePublicShellPage(slug)
</script>
<template><div /></template>
```

---

## 3. Understand the request flow

```txt
Browser  →  Nuxt page (web/src/pages/)
         →  shared_modules/nuc_*/utils/   (composables, API client)
         →  /api/*                         (Nitro gateway)
         →  nuc_*/supabase/api/handle.ts   (module handlers)
         →  Supabase (PostgreSQL, Auth, Edge Functions)
```

Smoke-test the gateway:

```bash
curl http://localhost:8888/api
curl http://localhost:8888/api/test
```

---

## 4. Import a shared module

Modules resolve via the `modules` alias (`web/.config/nuxt/structure.ts` → `shared_modules/`):

```typescript
import { useDarkMode } from 'modules/nuc_dark_mode/utils/use_dark_mode'
import { apiRequest } from 'modules/nuc_api/utils/api_request'
```

Four modules register automatically at app startup in `web/src/plugins/modules.ts`:

- `nuc_globals`
- `nuc_colors`
- `nuc_dark_mode`
- `nuc_languages`

`nuc_api` and `nuc_stores` are imported where needed - no global plugin registration.

---

## 5. Try the compiler

Build portable emit from any `*.nuc.tsx` under discover roots (`web/`, `admin/`, `shared_modules/`, `portable/`):

```bash
pnpm compiler:build
pnpm compiler:check   # exits 1 if emit is dirty vs authoring
```

Convert the entire web product to Next, Solid, or Svelte:

```bash
make web TARGET=next    # → web-next/
make web TARGET=solid   # → web-solid/
make web TARGET=svelte  # → web-svelte/
```

This runs `pnpm compiler -- convert web --target=…`, builds, installs, and starts the generated shell. Portable Svelte emit demo: `make svelte`. External Nuxt-like apps: `--path` / `--git` + `--out` from the monorepo root (see [Compiler](/en/docs/core-concepts/compiler)).

---

## 6. Run other apps

```bash
make admin    # Nuxt admin at admin/src/pages/
make docs     # Astro docs at http://localhost:4321 (default Astro port)
```

Docs content is Markdown under `docs/content/{en,pl}/{category}/{slug}.md`.

---

## 7. Run checks

Before committing, the Husky pre-commit hook runs the same suite as CI (pre-push is a no-op):

```bash
pnpm btest          # bash suite
pnpm check          # Biome
pnpm typeslint      # TypeScript (web)
pnpm slint          # Stylelint (SCSS)
pnpm build          # Nuxt production build
pnpm tests          # Vitest (web + shared)
pnpm compiler:test  # Compiler unit tests
pnpm compiler:check # Emit fingerprints
```

---

## Common tasks

### Add an API route to an existing module

1. Add handler functions in `shared_modules/nuc_example/supabase/api/example_handlers.ts`
2. Export `handleExampleApi` from `handle.ts`
3. Register the handler in `shared_modules/nuc_api/supabase/api/gateway_dispatch.ts`
4. Call `/api/example/...` from the client via `nuc_api` request helpers

### Override a file without editing upstream

Mirror the path under `overrides/`:

```txt
web/src/composables/useAuth.ts
  → overrides/web/src/composables/useAuth.ts
```

See [Overriding](/en/docs/core-concepts/overriding).

### Author a portable component

Create `Foo.nuc.tsx` next to where it will be consumed. Run `pnpm compiler:build`. Commit the `.nuc.tsx` and generated siblings (`.vue`, React/Solid `.tsx`, Svelte `.svelte`, `.css`). Do not hand-edit emit as source of truth - use `pnpm compiler -- import --from=vue|react|solid|svelte` if you edited emit.

---

## Where to go next

| Topic | Doc |
|-------|-----|
| Directory map | [Monorepo Layout](/en/docs/core-concepts/monorepo) |
| Module anatomy | [Modules](/en/docs/core-concepts/modules) |
| Compiler cycles | [Compiler](/en/docs/core-concepts/compiler) |
| Nuxt config | [Web & Admin](/en/docs/configuration/web) |
| Supabase workflow | [Supabase](/en/docs/configuration/supabase) |
| Testing | [Vitest](/en/docs/tests/vitest) |

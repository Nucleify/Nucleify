# Quick Start

Run Nucleify, explore the repo, and make your first change in under ten minutes.

---

## 1. Bootstrap

```bash
git clone https://github.com/nucleify/nucleify.git
cd nucleify
make run
```

Fill in `SUPABASE_*` values in the root `.env` if you plan to hit module API routes.

---

## 2. Start the landing app

```bash
make web
```

Visit [http://localhost:3000/en/home](http://localhost:3000/en/home).

The landing page source lives in `web/src/pages/home/` — a set of section components composed by `web/src/pages/home/index.vue`. Routes are thin wrappers under `web/src/pages/[lang]/`:

```vue
<!-- web/src/pages/[lang]/home.vue -->
<script setup lang="ts">
import NucHomePage from '../home/index.vue'
</script>
<template><NucHomePage /></template>
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
curl http://localhost:3000/api
curl http://localhost:3000/api/test
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

`nuc_api` and `nuc_stores` are imported where needed — no global plugin registration.

---

## 5. Try the compiler

Build portable emit from any `*.nuc.tsx` under discover roots (`web/`, `admin/`, `shared_modules/`, `portable/`):

```bash
pnpm compiler:build
pnpm compiler:check   # exits 1 if emit is dirty vs authoring
```

Convert the entire web product to Next (Tryb B):

```bash
make web TARGET=next
```

This runs `pnpm compiler -- convert web --target=next`, builds, installs, and starts `web-next/`.

---

## 6. Run other apps

```bash
make admin    # Nuxt admin at admin/src/pages/
make docs     # Astro docs at http://localhost:4321 (default Astro port)
```

Docs content is Markdown under `docs/content/{en,pl}/{category}/{slug}.md`.

---

## 7. Run checks

Before committing, the Husky hooks run the same suite as CI:

```bash
pnpm check       # Biome
pnpm typeslint   # TypeScript (web)
pnpm slint       # Stylelint (SCSS)
pnpm tests       # Vitest (web + shared projects)
pnpm compiler:test  # Compiler unit tests
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

Create `Foo.nuc.tsx` next to where it will be consumed. Run `pnpm compiler:build`. Commit the `.nuc.tsx` and generated siblings. Do not hand-edit `.vue`/`.tsx` as source of truth — use `pnpm compiler -- import` if you edited emit.

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

# Quick Start

Run Nucleify, explore the repo, and make your first change in under ten minutes.

---

## 1. Bootstrap

```bash
git clone --recurse-submodules https://github.com/Nucleify/Nucleify.git
cd Nucleify
export PATH="$PWD/.config/bin:$PATH"   # make web --target= / -t=
make run
```

Fill in `SUPABASE_*` values in the root `.env` if you plan to hit module API routes.

---

## 2. Start the landing app

```bash
make web
```

Visit [http://localhost:7777/en/home](http://localhost:7777/en/home).

Marketing pages share `web/src/pages/[lang]/[slug].vue`, which loads the published CMS layout (`usePublicShellPage`). Section SFCs live under `web/src/sections/`.

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

## 5. Try convert and the compiler

**Your product (as-is):**

```bash
nuc emit convert web --target=next --path=/path/to/your-app --out=my-next --force
```

**This monorepo’s Nuxt `web/` → shells** (not a substitute for your `--path`):

```bash
make web --target=next    # → web-next/
make web -t=solid         # → web-solid/
make web --target=svelte  # → web-svelte/
make web --target=astro   # → web-astro/
nuc emit convert web --target=next   # same, Nucleify web/ only
```

Optional portable emit (`*.nuc.tsx` - not a migrate gate):

```bash
nuc emit build
nuc emit check
```

Full FAQ: [Migrate FAQ](/en/docs/getting-started/migrate-faq).

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

Create `Foo.nuc.tsx` next to where it will be consumed. Run `nuc emit build`. Commit the `.nuc.tsx` and generated siblings (`.vue`, React/Solid `.tsx`, Svelte `.svelte`, `.css`). Do not hand-edit emit as source of truth - use `nuc emit import --from=vue|react|solid|svelte` if you edited emit.

---

## Where to go next

| Topic | Doc |
|-------|-----|
| Migrate any existing app | [Migrate FAQ](/en/docs/getting-started/migrate-faq) |
| Directory map | [Monorepo Layout](/en/docs/core-concepts/monorepo) |
| Module anatomy | [Modules](/en/docs/core-concepts/modules) |
| Compiler cycles | [Compiler](/en/docs/core-concepts/compiler) |
| Nuxt config | [Web & Admin](/en/docs/configuration/web) |
| Supabase workflow | [Supabase](/en/docs/configuration/supabase) |
| Testing | [Vitest](/en/docs/tests/vitest) |

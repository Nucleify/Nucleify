# Modules

Nucleify ships six feature modules in `shared_modules/`. Each module is a self-contained domain package with frontend utilities, optional Supabase API handlers, migrations, types, and tests — consumed by `web/`, `admin/`, and generated Next shells.

There is no root-level `modules/` folder. Apps import via relative paths or the Nuxt alias `modules` → `shared_modules/`.

---

## The six modules

| Module | Domain | Key paths |
|--------|--------|-----------|
| `nuc_api` | API client, gateway dispatch, auth forms, entity requests, toasts | `supabase/api/gateway_dispatch.ts`, `utils/api_request.ts` |
| `nuc_colors` | Theme/color system, SCSS variables, color utilities | `styles/`, `supabase/api/handle.ts` |
| `nuc_dark_mode` | Dark mode preference (load, persist, apply) | `utils/use_dark_mode.ts`, `nuc_dark_mode.ts` |
| `nuc_globals` | Media queries, image helpers, global styles, shared types | `media/`, `styles/`, `nuc_globals.ts` |
| `nuc_languages` | i18n, locale messages, translations API | `plugins/nuc_translations.ts`, `supabase/api/handle.ts` |
| `nuc_stores` | Pinia/Zustand helpers, cookie/localStorage/session utils | `pinia/`, `zustand/`, `cookie/` |

Modules **not** in the monorepo: `nuc_users`, `nuc_auth` — auth flows live inside `nuc_api`.

---

## Module anatomy

Every `nuc_*` directory follows a consistent layout:

```txt
shared_modules/nuc_example/
├── config.json              # name, version, category, enabled
├── nuc_example.ts           # Vue plugin (registerNucExample)
├── index.ts                 # Vue barrel export
├── index.react.ts           # React barrel export (when needed)
├── _index.scss              # optional global module styles
├── README.md
├── constants/
├── types/
│   ├── interfaces.ts
│   ├── interfaces.react.ts  # when React types diverge
│   └── variables.ts
├── utils/                   # composables, hooks, pure functions
├── components/              # optional reusable UI
├── supabase/
│   ├── api/
│   │   ├── handle.ts        # gateway entry (handleExampleApi)
│   │   └── *_handlers.ts    # route tables
│   ├── migrations/
│   ├── factories/
│   └── seeders/
└── vitests/
```

---

## Registration in Nuxt

`web/src/plugins/modules.ts` registers four modules at app startup:

```typescript
import { registerNucColors } from '../../../shared_modules/nuc_colors/nuc_colors'
import { registerNucDarkMode } from '../../../shared_modules/nuc_dark_mode/nuc_dark_mode'
import { registerNucGlobals } from '../../../shared_modules/nuc_globals/nuc_globals'
import { registerNucLanguages } from '../../../shared_modules/nuc_languages/nuc_languages'

export default defineNuxtPlugin({
  name: 'modules-registration',
  enforce: 'pre',
  setup(nuxtApp) {
    registerNucGlobals(nuxtApp.vueApp)
    registerNucColors(nuxtApp.vueApp)
    registerNucDarkMode(nuxtApp.vueApp)
    registerNucLanguages(nuxtApp)
  },
})
```

`nuc_api` and `nuc_stores` are imported on demand — no global plugin.

Translations also load via a Nuxt plugin path in config:

```typescript
// web/.config/nuxt/structure.ts
plugins: [
  resolve(process.cwd(), '../shared_modules/nuc_languages/plugins/nuc_translations.ts'),
],
```

---

## Import rules

**Inside a module** — relative imports only. Never import from `web/`, `admin/`, or `docs/`.

**From an app** — use the alias or relative path:

```typescript
// via alias (Nuxt)
import { useDarkMode } from 'modules/nuc_dark_mode/utils/use_dark_mode'

// explicit relative (also valid)
import { apiRequest } from '../../../shared_modules/nuc_api/utils/api_request'
```

**Public surface** — export through `index.ts` and the root barrel `shared_modules/index.ts`. Do not import `from 'nucleify'` inside modules (circular dependency).

---

## API gateway integration

Module handlers export an async `handle*Api(ctx)` function. Register it in the gateway registry:

```typescript
// shared_modules/nuc_api/supabase/api/gateway_dispatch.ts
export const supabaseApiGatewayHandlers = [
  handleColorsApi,
  handleLanguagesApi,
] as const
```

Nitro entry point:

```txt
web/src/server/api/[...slug].ts
  → parseApiSlug()
  → dispatchSupabaseApiGateway(ctx)
  → first handler where result.handled === true
```

### Handler pattern

```typescript
import { apiMethodNotAllowed, apiNotHandled, withGatewayUser } from 'nuc_api'
import type { ApiContext, ApiHandlerResult } from 'nuc_server'

export async function handleExampleApi(ctx: ApiContext): Promise<ApiHandlerResult> {
  if (ctx.segments[0] !== 'example') return apiNotHandled()
  return withGatewayUser(ctx, async (gatewayCtx, userId) => {
    // route table dispatch …
    return apiMethodNotAllowed()
  })
}
```

Client code calls `/api/example/...` through `nuc_api` request helpers — not Supabase service keys in the browser.

---

## Supabase per module

Each module can own SQL artifacts:

| Directory | Purpose |
|-----------|---------|
| `supabase/migrations/` | Schema changes |
| `supabase/factories/` | Test/dev factory SQL |
| `supabase/seeders/` | Seed data |

Apply locally:

```bash
pnpm supabase:migrations:apply:local
pnpm supabase:seeders:apply:local
# or combined:
pnpm supabase:setup:local
```

Scripts merge all module SQL via `.config/bash/merge-module-supabase-sql.sh`.

---

## React variants

Modules that support Tryb B expose `.react.ts` siblings:

- `index.react.ts` — React barrel
- `utils/use_*.react.ts` — React hooks mirroring Vue composables
- `types/interfaces.react.ts` — React-specific types when needed

The compiler and product convert use these when emitting Next shells.

---

## Creating a new module

1. Copy the structure from an existing `nuc_*` module
2. Add `config.json` metadata
3. Implement `nuc_example.ts` with `registerNucExample`
4. Export public API from `index.ts`
5. Add to `shared_modules/index.ts` if needed globally
6. Register plugin in `web/src/plugins/modules.ts` if it needs app-wide setup
7. Add gateway handler to `gateway_dispatch.ts` if it exposes API routes
8. Add `vitests/` and run `pnpm test:shared`

See [Feature-Sliced Design](/en/docs/core-concepts/feature-sliced-design) for architectural rationale.

---

## Related docs

- [Feature-Sliced Design](/en/docs/core-concepts/feature-sliced-design)
- [Supabase](/en/docs/configuration/supabase)
- [Overriding](/en/docs/core-concepts/overriding) — patch module files without editing upstream

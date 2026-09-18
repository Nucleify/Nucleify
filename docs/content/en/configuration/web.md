# Web & Admin

`web/` and `admin/` are Nuxt 4 applications (Tryb A). Configuration is split across `web/.config/nuxt/` (and the equivalent in `admin/`) and composed by a thin `nuxt.config.ts` at each package root.

---

## Config composition

```txt
web/
├── nuxt.config.ts          # imports and spreads split config modules
└── .config/nuxt/
    ├── load-env.ts         # loads monorepo root .env before config eval
    ├── app.ts              # head, meta, base URL
    ├── structure.ts        # aliases, srcDir, plugins, imports
    ├── runtime.ts          # runtimeConfig (public + private keys)
    ├── modules.ts          # Nuxt modules (@nuxtjs/i18n, etc.)
    ├── locales.ts          # i18n locale list and config
    ├── nitro.ts            # server preset, handlers
    ├── vite.ts             # Vite plugins, SCSS, build options
    ├── route-rules.ts      # SWR, prerender, caching per route
    ├── performance.ts      # fonts, image optimization
    ├── dev.ts              # dev-only settings
    └── hooks.ts            # Nuxt lifecycle hooks
```

`admin/` follows the same pattern with its own `.config/nuxt/` directory.

---

## Source layout

Both apps use `srcDir: 'src'` (not a `nuxt/` folder):

```txt
web/src/
├── pages/
│   ├── [lang]/             # thin i18n route wrappers
│   └── home/               # landing sections
├── plugins/
│   ├── modules.ts          # registerNuc* for shared modules
│   └── nucleify-ui.client.ts
├── composables/            # auto-imported
├── layouts/
├── components/
│   ├── atom/               # ad-* prefixed components
│   ├── molecule/
│   └── organism/
├── assets/styles/          # SCSS entry (imports shared_modules styles)
├── nucleify.ts             # re-exports shared surface + app helpers
└── server/
    └── api/
        └── [...slug].ts    # Nitro catch-all → gateway_dispatch
```

Components under `web/src/components/` are auto-imported with the `ad-` prefix.

---

## Aliases

Defined in `web/.config/nuxt/structure.ts`:

| Alias | Resolves to |
|-------|-------------|
| `nucleify` | `~/nucleify` (app barrel) |
| `modules` | `../shared_modules` |
| `portable/nui` | `../portable/nui` |
| `nuc_client` | `~/nuc_client` |
| `nuc_server` | `~/server/nuc_server` |
| `#nuc-compiler/runtime` | `../compiler/runtime/index.ts` |

Import shared modules by package name (e.g. `import { apiRequest } from 'nuc_api'`) — the `modules` alias makes this work.

---

## Module registration

Shared modules register as Vue plugins in `web/src/plugins/modules.ts`:

```typescript
import { defineNuxtPlugin } from 'nuxt/app'
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

`registerNucLanguages` receives the full `nuxtApp` because it hooks into Nuxt i18n events.

---

## Runtime config

`web/.config/nuxt/runtime.ts` exposes environment variables to the app:

**Private** (server-only):

- `supabaseServiceRoleKey`
- `authEmailResendKey`
- `authEmailFrom`
- `contactFormRecipient`

**Public** (client + server):

- `appUrl`, `apiUrl`, `supabaseUrl`, `supabaseKey`, `supabaseEdgeBase`, `appEnv`

```typescript
const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl  // '/api'
```

See [Environment](/en/docs/configuration/environment) for the full variable reference.

---

## API gateway

All server API traffic flows through one Nitro catch-all:

```
web/src/server/api/[...slug].ts
  → dispatchSupabaseApiGateway()
  → shared_modules/nuc_*/supabase/api/handle.ts
```

Client code calls `/api/...` — never Supabase directly from the browser for privileged operations.

---

## i18n

Locales are configured in `web/.config/nuxt/locales.ts`. Route wrappers under `src/pages/[lang]/` delegate to feature pages. Default locale redirect sends `/` → `/en/home`.

Prerender locale prefixes are controlled by `PRERENDER_LOCALES` in `.env`.

---

## UI system

- **Lit web components** from `nucleify-ui` (`nui-button`, `nui-icon`, …)
- **Design tokens** in `portable/nui/`
- **Atomic Design** components with `ad-` prefix in `web/src/components/`
- Registered via `nucleify-ui.client.ts` plugin

---

## Tryb B — Next.js shells

Generated Next.js apps live at `web-next/` and `admin-next/`:

```bash
make web TARGET=next      # convert + start Next dev
make admin TARGET=next    # admin equivalent
```

Develop in Nuxt (`web/`, `admin/`), convert when you need a React deployment. See [Compiler](/en/docs/core-concepts/compiler).

---

## Overrides

Per-deployment customizations go in `overrides/web/` or `overrides/admin/`, mirroring the original file path. See [Overriding](/en/docs/core-concepts/overriding).

---

## Dev commands

| Command | Action |
|---------|--------|
| `make web` | Start Nuxt dev server (`web/`) |
| `make admin` | Start admin Nuxt dev |
| `pnpm --filter @nucleify/web dev` | Direct pnpm filter |
| `pnpm --filter @nucleify/admin dev` | Admin direct filter |

Default port: `3000`. Environment loaded from monorepo root `.env` via `load-env.ts`.

---

## Related docs

- [Environment](/en/docs/configuration/environment) — `.env` variables
- [Supabase](/en/docs/configuration/supabase) — backend and API handlers
- [Modules](/en/docs/core-concepts/modules) — shared module structure

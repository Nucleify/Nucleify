# Monorepo Layout

Nucleify is a pnpm workspace. Every package has a clear boundary, shared tooling lives in `.config/`, and product apps consume feature logic from `shared_modules/` — never the other way around.

---

## Top-level map

```txt
nucleify/
├── web/                    # @nucleify/web — Nuxt 4 landing (Tryb A canonical)
├── admin/                  # @nucleify/admin — Nuxt 4 admin panel
├── docs/                   # @nucleify/docs — Astro 5 documentation
├── compiler/               # @nucleify/compiler — IR portable UI compiler
├── shared_modules/         # @nucleify/shared-modules — six feature modules
├── portable/nui/           # design tokens, Lit nui-* registration
├── overrides/              # overrides/{web,admin,docs,shared_modules}/
├── supabase/               # DB config, migrations, edge functions
├── .config/                # Biome, Vitest, bash scripts, CI helpers
├── .cursor/                # Cursor agents and monorepo rules
├── Makefile                # make run, make web, make admin, …
└── package.json            # workspace root scripts
```

---

## Product apps

### `web/` — `@nucleify/web`

The canonical Nuxt 4 landing application (Tryb A).

```txt
web/
├── nuxt.config.ts          # composes split config from .config/nuxt/
├── .config/
│   ├── .env.example        # template copied to repo root .env by make run
│   └── nuxt/               # app, dev, i18n, nitro, runtime, structure, vite, …
└── src/
    ├── pages/
    │   ├── [lang]/         # thin route wrappers (i18n)
    │   └── home/           # landing sections
    ├── plugins/
    │   ├── modules.ts      # registerNuc* for shared modules
    │   └── nucleify-ui.client.ts
    ├── composables/
    ├── layouts/
    ├── assets/             # SCSS entry (imports shared_modules styles)
    ├── nucleify.ts         # re-exports shared surface + app helpers
    └── server/
        └── api/
            └── [...slug].ts  # Nitro catch-all → gateway_dispatch
```

Key facts:

- `srcDir` is `src` (not `nuxt/`)
- Alias `modules` → `../shared_modules`
- Alias `#nuc-compiler/runtime` → `../compiler/runtime/index.ts`

### `admin/` — `@nucleify/admin`

Same Nuxt conventions as `web/`, focused on dashboard pages under `admin/src/pages/`.

---

## `docs/` — `@nucleify/docs`

Astro 5 static documentation site.

```txt
docs/
├── content/
│   ├── en/{category}/{slug}.md
│   └── pl/{category}/{slug}.md
├── public/                 # favicon, logo
└── src/
    ├── pages/
    │   └── [lang]/docs/[category]/[slug].astro
    ├── layouts/DocsLayout.astro
    ├── components/         # DocsSidebar, DocsToc, LangSwitcher
    └── lib/                # doc paths, markdown renderer, nav
```

Categories are defined in `docs/src/lib/constants/docs.ts`. Routes follow `/en/docs/{category}/{slug}`.

---

## `compiler/` — `@nucleify/compiler`

IR-first portable UI compiler. Self-contained — does not import from `web/`, `admin/`, or `docs/`.

```txt
compiler/
├── src/
│   ├── parse/              # *.nuc.tsx → AST
│   ├── ir/                 # intermediate representation
│   ├── emit/               # IR → .vue / .tsx / .css
│   └── sync/               # import back from emit, convert product shells
├── runtime/                # #nuc-compiler/runtime (component, state, handler, …)
├── templates/              # scaffold sources for gitignored demos
├── tests/
├── fixtures/
└── PORTABLE.md             # authoring rules for *.nuc.tsx
```

Gitignored emit demos: `{vue,react,nuxt,next}/demo/` (via `make vue`, `make next`, etc.).

---

## `shared_modules/` — `@nucleify/shared-modules`

Six absorbed feature modules (not git submodules):

| Module | Path |
|--------|------|
| API client & gateway | `shared_modules/nuc_api/` |
| Colors & theme | `shared_modules/nuc_colors/` |
| Dark mode | `shared_modules/nuc_dark_mode/` |
| Globals & media | `shared_modules/nuc_globals/` |
| i18n & translations | `shared_modules/nuc_languages/` |
| Storage & state helpers | `shared_modules/nuc_stores/` |

Barrel export: `shared_modules/index.ts`. Each module is self-contained with optional `supabase/`, `utils/`, `types/`, and `vitests/`.

There is **no** root-level `modules/` directory and **no** `nuc_users` or `nuc_auth` packages.

---

## `portable/nui/`

Design tokens and Lit custom element registration for `nucleify-ui` (`nui-*` tags). Referenced by Nuxt via alias `portable/nui` in `web/.config/nuxt/structure.ts`.

---

## `overrides/`

Per-package override layers. Mirror any file path:

```txt
overrides/
├── web/src/…
├── admin/src/…
├── docs/src/…
└── shared_modules/nuc_*/…
```

Overrides replace the original file entirely — no merge. Nuxt-only; not part of compiler import. See [Overriding](/en/docs/core-concepts/overriding).

---

## `supabase/`

Monorepo-level Supabase project config. Module SQL lives inside each `shared_modules/nuc_*/supabase/` and is merged by `.config/bash/merge-module-supabase-sql.sh`.

---

## `.config/`

Shared monorepo tooling:

- Biome (`pnpm check`, `pnpm write`)
- Vitest root config (`vitest.config.ts`) — `web` and `shared` projects
- Compiler Vitest (`.config/vitest.compiler.config.ts`)
- Bash scripts: Supabase merge/apply, hook checks, submodule prepare
- Husky hooks delegate to `.config/bash/hook-checks.sh`

---

## Dependency direction

```txt
web / admin / docs
         ↓ imports
    shared_modules / portable / compiler/runtime
         ↓
    supabase (via API handlers)
```

**Rules:**

- Apps import from `shared_modules/`; modules never import from apps
- Compiler logic stays inside `compiler/src/`
- Overrides shadow app or module files at build time (Nuxt only)

---

## Makefile reference

| Command | Action |
|---------|--------|
| `make run` | `.env` + setup + compiler |
| `make setup` | install, husky, prepare, sync-rules, compiler |
| `make web` | Nuxt dev (`TARGET=nuxt` default) |
| `make web TARGET=next` | convert + Next dev |
| `make admin` / `make admin TARGET=next` | admin equivalents |
| `make docs` | Astro docs dev |
| `make compiler` | check + build |
| `make vue` / `make react` / `make nuxt` / `make next` | gitignored portable demos |

---

## Related docs

- [Modules](/en/docs/core-concepts/modules) — module internal structure
- [Compiler](/en/docs/core-concepts/compiler) — Tryb A vs Tryb B
- [Web & Admin](/en/docs/configuration/web) — Nuxt config details

# Feature-Sliced Design

Feature-Sliced Design (FSD) organizes code **by business domain** instead of by technical layer. In Nucleify, each `shared_modules/nuc_*` package is one slice — frontend utilities, API handlers, database migrations, types, and tests co-located in a single directory.

---

## Why feature slices?

Layer-first projects scatter one feature across many folders:

```txt
# ❌ Layer-first                         # ✅ Feature-sliced (Nucleify)

src/                                    shared_modules/
├── api/                                ├── nuc_api/
│   ├── colors.ts                       │   ├── supabase/api/gateway_dispatch.ts
│   └── languages.ts                    │   ├── utils/api_request.ts
├── types/                              │   └── vitests/
│   ├── colors.ts                       ├── nuc_colors/
│   └── languages.ts                    │   ├── supabase/api/handle.ts
├── styles/                             │   ├── styles/
│   └── colors.scss                     │   └── vitests/
└── tests/                              └── nuc_languages/
    └── colors.test.ts                      └── …
```

Problems with layers at monorepo scale:

- Adding a feature touches 5+ directories
- Removing a feature means hunting files across the tree
- Parallel work on different features causes merge conflicts
- Ownership is unclear

FSD fixes this by making **the module the unit of change**.

---

## How Nucleify applies FSD

### Shared modules = domain slices

The six modules map to cross-cutting product domains:

| Module | Slice |
|--------|-------|
| `nuc_api` | HTTP client, gateway, auth forms, entity state |
| `nuc_colors` | Theming, SCSS tokens, color API |
| `nuc_dark_mode` | Appearance preference |
| `nuc_globals` | Breakpoints, shared types, global SCSS |
| `nuc_languages` | Locales, translation fetch, i18n plugin |
| `nuc_stores` | Client persistence abstractions |

Each slice is imported by `web/` and `admin/` without duplication.

### Apps = composition layers

Product apps are thin composition shells:

```txt
web/src/
├── pages/[lang]/           # routing + i18n wrappers
├── pages/home/             # landing composition (sections)
├── composables/            # app-specific only
├── plugins/                # wire modules into Nuxt
└── server/api/             # single gateway entry
```

**Rule:** if logic belongs to a domain, it lives in `shared_modules/nuc_*`. If it belongs to one app shell (routing, layout, marketing copy structure), it stays in `web/` or `admin/`.

---

## Module internal layers

Within a module, folders follow a lightweight FSD-inspired layout:

| Folder | FSD analogue | Contents |
|--------|--------------|----------|
| `supabase/api/` | Backend / API | Gateway handlers, route tables |
| `utils/` | Shared lib | Composables, hooks, pure functions |
| `types/` | Shared types | Interfaces, type literals |
| `constants/` | Shared config | Static values, field defs |
| `components/` | UI (optional) | Reusable widgets for the domain |
| `styles/` | UI tokens | SCSS partials |
| `vitests/` | Tests | Unit tests co-located with domain |

There is no strict `entities/features/widgets` folder naming — Nucleify favors **flat domain modules** over deep FSD ceremony. The principle (co-location by feature) matters more than the folder labels.

---

## Cross-slice communication

Modules communicate through **defined public exports**, not deep imports into another module's internals:

```typescript
// ✅ Public barrel
import { apiRequest } from 'modules/nuc_api/utils/api_request'

// ❌ Reach into another module's private handler
import { internalHelper } from 'modules/nuc_colors/supabase/api/colors_helpers'
```

Gateway dispatch in `nuc_api` is the orchestration point for HTTP — individual modules register handlers, but routing between domains happens at the gateway, not via cross-imports in `utils/`.

---

## Portable UI vs domain logic

The compiler adds a second axis:

| Layer | Location | Framework coupling |
|-------|----------|-------------------|
| Portable UI | `*.nuc.tsx` | None — emits Vue + React |
| Domain logic | `shared_modules/nuc_*/utils/` | Vue composables + `.react.ts` hooks |
| App shell | `web/src/pages/` | Nuxt (Tryb A) or Next (Tryb B) |

Keep stores, routers, i18n containers, and API calls **out of** `*.nuc.tsx`. Portable components receive data via props and emit events — domain slices own the wiring in app or module utils.

---

## Comparison with Atomic Design

Nucleify uses **Atomic Design** inside SCSS (`atoms/`, `molecules/`, `organisms/` under `nuc_colors/styles/components/`) for visual hierarchy. FSD and Atomic Design solve different problems:

- **FSD** — where feature code lives in the repo
- **Atomic Design** — how UI components nest visually

They coexist: a `nuc_colors` organism partial is still part of the `nuc_colors` slice.

---

## Adding a feature the FSD way

1. **Identify the domain** — new slice or extend an existing `nuc_*`?
2. **Co-locate** — API handler, types, utils, migrations, tests in one module folder
3. **Export publicly** — `index.ts` / `index.react.ts`
4. **Wire the app** — plugin registration, gateway handler, page composition
5. **Avoid app-local copies** — if two apps need it, it belongs in `shared_modules/`

---

## Related docs

- [Modules](/en/docs/core-concepts/modules) — module reference
- [Monorepo Layout](/en/docs/core-concepts/monorepo) — app vs shared boundaries
- [Compiler](/en/docs/core-concepts/compiler) — portable UI layer

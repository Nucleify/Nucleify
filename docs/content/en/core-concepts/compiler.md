# Compiler

The `@nucleify/compiler` package is how Nucleify migrates UI across shells: an IR-first portable compiler that turns `*.nuc.tsx` into Vue SFCs, React, Solid, and Svelte components, and shared CSS — and can convert Nuxt product shells (`web/`, `admin/`) or an external Nuxt-like tree to Next.js, Solid, or Svelte.

**Coverage:** Vue · React · Nuxt · Next · Astro · Svelte · Solid. React/Next or Vue/Nuxt are beachheads, not the boundary.

---

## Two operating modes

| Mode | What it does | Example |
|------|--------------|---------|
| **Portable emit** | `*.nuc.tsx` → IR → `.vue` + React `.tsx` + Solid `.tsx` + Svelte `.svelte` + `.css` | `pnpm compiler:build` / `make solid` / `make svelte` |
| **Product convert** | Nuxt app (or external folder/git) → Next.js, Solid, or Svelte app | `pnpm compiler -- convert web --target=next` |

**Portable emit** is for presentational components. **Product convert** scaffolds `web-next/`, `admin-next/`, `web-solid/`, `admin-solid/`, `web-svelte/`, or `admin-svelte/` from the Vue source tree — same routes, shared modules, different framework shell. Converting the Astro `docs/` product is **not** implemented yet.

Do **not** re-export `*.nuc.tsx` from public barrels (`index.ts`, `modules.ts`, …) — authoring stays out of app entrypoints.

---

## IR version

Portable IR is versioned as `IR_VERSION` (currently **0.1.0**) in `compiler/src/ir/types.ts`.

- Schema, parsers, and `compiler/tests/fixtures/ir/*.json` must stay in sync.
- **Breaking** IR shape changes → bump the version and migrate fixtures/tests in the **same PR**.
- Policy: `compiler/PORTABLE.md` § IR versioning.

---

## Portable authoring (`*.nuc.tsx`)

Author framework-agnostic UI with `#nuc-compiler/runtime`:

```tsx
import { component, state, handler } from '#nuc-compiler/runtime'

export default component({
  name: 'Counter',
  props: { label: { type: 'string', default: 'Count' } },
  setup(props) {
    const count = state(0)
    const onInc = handler(() => count.set(count.value + 1))
    return () => (
      <button type="button" onClick={onInc}>
        {props.label}: {count.value}
      </button>
    )
  },
})
```

Running `pnpm compiler:build` emits siblings next to the source:

```txt
portable/components/
├── Counter.nuc.tsx     # source (committed)
├── Counter.vue         # generated Vue SFC
├── Counter.tsx         # generated React component
├── Counter.svelte      # generated Svelte 5 SFC (when siblings enabled)
└── Counter.css         # extracted styles
```

### Allowed in portable components

- Serializable props (`string`, `number`, `boolean`, `unknown`)
- HTML elements and `nui-*` Lit custom elements
- Local state via `state`, `derived`, `handler`
- Plain CSS string or `style={{ … }}` object binds
- Default slot / `children` only

### Forbidden

- Vue/React framework APIs (`defineComponent`, hooks as host coupling)
- Stores, routers, i18n, Supabase, Pinia/Zustand inside portable files
- Named slots, portals, dynamic components, async setup

Full rules: `compiler/PORTABLE.md`.

---

## CLI reference

```bash
pnpm compiler:build                              # emit all *.nuc.tsx
pnpm compiler:check                              # verify fingerprints (exit 1 if dirty)
pnpm compiler:test                               # golden-file test suite

pnpm compiler -- import --from=vue path/Foo.vue  # import emit edits back to source
pnpm compiler -- import --from=react path/Foo.tsx
pnpm compiler -- build --force                   # discard emit edits; regenerate

pnpm compiler -- convert web --target=next       # product convert → web-next/
pnpm compiler -- convert admin --target=next     # product convert → admin-next/
pnpm compiler -- convert web --target=solid      # product convert → web-solid/
pnpm compiler -- convert web --target=svelte     # product convert → web-svelte/
pnpm compiler -- convert web --target=next --path=/path/to/nuxt-app --out=my-next --force
pnpm compiler -- convert web --target=svelte --git=https://github.com/org/app.git --out=fork-svelte --force
pnpm compiler -- scaffold solid                  # throwaway demo → solid/demo/
pnpm compiler -- scaffold svelte                 # throwaway demo → svelte/demo/
pnpm compiler -- scaffold next                   # throwaway demo → next/demo/
pnpm compiler -- build --app=solid               # emit into solid/demo
pnpm compiler -- build --app=svelte              # emit into svelte/demo
```

Skip compiler during bootstrap / skip hooks when needed:

```bash
SKIP_COMPILER=1 make run
HUSKY=0 git commit -m "…"   # skip pre-commit suite
```

Pre-commit already runs `compiler:check` (and related compiler checks) via Husky.

---

## Cycle A — author first

1. Create or edit `Foo.nuc.tsx`
2. Run `pnpm compiler:build`
3. Commit source + generated siblings
4. CI runs `pnpm compiler:check` to ensure emit is up to date

## Cycle B — edit emit first

1. Tweak generated `Foo.vue` or `Foo.tsx` directly
2. Import changes back: `pnpm compiler -- import --from=vue path/Foo.vue`
3. Source of truth returns to `Foo.nuc.tsx`

If both `.vue` and `.tsx` are dirty, you must pass `--from=`. Use `pnpm compiler -- build --force` to discard emit edits.

---

## Package layout

```txt
compiler/
├── src/
│   ├── parse/              # *.nuc.tsx → AST
│   ├── ir/                 # intermediate representation (IR_VERSION)
│   ├── emit/               # IR → .vue / React .tsx / Solid .tsx / Svelte .svelte / .css
│   └── sync/               # import back, convert product shells
├── runtime/                # #nuc-compiler/runtime
├── templates/              # scaffold sources for gitignored demos
├── tests/                  # golden-file tests
├── fixtures/
└── PORTABLE.md             # authoring rules
```

Gitignored emit demos: `{vue,react,nuxt,next,solid,svelte}/demo/` (via `make vue`, `make next`, `make solid`, `make svelte`, etc.).

---

## Product shell conversion

```bash
make web TARGET=next
# equivalent:
pnpm compiler -- convert web --target=next
cd web-next && pnpm dev

make web TARGET=solid
pnpm compiler -- convert web --target=solid

make web TARGET=svelte
pnpm compiler -- convert web --target=svelte
```

Svelte product shells are Vite SPAs with Svelte 5 runes (not SvelteKit SSR yet). Portable Svelte emit uses `$state` / `$derived` / `$props` and DOM events like `onclick`.

### External folder or git URL

Use the same `web|admin` shell profile with an external Nuxt-like tree (`src/` required). Run from the **Nucleify monorepo root** so `modules` / `portable` aliases resolve:

```bash
pnpm compiler -- convert web --target=next --path=/path/to/nuxt-app --out=my-next --force
pnpm compiler -- convert admin --target=solid --git=https://github.com/org/app.git --out=fork-admin-solid --force
pnpm compiler -- convert web --target=svelte --path=/path/to/nuxt-app --out=my-svelte --force
```

Product shells install with `pnpm install --ignore-workspace` — template dependency versions stay pinned; they do not join the monorepo workspace graph.

The converter reads Vue SFCs under `src/`, maps pages and composables to React, Solid, or Svelte equivalents, and writes output with **no** source `.vue` files. Shared modules are consumed via framework barrels.

Treat `web-next/`, `admin-next/`, `web-solid/`, `admin-solid/`, `web-svelte/`, and `admin-svelte/` (and custom `--out` dirs) as **generated output**. Develop in `web/` or `admin/`, then convert.

---

## Runtime alias

Nuxt resolves the runtime through `web/.config/nuxt/structure.ts`:

```typescript
'#nuc-compiler/runtime': resolve(process.cwd(), '../compiler/runtime/index.ts')
```

Runtime helpers (`component`, `state`, `derived`, `handler`) are compile-time markers — they must not appear in emitted bundles.

---

## Testing

Compiler tests live in `compiler/tests/` with a dedicated Vitest config (`.config/vitest.compiler.config.ts`). Golden tests compare emit output against fixtures in `compiler/tests/fixtures/`. Guards include IR version sync and barrel scans (no `*.nuc.tsx` in public entrypoints).

```bash
pnpm compiler:test
pnpm compiler:check
```

Product smoke (manual): `make web`, `make vue` / `make solid` / `make svelte` for emit demos.

See [Vitest](/en/docs/tests/vitest) for the full testing setup.

---

## Related docs

- [Monorepo Layout](/en/docs/core-concepts/monorepo) — where compiler fits in the workspace
- [Quick Start](/en/docs/getting-started/quick-start) — build your first portable component
- [Web & Admin](/en/docs/configuration/web) — Nuxt config that wires the runtime alias

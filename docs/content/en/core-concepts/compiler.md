# Compiler

The `@nucleify/compiler` package is Nucleify's differentiator: an IR-first portable UI compiler that turns `*.nuc.tsx` sources into Vue SFCs, React and Solid components, and shared CSS — and can convert entire Nuxt product shells to Next.js or Solid.

---

## Two operating modes

| Mode | What it does | Example |
|------|--------------|---------|
| **Portable emit** | `*.nuc.tsx` → IR → `.vue` + React `.tsx` + Solid `.tsx` + `.css` | `pnpm compiler:build` / `make solid` |
| **Product convert** | Nuxt app → Next.js or Solid app | `pnpm compiler -- convert web --target=next` |

**Portable emit** is for presentational components. **Product convert** scaffolds `web-next/`, `admin-next/`, `web-solid/`, or `admin-solid/` from the Vue source tree — same routes, shared modules, different framework shell.

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
pnpm compiler -- scaffold solid                  # throwaway demo → solid/demo/
pnpm compiler -- scaffold next                   # throwaway demo → next/demo/
pnpm compiler -- build --app=solid               # emit into solid/demo
```

Skip compiler during bootstrap:

```bash
SKIP_COMPILER=1 make run
```

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
│   ├── ir/                 # intermediate representation
│   ├── emit/               # IR → .vue / React .tsx / Solid .tsx / .css
│   └── sync/               # import back, convert product shells
├── runtime/                # #nuc-compiler/runtime
├── templates/              # scaffold sources for gitignored demos
├── tests/                  # golden-file tests
├── fixtures/
└── PORTABLE.md             # authoring rules
```

Gitignored emit demos: `{vue,react,nuxt,next,solid}/demo/` (via `make vue`, `make next`, `make solid`, etc.).

---

## Product shell conversion

```bash
make web TARGET=next
# equivalent:
pnpm compiler -- convert web --target=next
cd web-next && pnpm dev

make web TARGET=solid
pnpm compiler -- convert web --target=solid
```

The converter reads the Nuxt source tree in `web/`, maps pages and composables to React (or Solid) equivalents, and writes output to `web-next/` or `web-solid/`. Shared modules are consumed via framework barrels.

Treat `web-next/`, `admin-next/`, `web-solid/`, and `admin-solid/` as **generated output**. Develop in `web/` or `admin/`, then convert.

---

## Runtime alias

Nuxt resolves the runtime through `web/.config/nuxt/structure.ts`:

```typescript
'#nuc-compiler/runtime': resolve(process.cwd(), '../compiler/runtime/index.ts')
```

Runtime helpers (`component`, `state`, `derived`, `handler`) are compile-time markers — they must not appear in emitted bundles.

---

## Testing

Compiler tests live in `compiler/tests/` with a dedicated Vitest config (`.config/vitest.compiler.config.ts`). Golden tests compare emit output against fixtures in `compiler/tests/fixtures/`.

```bash
pnpm compiler:test
pnpm compiler:check
```

See [Vitest](/en/docs/tests/vitest) for the full testing setup.

---

## Related docs

- [Monorepo Layout](/en/docs/core-concepts/monorepo) — where compiler fits in the workspace
- [Quick Start](/en/docs/getting-started/quick-start) — build your first portable component
- [Web & Admin](/en/docs/configuration/web) — Nuxt config that wires the runtime alias

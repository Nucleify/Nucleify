# Compiler

The `@nucleify/compiler` package is Nucleify's differentiator: an IR-first portable UI compiler that turns `*.nuc.tsx` sources into Vue SFCs, React components, and shared CSS — and can convert entire Nuxt product shells to Next.js (Tryb B).

---

## Two operating modes

| Mode | What it does | Example |
|------|--------------|---------|
| **Tryb A** (component emit) | `*.nuc.tsx` → IR → `.vue` + `.tsx` + `.css` | `pnpm compiler:build` |
| **Tryb B** (product shell) | Nuxt app → Next.js app | `pnpm compiler -- convert web --target=next` |

**Tryb A** is for portable presentational components. **Tryb B** scaffolds `web-next/` or `admin-next/` from the Vue source tree — same routes, shared modules, different framework shell.

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

pnpm compiler -- convert web --target=next       # Tryb B → web-next/
pnpm compiler -- convert admin --target=next     # Tryb B → admin-next/
pnpm compiler -- scaffold next                   # throwaway demo → next/demo/
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
│   ├── emit/               # IR → .vue / .tsx / .css
│   └── sync/               # import back, convert product shells
├── runtime/                # #nuc-compiler/runtime
├── templates/              # scaffold sources for gitignored demos
├── tests/                  # golden-file tests
├── fixtures/
└── PORTABLE.md             # authoring rules
```

Gitignored emit demos: `{vue,react,nuxt,next}/demo/` (via `make vue`, `make next`, etc.).

---

## Product shell conversion (Tryb B)

```bash
make web TARGET=next
# equivalent:
pnpm compiler -- convert web --target=next
cd web-next && pnpm dev
```

The converter reads the Nuxt source tree in `web/`, maps pages and composables to React equivalents, and writes output to `web-next/`. Shared modules are consumed via `index.react.ts` barrels.

Treat `web-next/` and `admin-next/` as **generated output**. Develop in `web/` or `admin/`, then convert.

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

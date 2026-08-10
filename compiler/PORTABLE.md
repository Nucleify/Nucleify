# Portable UI authoring

Rules for `*.nuc.tsx` sources consumed by `@nucleify/compiler` (IR v0.1).

## Allowed

- Serialisable props (`string` | `number` | `boolean` | `unknown`)
- Default slot / `children` only (no named slots in v1)
- HTML elements and `nui-*` custom elements as plain tags
- Control flow: `if` / `for` (mapped to IR `if` / `for`)
- Events from the fixed map (e.g. `onClick` → IR `click`)
- Text nodes and expression interpolations
- `class` **or** `className` in JSX → IR always `class` → Vue `class` / React `className`
- Plain CSS string → sibling `Foo.css` (shared by Vue and React emit)
- `style={{ … }}` object bind (string/number/boolean/null literals + ident/member/binary/call)
- Boolean attributes (`disabled`, `disabled={false}`, `disabled={props.x}`)
- Static and bound `aria-*` attributes (`aria-label`, `aria-hidden="true"`, …)
- `nui-*` tags from **nucleify-ui** (Lit custom elements; demo templates register them)
- Local UI state via `setup` + `state` / `derived` / `handler` (Phase 7)

## State (Phase 7)

```tsx
import { component, state, derived, handler } from '#nuc-compiler/runtime'

export default component({
  name: 'Counter',
  props: { label: { type: 'string', default: 'Count' } },
  setup(props) {
    const count = state(0)
    const double = derived(() => count.value * 2)
    const onInc = handler(() => {
      count.set(count.value + 1)
    })
    return () => (
      <button type="button" onClick={onInc}>
        {props.label + ': ' + double.value}
      </button>
    )
  },
})
```

- Emit: Vue `ref` / `computed`; React `useState` / `useMemo` (deps = all state names)
- v0 `render` + top-level `handlers` still works; **do not** mix with `setup`
- Runtime markers are compile-time only — they must not appear in emitted bundles

## Forbidden

- Framework idioms (Vue `defineComponent`, React hooks as host coupling, etc.)
- Stores / routers / i18n containers inside portable components
- Dynamic components, portals, Suspense, context providers
- Scoped CSS / CSS modules as authoring source of truth
- Named slots
- Bare `window` / `document` without an explicit guard (prefer no DOM globals)
- Routing, SSR/RSC, middleware, API, Supabase, Pinia/Zustand
- Async `setup` / `handler` / `derived`, effects, deep watch, custom memo deps API

## File roles

| File | Role |
|------|------|
| `Foo.nuc.tsx` | Authoring (commit) |
| `Foo.vue` / `Foo.tsx` | Generated emit (editable → `import`) |
| `Foo.css` | Generated styles sibling |
| `Foo.ir.json` | Optional dump (`--dump-ir`), gitignored |

## Runtime import

```tsx
import { component, state, derived, handler } from '#nuc-compiler/runtime'
```

Helpers exposed here must stay host-agnostic. See `compiler/README.md` for CLI cycles A/B.

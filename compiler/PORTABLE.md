# Portable UI authoring

Rules for `*.nuc.tsx` sources consumed by `@nucleify/compiler` (IR `IR_VERSION` — currently **0.1.0**).

## IR versioning

- Canonical constant: `IR_VERSION` in `compiler/src/ir/types.ts` (schema + parsers + fixtures must match).
- **Breaking** IR shape changes → bump `IR_VERSION`, migrate `compiler/tests/fixtures/ir/*.json`, update tests in the **same PR**.
- Additive optional fields may stay on the same version until a breaking cut.
- Enforcement: `compiler/tests/ir-version.test.ts` + `pnpm compiler:test`.

## Allowed

- Serialisable props (`string` | `number` | `boolean` | `unknown`)
- Default slot / `children` only (no named slots in v1)
- HTML elements and `nui-*` custom elements as plain tags
- Control flow: `if` / `for` (mapped to IR `if` / `for`)
- Events from the fixed map (e.g. `onClick` → IR `click`)
- Text nodes and expression interpolations
- `class` **or** `className` in JSX → IR always `class` → Vue `class` / React `className` / Solid `class` / Svelte `class`
- Plain CSS string → sibling `Foo.css` (shared by Vue, React, Solid, and Svelte emit)
- `style={{ … }}` object bind (string/number/boolean/null literals + ident/member/binary/call)
- Boolean attributes (`disabled`, `disabled={false}`, `disabled={props.x}`)
- Static and bound `aria-*` attributes (`aria-label`, `aria-hidden="true"`, …)
- `nui-*` tags from **nucleify-ui** (Lit custom elements; demo templates register them)
- Local UI state via `setup` + `state` / `derived` / `handler`

## Local UI state

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

- Emit: Vue `ref` / `computed`; React `useState` / `useMemo`; Solid `createSignal` / `createMemo` (deps = all state names for React); Svelte 5 `$state` / `$derived` / `$props` (handlers as plain functions; assignments for `state.set`)
- v0 `render` + top-level `handlers` still works; **do not** mix with `setup`
- Runtime markers are compile-time only — they must not appear in emitted bundles

## Svelte emit limits

Portable target: **Svelte 5** `.svelte` SFC (Vite demo under `svelte/demo` — Kit-friendly markup/runes, **not** a SvelteKit app shell).

| IR | Svelte emit |
|----|-------------|
| props | `let { … }: Props = $props()` |
| `state` / `derived` | `$state` / `$derived` |
| `if` / `for` | `{#if}` / `{#each}` (keyed when index present) |
| events | DOM `onclick` / `oninput` / … (not React `onClick`, not Svelte 4 `on:click`) |
| default slot | `{@render children?.()}` + `Snippet` prop |
| CSS | sibling `import './Foo.css'` in `<script>` (not scoped `<style>`) |
| empty non-void tags | `<div></div>` / `<nui-icon …></nui-icon>` (Svelte rejects ambiguous self-closing) |
| a11y (static / CE hosts) | `role` + `tabindex` + Enter/Space `onkeydown` for click; `role="group"` for hover; `<!-- svelte-ignore … -->` for labels wrapping `nui-*` |

**Not in portable v1:** named slots/snippets, SvelteKit `+page` / SSR. Product shells (`web-svelte` / `admin-svelte`) use a separate SPA convert path — see `.ai/docs/compiler-status.md`. Solid emit lives in `solid/demo` (not a product sibling next to `*.nuc.tsx`); use `import --from=solid` on that `.tsx` (headers / `solid-js` distinguish it from React).

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
| `Foo.vue` / `Foo.tsx` / `Foo.svelte` | Generated emit (editable → `import`) |
| Solid demo emit | `solid/demo/src/components/Foo.tsx` (`import --from=solid`; no product sibling) |
| Svelte demo emit | `svelte/demo/src/lib/components/Foo.svelte` (+ sibling `.svelte` next to `*.nuc.tsx`) |
| `Foo.css` | Generated styles sibling |
| `Foo.ir.json` | Optional dump (`--dump-ir`), gitignored |

### Product apps (`web/`, `admin/`)

Authoring under these trees also emits **siblings next to the source** (committed), in addition to gitignored demo apps (`vue/`, `react/`, `nuxt/`, `next/`, `solid/`, `svelte/`). Do not put `*.nuc.tsx` in the home landing section (`web/src/pages/home/sections/compiler_demo/`) — that folder is Vue-only.

## Runtime import

```tsx
import { component, state, derived, handler } from '#nuc-compiler/runtime'
```

Helpers exposed here must stay host-agnostic. See `compiler/README.md` for CLI cycles.

## Import policy

- `@generated` emit may be edited; then run `pnpm compiler -- import --from=vue|react|solid|svelte PATH`
- Winner = `--from` (required when more than one of `.vue` / React `.tsx` / `.svelte` are dirty)
- Infer `--from` when exactly one emit is dirty; Solid `.tsx` is detected via headers / `solid-js` (not `'use client'`); CSS-only dirty defaults to the path’s frame (or vue)
- `build --force` overwrites dirty emit from authoring (emit edits lost)
- `import --force` re-imports even when hashes are clean
- `overrides/` is Nuxt-only and is **not** part of `import`
- Round-trip may change formatting of `*.nuc.tsx` — OK


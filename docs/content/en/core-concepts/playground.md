# Playground

The Nucleify Playground is a **browser sandbox for optional portable components** - not the product-migration path. Migrating an existing app does **not** require `*.nuc.tsx`; use [product convert](/en/docs/core-concepts/cli#convert) (`nuc emit convert`) on your framework source as-is.

Here you edit portable source on the left and watch live emit for modern frameworks on the right - no local install required.

Live surface: [play.nucleify.io](https://play.nucleify.io).

---

## Why use it

Playground answers: *does optional portable emit look like something I would ship?*

It does **not** replace convert. Bring an existing Nuxt/Vue/React app and convert it without rewriting into Nucleify authoring format.

- Open [play.nucleify.io](https://play.nucleify.io)
- Edit portable TypeScript only if you want shared presentational UI (`props`, `state`, `derived`, `handler`, styles)
- See idiomatic output for React, Vue, Svelte, Astro, Solid (and related Nuxt / Next hosts where shown)
- For a real app migration: [CLI convert](/en/docs/core-concepts/cli) · [Compiler](/en/docs/core-concepts/compiler)

Compile requests from the playground hit the same cloud compile surface the CLI uses (`compileApiUrl` → `https://cli.nucleify.io`).

---

## What you will see

| Pane | Purpose |
|------|---------|
| **Source** | Optional portable component authoring (`#nuc-compiler/runtime`) |
| **Emit** | Framework-native preview / code for the selected target |
| **Examples** | Starter components (for example a counter with state + derived values) |

A minimal portable counter looks like:

```tsx
import { component, derived, handler, state } from '#nuc-compiler/runtime'

export default component({
  name: 'Counter',
  props: { label: { type: 'string', optional: true, default: 'Count' } },
  setup(props) {
    const count = state(0)
    const double = derived(() => count.value * 2)
    const onInc = handler(() => count.set(count.value + 1))
    const onReset = handler(() => count.set(0))
    return () => (
      <div class="counter">
        <button type="button" onClick={onInc}>
          {props.label}: {count.value}
        </button>
        <span class="meta">×2 = {double.value}</span>
        <button type="button" onClick={onReset}>
          Reset
        </button>
      </div>
    )
  },
})
```

Use the playground to validate portable authoring rules before you wire optional emit into CI. To migrate a whole product, stay on convert - not this sandbox.

---

## Next steps

1. Migrate an existing app: `nuc emit convert web --target=next` · [CLI](/en/docs/core-concepts/cli)
2. Optionally experiment with portable UI at [play.nucleify.io](https://play.nucleify.io)
3. Install the CLI from [cli.nucleify.io](https://cli.nucleify.io)
4. Read [Compiler](/en/docs/core-concepts/compiler) for convert vs portable emit

---

## Related

- Playground: [play.nucleify.io](https://play.nucleify.io)
- CLI: [cli.nucleify.io](https://cli.nucleify.io) · [CLI](/en/docs/core-concepts/cli)
- Compiler deep dive: [Compiler](/en/docs/core-concepts/compiler)

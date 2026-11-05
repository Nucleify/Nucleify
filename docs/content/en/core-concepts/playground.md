# Playground

The Nucleify Playground is a browser sandbox for portable components. Edit source on the left, watch live emit for modern shells on the right - no local install required.

Live product surface: [play.nucleify.io](https://play.nucleify.io).

---

## Why use it

Playground answers the first question every engineer asks: *does the emitted code look like something I would ship?*

- Open [play.nucleify.io](https://play.nucleify.io)
- Edit portable TypeScript (props, `state`, `derived`, `handler`, styles)
- See idiomatic output for React, Vue, Svelte, Astro, Solid (and related Nuxt / Next shells where shown)
- Copy snippets or continue in the [CLI](/en/docs/core-concepts/cli) for a real project

Compile requests from the playground hit the same cloud compile surface the CLI uses (`compileApiUrl` → `https://cli.nucleify.io`).

---

## What you will see

| Pane | Purpose |
|------|---------|
| **Source** | Portable component authoring (`#nuc-compiler/runtime`) |
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

Use the playground to validate authoring rules before you wire emit into CI or a local app.

---

## Next steps

1. Experiment at [play.nucleify.io](https://play.nucleify.io)
2. Install the CLI from [cli.nucleify.io](https://cli.nucleify.io) · [CLI docs](/en/docs/core-concepts/cli)
3. Read [Compiler](/en/docs/core-concepts/compiler) for IR, portable emit, and product convert inside the monorepo

---

## Related

- Playground: [play.nucleify.io](https://play.nucleify.io)
- CLI: [cli.nucleify.io](https://cli.nucleify.io) · [CLI](/en/docs/core-concepts/cli)
- Compiler deep dive: [Compiler](/en/docs/core-concepts/compiler)

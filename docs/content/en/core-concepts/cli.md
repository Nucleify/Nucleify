# CLI

The Nucleify CLI (`@nucleify/cli`) is the local entry point for universal components: author once in portable TypeScript, emit idiomatic UI for **React · Vue · Svelte · Astro · Solid** without locking your product to a single framework runtime.

Live product surface: [cli.nucleify.io](https://cli.nucleify.io).

---

## Install

Pick one:

```bash
npm install -g @nucleify/cli
```

```bash
pnpm add -g @nucleify/cli
```

```bash
npx @nucleify/cli@latest
```

Global install is best for day-to-day use. `npx` is enough for a one-off run without installing globally.

---

## What it does

| Capability | Role |
|------------|------|
| **Emit** | Turn portable component source into framework-native files you can commit |
| **Project scan** | Walk your tree, gather portable modules, prepare compile requests |
| **Cloud compile** | Talk to the Nucleify compile service used by the CLI and the browser playground |
| **Write back** | Drop emitted files into your app folders so the shell stays readable |

The CLI is the **local** half of the pipeline. Compile intelligence that maps IR to idiomatic React hooks, Vue composables, Svelte runes, and friends runs as a service - the same path [play.nucleify.io](https://play.nucleify.io) uses in the browser.

---

## Typical flow

1. Install the CLI (or run via `npx`)
2. Author portable UI (or open a sample in the [Playground](/en/docs/core-concepts/playground))
3. Emit to your target shell(s)
4. Keep iterating in the framework you ship today - switch shells later without rewriting domain logic

For monorepo-level emit and product convert inside this repository, see [Compiler](/en/docs/core-concepts/compiler) (`pnpm compiler -- …`). The published `@nucleify/cli` package is the installable tool for projects that consume Nucleify as a dependency.

---

## Related

- Product page: [cli.nucleify.io](https://cli.nucleify.io)
- Try emit in the browser: [play.nucleify.io](https://play.nucleify.io) · [Playground docs](/en/docs/core-concepts/playground)
- IR / portable authoring in the monorepo: [Compiler](/en/docs/core-concepts/compiler)

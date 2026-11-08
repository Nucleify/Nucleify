# CLI

The Nucleify CLI (`nuc`) migrates and emits framework UI. **Product convert comes first:** point `nuc emit convert` at an existing app (Nuxt/Vue tree, or `--path` / `--git`) and land on Next / Solid / Svelte / Astro - **no `*.nuc.tsx` rewrite**. Optional portable emit (`nuc emit build`) is only for shared presentational UI you choose to author that way.

Covers **Vue · React · Nuxt · Next · Astro · Svelte · Solid** without locking the product to one runtime.

- Product package: [`@nucleify/cli`](https://cli.nucleify.io) · [cli.nucleify.io](https://cli.nucleify.io)
- Binary: **`nuc`** - every command is `nuc emit …`

This reference describes the **current** command surface (`emit`). Mapping IR to idiomatic React hooks, Vue composables, Svelte runes, and friends runs as a compile service - the same path [play.nucleify.io](https://play.nucleify.io) uses for the optional portable sandbox.

---

## Install

```bash
npm install -g @nucleify/cli
```

```bash
pnpm add -g @nucleify/cli
```

```bash
npx @nucleify/cli@latest
```

After install:

```bash
nuc emit --help
nuc emit <command> [options] [args]
nuc emit convert web --target=next
nuc emit build --target=vue
nuc emit ./Button.vue --target=next
```

`npx @nucleify/cli@latest …` is enough for a one-off run without a global install. Inside the Nucleify monorepo, use the same `nuc emit …` form from the repo root (with the CLI installed).

---

## What it does

| Capability | Role |
|------------|------|
| **Emit (`build`)** | `*.nuc.tsx` → IR → framework-native files you can commit |
| **Project scan** | Walk the tree, collect portable modules, prepare emit |
| **Product convert (`convert`)** | Existing app → Next / Solid / Svelte / Astro **without** rewriting into `*.nuc.tsx` |
| **Import** | Pull dirty-emit edits back into `*.nuc.tsx` |
| **Check** | Verify emit fingerprints (dirty emit → exit ≠ 0) |
| **Scaffold** | Recreate temporary `{framework}/demo` from templates |

The CLI is the **local** half of the pipeline. IR details, portable rules, and the authoring cycle: [Compiler](/en/docs/core-concepts/compiler).

---

## Command tree

```txt
emit
├── version
├── scaffold <app> [--cwd]
├── convert <product> --target=<…> [--force] [--path] [--git] [--out] [--cwd]
├── build [--target] [--app] [--force] [--dump-ir] [--cwd]
├── check [--cwd]
├── watch
└── import [path] [--from] [--force]
```

Built-in help:

```bash
nuc emit --help
nuc emit <command> --help
```

---

## `version`

Prints package identity (`name` + `phase`).

```bash
nuc emit version
```

No arguments or options.

---

## `scaffold`

Recreates a gitignored demo at `{framework}/demo` from `compiler/templates/{framework}/demo`.

```bash
nuc emit scaffold <app> [--cwd=<root>]
```

| Argument / option | Required | Values / default | Description |
|-------------------|----------|------------------|-------------|
| `<app>` | yes | `vue` \| `react` \| `nuxt` \| `next` \| `solid` \| `svelte` \| `astro` | Demo framework |
| `--cwd` | no | `process.cwd()` | Workspace root |

Examples:

```bash
nuc emit scaffold solid
nuc emit scaffold svelte
nuc emit scaffold next
nuc emit scaffold vue --cwd=/path/to/nucleify
```

---

## `convert`

Generates a product app under `{product}-{target}/` (or `--out`) from the `web` / `admin` profile - **without** rewriting the app into `*.nuc.tsx`.

```bash
nuc emit convert <product> --target=<framework> \
  [--force] [--path=<dir>] [--git=<url>] [--out=<name>] [--cwd=<root>]
```

| Argument / option | Required | Values / default | Description |
|-------------------|----------|------------------|-------------|
| `<product>` | yes | `web` \| `admin` \| `docs` | Product profile (`docs` convert not available yet) |
| `--target` | yes | `next` \| `solid` \| `svelte` \| `astro` | Destination framework |
| `--force` | no | `false` | Wipe and recreate output |
| `--path` | no | — | External Nuxt-like app folder (must contain `src/`) |
| `--git` | no | — | Git URL for a shallow clone as convert source |
| `--out` | no | `{product}-{target}` | Output directory name under `--cwd` |
| `--cwd` | no | `process.cwd()` | Workspace root |

Constraints:

- Pass **only one** of `--path` or `--git` (not both).
- Run from the **Nucleify monorepo root** so `modules` / `portable` aliases resolve.
- Treat generated output as emit - edit the product source, then convert again.

Examples:

```bash
nuc emit convert web --target=next
nuc emit convert admin --target=next
nuc emit convert web --target=solid
nuc emit convert web --target=svelte
nuc emit convert web --target=astro
nuc emit convert admin --target=svelte

nuc emit convert web --target=next --path=/path/to/nuxt-app --out=my-next --force
nuc emit convert web --target=svelte --git=https://github.com/org/app.git --out=fork-svelte --force
```

Equivalent Make shortcuts in this repo: `make web --target=next` / `make admin -t=next` (needs `PATH="$PWD/.config/bin:$PATH"`) or classic `make web TARGET=next` - see [Compiler](/en/docs/core-concepts/compiler).

---

## `build`

Parse every `*.nuc.tsx` in the workspace → IR → emit into demos / target apps.

```bash
nuc emit build \
  [--target=all|vue|react|solid|svelte|astro] \
  [--app=vue|react|nuxt|next|solid|svelte|astro] \
  [--force] [--dump-ir] [--cwd=<root>]
```

| Option | Required | Values / default | Description |
|--------|----------|------------------|-------------|
| `--target` | no | `all` | Emit family: `vue` \| `react` \| `solid` \| `svelte` \| `astro` \| `all` |
| `--app` | no | all matching | Only this demo: `vue` \| `react` \| `nuxt` \| `next` \| `solid` \| `svelte` \| `astro` |
| `--force` | no | `false` | Overwrite dirty emit (without `--force`, dirty files are skipped, exit ≠ 0) |
| `--dump-ir` | no | `false` | Write `*.ir.json` next to portable source |
| `--cwd` | no | `process.cwd()` | Workspace root |

Behavior:

- No `*.nuc.tsx` → `build: no *.nuc.tsx found` (success).
- Dirty emit without `--force` → `skipped dirty … (use import or --force)` and non-zero exit.
- On success: `build: ok (N file(s), target=…)`.

Examples:

```bash
nuc emit build
nuc emit build --force
nuc emit build --target=vue
nuc emit build --target=react
nuc emit build --app=solid
nuc emit build --app=svelte --force
nuc emit build --dump-ir --target=astro
```

File-style emit (when supported by your CLI version):

```bash
nuc emit ./Button.vue --target=next
```

---

## `check`

Validate IR / emit fingerprints. Dirty emit fails the command.

```bash
nuc emit check [--cwd=<root>]
```

| Option | Required | Default | Description |
|--------|----------|---------|-------------|
| `--cwd` | no | `process.cwd()` | Workspace root |

Output:

| Signal | Meaning |
|--------|---------|
| `dirty <path>` (stderr) + exit ≠ 0 | Emit drifted from source |
| `orphan emit <path>` (warn) | Emit without a paired source - warning |
| `check: ok` | Everything in sync |

```bash
nuc emit check
```

---

## `watch`

Reserved for watching `*.nuc.tsx` and rebuilding.

```bash
nuc emit watch
```

**Status:** not implemented yet - the command exits with an error (`watch: not implemented yet`).

---

## `import`

Pull dirty-emit edits back into the matching `*.nuc.tsx`.

```bash
nuc emit import [--from=<framework>] [--force] <path>
```

| Argument / option | Required | Values | Description |
|-------------------|----------|--------|-------------|
| `<path>` | yes | path to `.vue` / `.tsx` / `.svelte` / `.astro` / sibling `.css` | Emit file to import |
| `--from` | conditional | `vue` \| `react` \| `solid` \| `svelte` \| `astro` | Emit framework - **required** when more than one sibling is out of sync |
| `--force` | no | `false` | Force import despite conflicts / dirty state |

Examples:

```bash
nuc emit import --from=vue path/Foo.vue
nuc emit import --from=react path/Foo.tsx
nuc emit import --from=solid path/Foo.tsx
nuc emit import --from=svelte path/Foo.svelte
nuc emit import --from=astro path/Foo.astro
```

After import, `*.nuc.tsx` is source of truth again. To **discard** manual emit edits instead of importing: `nuc emit build --force`.

---

## Typical flows

### Portable emit

1. Author or edit `Foo.nuc.tsx` (rules: [Compiler](/en/docs/core-concepts/compiler), `compiler/PORTABLE.md`)
2. `nuc emit build`
3. Commit source + generated siblings
4. CI / locally: `nuc emit check`

### Emit first, then import

1. Polish generated `Foo.vue` / `Foo.tsx` / `Foo.svelte` / …
2. `nuc emit import --from=vue|react|solid|svelte|astro path/Foo.…`
3. Source returns to `Foo.nuc.tsx`

### Product convert (framework migration)

1. From the monorepo root: `nuc emit convert web --target=next` (or `--path` / `--git` for an external app)
2. Enter the generated directory (`web-next/`, …) and start that host’s dev server
3. Keep shipping in today’s framework - switch later without rewriting domain logic

Browser playground (no local install): [Playground](/en/docs/core-concepts/playground) · [play.nucleify.io](https://play.nucleify.io).

---

## Exit codes and diagnostics

| Situation | Typical result |
|-----------|----------------|
| Unknown `<app>` / `<product>` / `--target` | stderr message, exit ≠ 0 |
| `convert` with both `--path` and `--git` | `convert: pass only one of --path or --git` |
| `import` without a path | `import: path required …` |
| Dirty emit on `build` without `--force` | `skipped dirty …`, exit ≠ 0 |
| Dirty emit on `check` | `check: N dirty emit file(s)`, exit ≠ 0 |
| `watch` | always exit ≠ 0 (not implemented) |

Skip emit during bootstrap / hooks when needed locally:

```bash
SKIP_COMPILER=1 make run
HUSKY=0 git commit -m "…"
```

---

## Related

- Product page: [cli.nucleify.io](https://cli.nucleify.io)
- Emit in the browser: [play.nucleify.io](https://play.nucleify.io) · [Playground](/en/docs/core-concepts/playground)
- IR, portable authoring, `*.nuc.tsx` rules, package layout: [Compiler](/en/docs/core-concepts/compiler)

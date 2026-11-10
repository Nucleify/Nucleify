# Compiler

Framework migration is a **core capability** of Nucleify - not a bolt-on. **Yes - migrate any existing Next, Nuxt, Vue, React, or other supported app as-is.** The `@nucleify/compiler` package owns that path: **product convert** moves whole apps (`web/`, `admin/`, or an external tree via `--path` / `--git`) to another host **without** rewriting into `*.nuc.tsx`, **without** a prior `shared_modules` refactor, and **without** an IR-first rewrite of the app. Optional **portable emit** turns `*.nuc.tsx` into Vue SFCs, React, Solid, Svelte, and Astro output (plus shared CSS), and **import** brings emit edits back into source.

That scope goes beyond a component-only transpile: the app’s routes and product surface move with the host. The framework becomes a build target.

**Coverage:** Vue · React · Nuxt · Next · Astro · Svelte · Solid. React/Next or Vue/Nuxt are starting points, not the limit - including Next → Nuxt and Nuxt → Next.

**Migration gates: none.** Bring the existing framework project and run convert. No `*.nuc.tsx` rewrite. No `shared_modules` split first. No Nucleify token rewrite. Portable authoring is optional for new shared presentational UI only.

Day-to-day entry points: **`nuc emit …`** ([CLI](/en/docs/core-concepts/cli)) and Make (`export PATH="$PWD/.config/bin:$PATH"` for `--target=` / `-t=`). Inside this monorepo, `pnpm compiler -- …` remains the package-local equivalent.

---

## Two operating modes

| Mode | What it does | Example |
|------|--------------|---------|
| **Product convert** | Existing app as-is (Nuxt product or external Next / Nuxt / Vue / React / … via folder/git) → another host - **no `*.nuc.tsx` / `shared_modules` / token rewrite** | `--path` / `--git` + `--out` (your product) · `convert web --target=next` (this monorepo → `web-next/`) |
| **Portable emit** | `*.nuc.tsx` → IR → `.vue` + React `.tsx` + Solid `.tsx` + Svelte `.svelte` + `.astro` + `.css` (optional shared UI) | `nuc emit build` / `make solid` / `make svelte` / `make astro` |

**Product convert** scaffolds `web-next/`, `admin-next/`, `web-solid/`, `admin-solid/`, `web-svelte/`, `admin-svelte/`, `web-astro/`, or `admin-astro/` from the source tree as-is - same product surface, different framework host. **Portable emit** is for presentational components with a round-trip import path (`import --from=…`) - not a prerequisite before convert. Converting the Astro `docs/` product is **not** implemented yet.

Do **not** re-export `*.nuc.tsx` from public barrels (`index.ts`, `modules.ts`, …) - portable authoring stays out of app entrypoints.

---

## IR version

Portable IR is versioned as `IR_VERSION` (currently **0.1.0**) in `compiler/src/ir/types.ts`.

- Schema, parsers, and `compiler/tests/fixtures/ir/*.json` must stay in sync.
- **Breaking** IR shape changes → bump the version and migrate fixtures/tests in the **same PR**.
- Policy: `compiler/PORTABLE.md` § IR versioning.

---

## Portable authoring (`*.nuc.tsx`) - optional

Optional path for framework-agnostic **presentational** UI - not required to migrate an existing app. Author with `#nuc-compiler/runtime`:

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

Published binary ([CLI docs](/en/docs/core-concepts/cli)):

```bash
nuc emit build                                   # emit all *.nuc.tsx
nuc emit check                                   # verify fingerprints (exit ≠ 0 if dirty)
nuc emit import --from=vue path/Foo.vue          # import emit edits back to source
nuc emit convert web --target=next               # product convert → web-next/
nuc emit convert admin --target=next
nuc emit convert web --target=solid
nuc emit convert web --target=svelte
nuc emit convert web --target=astro
nuc emit convert web --target=next --path=/path/to/your-app --out=my-next --force
nuc emit convert web --target=svelte --git=https://github.com/org/app.git --out=fork-svelte --force
nuc emit scaffold solid                          # temporary demo → solid/demo/
nuc emit build --app=solid
```

Monorepo package equivalents (`pnpm compiler …` / `pnpm compiler:build` / `pnpm compiler:check` / `pnpm compiler:test`) call the same `@nucleify/compiler` entry points.

Skip compiler during bootstrap / skip hooks when needed:

```bash
SKIP_COMPILER=1 make run
HUSKY=0 git commit -m "…"   # skip pre-commit suite
```

Pre-commit already runs `compiler:check` (and related compiler checks) via Husky.

---

## Authoring-first cycle

1. Create or edit `Foo.nuc.tsx`
2. Run `pnpm compiler:build`
3. Commit source + generated siblings
4. CI runs `pnpm compiler:check` to ensure emit is up to date

## Emit-first cycle

1. Tweak generated `Foo.vue`, `Foo.tsx`, or `Foo.svelte` directly
2. Import changes back: `pnpm compiler -- import --from=vue|react|solid|svelte path/Foo.…`
3. Source of truth returns to `Foo.nuc.tsx`

If more than one emit sibling is dirty, you must pass `--from=`. Use `pnpm compiler -- build --force` to discard emit edits.

---

## Package layout

```txt
compiler/
├── src/
│   ├── parse/              # *.nuc.tsx → AST
│   ├── ir/                 # intermediate representation (IR_VERSION)
│   ├── emit/               # IR → .vue / React .tsx / Solid .tsx / Svelte .svelte / .css
│   └── sync/               # import back, convert product hosts
├── runtime/                # #nuc-compiler/runtime
├── templates/              # scaffold sources for gitignored demos
├── tests/                  # golden-file tests
├── fixtures/
└── PORTABLE.md             # authoring rules
```

Gitignored emit demos: `{vue,react,nuxt,next,solid,svelte}/demo/` (via `make vue`, `make next`, `make solid`, `make svelte`, etc.).

---

## Product convert

**Yes - migrate an existing app as-is** to another framework. Convert is the primary migration path. You do **not** rewrite into `*.nuc.tsx`, split domain into `shared_modules`, or adopt Nucleify tokens first. Portable authoring is optional afterward for new shared UI.

```bash
export PATH="$PWD/.config/bin:$PATH"

make web --target=next
# equivalent:
nuc emit convert web --target=next
# monorepo package CLI:
pnpm compiler -- convert web --target=next
cd web-next && pnpm dev

make web -t=solid
nuc emit convert web --target=solid

make web --target=svelte
nuc emit convert web --target=svelte

make web --target=astro
nuc emit convert web --target=astro
```

Svelte product apps are Vite SPAs with Svelte 5 runes (not SvelteKit SSR yet). Portable Svelte emit uses `$state` / `$derived` / `$props` and DOM events like `onclick`. Astro product convert hosts the same React islands under Astro pages (`client:load`).

Converted hosts load **Instrument Sans** and **JetBrains Mono** with `<link>` tags in the document head (`portable/nui/fonts.ts`). Do not load those families via CSS `@import` inside a bundled stylesheet - bundlers concatenate CSS and mid-file `@import` is ignored, so typography falls back to system mono.

### External folder or git URL

Point the same `web|admin` convert profile at an **existing framework app** (`src/` required) - Next, Nuxt, Vue, React, or another supported tree **as-is**, not a Nucleify rewrite. Run from the **Nucleify monorepo root** so `modules` / `portable` aliases resolve:

```bash
nuc emit convert web --target=next --path=/path/to/your-app --out=my-next --force
nuc emit convert admin --target=solid --git=https://github.com/org/app.git --out=fork-admin-solid --force
nuc emit convert web --target=svelte --path=/path/to/your-app --out=my-svelte --force
```

Converted apps install with `pnpm install --ignore-workspace` - template dependency versions stay pinned; they do not join the monorepo workspace graph.

The converter maps the source tree to the target host and writes idiomatic output. You do **not** hand-author `*.nuc.tsx` for the convert pass, and you do **not** need a prior `shared_modules` refactor.

Treat `web-next/`, `admin-next/`, `web-solid/`, `admin-solid/`, `web-svelte/`, `admin-svelte/`, `web-astro/`, and `admin-astro/` (and custom `--out` dirs) as **generated output**. Edit the source product tree, then reconvert - do not hand-patch the emit tree.

---

## Runtime alias

Nuxt resolves the runtime through `web/.config/nuxt/structure.ts`:

```typescript
'#nuc-compiler/runtime': resolve(process.cwd(), '../compiler/runtime/index.ts')
```

Runtime helpers (`component`, `state`, `derived`, `handler`) are compile-time markers - they must not appear in emitted bundles.

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

## FAQ — migrate your existing app

### Can I migrate any existing Next.js app as-is?

**Yes.** Product convert takes the existing framework project **as-is** (`--path` / `--git`). Migration gates: **none** for `*.nuc.tsx`, prior `shared_modules` refactor, Nucleify tokens, or an IR-first rewrite of the app. Includes Next → Nuxt and Nuxt → Next.

### Is portable IR / `*.nuc.tsx` required to migrate?

**No.** Portable emit is an optional path for shared presentational UI. Product convert is the migration path for whole apps.

### Are `web-next/` / `web-astro/` my customer app?

**Only if you converted Nucleify’s own `web/`.** External apps use `--out` (for example `my-next/`). Do not treat monorepo shell names as the only migrate story.

### What if convert smoke-build needs follow-up?

Follow-up polish is ordinary engineering. It is **not** a hard “you cannot migrate” gate and does not invent prerequisites like Framer/Radix bans or a forced `shared_modules` rewrite first.

---

## Related docs

- [CLI](/en/docs/core-concepts/cli) - installable `@nucleify/cli` · [cli.nucleify.io](https://cli.nucleify.io)
- [Playground](/en/docs/core-concepts/playground) - browser sandbox · [play.nucleify.io](https://play.nucleify.io)
- [Monorepo Layout](/en/docs/core-concepts/monorepo) - where compiler fits in the workspace
- [Quick Start](/en/docs/getting-started/quick-start) - build your first portable component
- [Web & Admin](/en/docs/configuration/web) - Nuxt config that wires the runtime alias
- Introduction FAQ: [Introduction](/en/docs/getting-started/introduction#faq--migrate-your-existing-app)

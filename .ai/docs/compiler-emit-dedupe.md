# Compiler emit dedupe

Portable emit entrypoints stay thin; shared logic lives beside them (same shape as parse → `*-ir` / `jsx-hooks`).

| Entry | Implementation |
|-------|----------------|
| `emit/react.ts` | `tree/react` + `emitJsxFnComponent` |
| `emit/solid.ts` | `tree/solid` + `emitJsxFnComponent` |
| `emit/svelte.ts` | `tree/svelte` + runes script; product via `emitSvelteProduct` |
| `emit/vue.ts` | `tree/vue` + `<script setup>` |
| `emit/astro.ts` | `tree/jsx` markup + frontmatter; handlers use `rewriteSvelteStmt` |

Shared:
- `emit/tree/` — `jsx` (shared shell / attrs), `react` / `solid` / `svelte` / `vue` markup
- `class-attr.ts` — `mergeClassAttr` + `emitClassBindingAttr`
- `product-helpers.ts` — `mergeProductPropsType` / `rewriteVueEmitCalls` for React + Svelte product convert
- `rewrite-state.ts` — React / Solid / Svelte / Vue state rewrites

Re-exports live only in barrels (`emit/index.ts`, `parse/index.ts`, package `src/index.ts`) via `export * from '…'`. Implementation files export their own symbols; they do not re-export siblings.

Verify:

```bash
pnpm --filter @nucleify/compiler test
```

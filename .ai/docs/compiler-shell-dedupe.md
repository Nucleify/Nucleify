# Compiler shell / emit dedupe

Product convert and portable emit share more of the CMS / host surface:

- **`writeVueReactivityShim(kind)`** (`convert/vue-reactivity.ts`) — single React / Solid / Svelte shim writer; `writeAdminWebHost` always owns shim + `@web` re-export (no stub ordering).
- **`writeViteSpaShell`** — Solid / Svelte pipeline (stubs → shim → locales → app/main → fonts → vite).
- **CMS public shell** — `writeWebPublicShellCore` + `templates/public-shell-shared` (variant / SEO / registry list helpers) + `web-host-sections` (Next/Solid/Astro `@web` section barrels).
- **Emit** — portable `emitReact` vs product `emitReactProduct`; thin `emit/{react,solid,svelte,vue,astro}.ts` + `*-tree` / `emitJsxFnComponent`; barrels only via `export * from` in `*/index.ts` (see `compiler-emit-dedupe.md`); `rewriteExprTree` / `rewriteStatefulExpr` for React↔Solid state rewrites.
- **Admin convert** — fewer modules: `paths` owns barrel + auto-imports; auth write lives with its source string; no re-export shim file.
- **Parse** — `parseJsxEmitToIr('react'|'solid')` shared by React/Solid emit parsers.

See also `sync-module-layout.md`.

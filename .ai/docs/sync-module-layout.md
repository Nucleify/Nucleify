# Compiler `sync/` layout

Product emit / convert / import live under `compiler/src/sync/` with domain folders. **Public imports go through `compiler/src/sync/index.ts` only** (also re-exported from `compiler/src/index.ts` for the package API).

## Folders

| Path | Role |
|------|------|
| `utils/` | Shared FS (`writeText`, `walkFiles`, `copyDirFiltered`), `rewriteSourceTree`, `MonorepoRoot` singleton |
| `core/` | paths, fingerprint, discover, check, biome-format |
| `emit/` | `targets` + `finalize-emit` + `write-files` + `write-outputs`, scaffold |
| `import/` | `detect` (dirty frame / CSS) + `runImport` (`PARSE_EMIT`) |
| `transform/` | Vue SFC / script / React↔Solid / hooks / Astro; `script-react/`, `react-solid/`, `vue-astro/` (`emit-class` + frontmatter rules + stubs), `hooks-svelte/`; shared `scan-call.ts` |
| `shell/` | Next/Solid writers + `write-public-shell` core; shared fragments (`public-shell-shared`, `web-host-sections`); framework template files (`next-public-shell-{lib,layout,app}`, `solid-public-shell-{lib,layout}`); CMS lists, SCSS, rewrite/purge |
| `convert/` | `product.ts` → `steps/*` + `framework.ts`; `vue-reactivity`; `admin/` (`host` facade, `paths` barrel+auto-imports, auth/routes/shims); `vue/`; `shells/` (`writeViteSpaShell`, vite-shared, app sources, `astro-sources-*`) |

## Patterns

- **KISS** — short orchestrators; emit string bodies live in template modules.
- **DRY** — `FRAMEWORK_META` + `caps` / `byFramework`; convert tables via `convertPair`; emit frames via `FRAME_WRITERS`; script-react splits `ctx` / `calls` / `lifecycle` / `decls` / `finalize`; CMS registry once; shared CMS SEO/registry/variant fragments; one reactivity shim writer per runtime; `rewriteExprTree` for React/Solid state rewrites; portable `emitReact` vs product `emitReactProduct`.
- **Singleton** — `MonorepoRoot.get().resolve(cwd)` caches workspace root for biome format.

## Verify

```bash
pnpm --filter @nucleify/compiler test
pnpm -s check && pnpm -s typeslint && pnpm -s slint && pnpm -s tests
```

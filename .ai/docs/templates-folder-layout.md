# Templates folder layout

Marketing shell templates under `web/src/templates/` use one folder per template, matching sections:

| Folder | Files |
|--------|--------|
| `shear/` | `index.vue`, `_index.scss` |
| `rail/` | `index.vue`, `_index.scss` |
| `holo_cube/` | `index.vue`, `_index.scss` |
| `module_board/` | `index.vue`, `_index.scss` |
| `shell_boot/` | `index.ts` (boot options only) |

Vue styles use `@import 'index'`. Barrel: `web/src/index.ts` → `./templates/<name>/index.vue`. Converted shells import `@/templates/<name>/index` (islands: `index.island`).

## Verify

```sh
pnpm -s check && pnpm -s typeslint && pnpm -s slint && pnpm -s tests
```

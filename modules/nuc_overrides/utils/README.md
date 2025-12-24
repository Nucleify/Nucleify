# Utils

### `scanOverrides()`
Scans `overrides/` directory, returns `OverrideMappingInterface[]`.

### `overridePlugin()`
Vite plugin that intercepts file loading and returns override content.

### `createOverrideAliases()`
Creates Vite resolve aliases for override files.

### `handleAppResolve(app)`
Handles override of `app.vue` root component.

### `handlePagesExtend(pages)`
Modifies Nuxt pages to use override versions.

### `handleNitroConfig(config)`
Excludes original files from Nitro build.

## Type

```typescript
interface OverrideMappingInterface {
  originalPath: string
  overridePath: string
  relativePath: string
}
```

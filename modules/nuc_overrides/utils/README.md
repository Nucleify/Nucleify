# Utils Functions

This directory contains utility functions for the `nuc_overrides` module. Each function handles a specific aspect of the file override system.

## Functions

### `scan_overrides.ts`

#### `scanOverrides()`

Scans the `overrides/` directory and discovers all override files, creating mappings between original and override paths.

**Returns:** `OverrideMappingInterface[]` - Array of mappings containing original path, override path, and relative path.

**How it works:**
- Checks if `overrides/` directory exists
- Scans `overrides/nuxt/` for Nuxt file overrides
- Scans `overrides/modules/` for module file overrides
- Uses `scanDirectory()` to recursively find all files

**Example:**
```typescript
const mappings = scanOverrides()
// Returns: [
//   {
//     originalPath: '/project/nuxt/composables/useAuth.ts',
//     overridePath: '/project/overrides/nuxt/composables/useAuth.ts',
//     relativePath: 'composables/useAuth.ts'
//   }
// ]
```

---

### `scan_directory.ts`

#### `scanDirectory(dir, baseDir, mappings)`

Recursively scans a directory and creates override mappings for all files found.

**Parameters:**
- `dir: string` - Directory path to scan
- `baseDir: 'nuxt' | 'modules'` - Base directory type (either 'nuxt' or 'modules')
- `mappings: OverrideMappingInterface[]` - Array to push mappings into (mutated)

**Returns:** `void` - Mutates the `mappings` array parameter.

**How it works:**
- Reads directory entries
- Recursively processes subdirectories
- For each file, calculates relative path and creates mapping
- Pushes mapping to the provided array

---

### `create_override_aliases.ts`

#### `createOverrideAliases()`

Creates Vite resolve aliases for all override files to redirect imports to override versions.

**Returns:** `Record<string, string>` - Object mapping import paths to override file paths.

**How it works:**
- Scans all overrides using `scanOverrides()`
- Creates aliases for:
  - Absolute paths: `originalPath -> overridePath`
  - Nuxt paths: `~/path` and `nuxt/path -> overridePath`
  - Module paths: `modules/path -> overridePath`
- Normalizes path separators (Windows backslashes to forward slashes)

**Example:**
```typescript
const aliases = createOverrideAliases()
// Returns: {
//   '/project/nuxt/composables/useAuth.ts': '/project/overrides/nuxt/composables/useAuth.ts',
//   '~/composables/useAuth.ts': '/project/overrides/nuxt/composables/useAuth.ts',
//   'nuxt/composables/useAuth.ts': '/project/overrides/nuxt/composables/useAuth.ts',
//   'modules/nuc_auth/LoginButton.vue': '/project/overrides/modules/nuc_auth/LoginButton.vue'
// }
```

---

### `get_excluded_paths.ts`

#### `getExcludedPaths()`

Returns an array of all original file paths that have overrides, which should be excluded from the build.

**Returns:** `string[]` - Array of absolute paths to original files that have overrides.

**How it works:**
- Scans all overrides using `scanOverrides()`
- Maps to extract only `originalPath` values
- Used by Nitro to exclude original files from the build

**Example:**
```typescript
const excluded = getExcludedPaths()
// Returns: [
//   '/project/nuxt/composables/useAuth.ts',
//   '/project/modules/nuc_auth/LoginButton.vue'
// ]
```

---

### `create_type_script_paths.ts`

#### `createTypeScriptPaths()`

Creates TypeScript path mappings for override files (for TypeScript language server support).

**Returns:** `Record<string, string[]>` - Object mapping TypeScript import paths to override file paths.

**How it works:**
- Scans all overrides using `scanOverrides()`
- Removes file extensions from paths
- Creates path mappings for:
  - Nuxt paths: `~/path` and `nuxt/path -> overrides/nuxt/path`
  - Module paths: `modules/path -> overrides/modules/path`
- Normalizes path separators

**Note:** This function is currently not used in the module but available for future TypeScript configuration.

---

### `handle_app_resolve.ts`

#### `handleAppResolve(app)`

Handles the override of `nuxt/app.vue` by modifying the Nuxt app's root component path.

**Parameters:**
- `app: any` - Nuxt app object from `app:resolve` hook

**Returns:** `void` - Mutates the `app` object.

**How it works:**
- Scans all overrides using `scanOverrides()`
- Checks if there's an override for `nuxt/app.vue`
- If found, sets `app.rootComponent` to the override path
- Normalizes paths for cross-platform compatibility

**Used in:** `app:resolve` Nuxt hook

---

### `handle_imports_dirs.ts`

#### `handleImportsDirs(dirs)`

Processes import directories to handle overrides (currently returns directories as-is).

**Parameters:**
- `dirs: string[]` - Array of import directory paths

**Returns:** `string[]` - Array of import directory paths (currently unchanged).

**How it works:**
- Scans all overrides using `scanOverrides()`
- Maps each directory, checking if any overrides exist within it
- Currently returns directories unchanged (placeholder for future functionality)

**Used in:** `imports:dirs` Nuxt hook

---

### `handle_nitro_config.ts`

#### `handleNitroConfig(config)`

Modifies Nitro configuration to exclude original files that have overrides from the build.

**Parameters:**
- `config: any` - Nitro configuration object

**Returns:** `void` - Mutates the `config` object.

**How it works:**
- Gets all excluded paths using `getExcludedPaths()`
- Adds paths to `config.ignore` array
- Converts absolute paths to relative paths (removes `process.cwd()` prefix)
- Ensures `config.ignore` array exists before adding paths

**Used in:** `nitro:config` Nuxt hook

**Example:**
```typescript
// Before: config.ignore = []
// After: config.ignore = [
//   'nuxt/composables/useAuth.ts',
//   'modules/nuc_auth/LoginButton.vue'
// ]
```

---

### `handle_pages_extend.ts`

#### `handlePagesExtend(pages)`

Modifies Nuxt pages to use override versions when available.

**Parameters:**
- `pages: any[]` - Array of Nuxt page objects

**Returns:** `void` - Mutates the `pages` array.

**How it works:**
- Scans all overrides using `scanOverrides()`
- Filters overrides that are within `nuxt/pages/` directory
- Creates a Map for quick lookup of page overrides
- For each page, checks if an override exists and updates `page.file` path
- Normalizes paths for cross-platform compatibility

**Used in:** `pages:extend` Nuxt hook

**Example:**
```typescript
// Before: page.file = '/project/nuxt/pages/index.vue'
// After: page.file = '/project/overrides/nuxt/pages/index.vue'
```

---

### `override_plugin.ts`

#### `overridePlugin()`

Creates a Vite plugin that intercepts module resolution and redirects imports to override files.

**Returns:** `Plugin` - Vite plugin object.

**How it works:**
- **`configResolved()`**: Scans overrides when Vite config is resolved
- **`resolveId(id, importer)`**: Intercepts module resolution:
  - Handles special case for `app.vue` files
  - Resolves various import formats:
    - `~/path` - Nuxt alias imports
    - `modules/path` - Module imports
    - `./path` or `../path` - Relative imports (uses importer context)
    - Absolute paths - Direct file paths
  - Normalizes resolved paths and checks against override mappings
  - Returns override path if match found, otherwise `null` (lets Vite handle normally)
- **`buildStart()`**: Placeholder for future build-time exclusions

**Used in:** `vite:extendConfig` Nuxt hook

**Example:**
```typescript
// When code imports: import { useAuth } from '~/composables/useAuth'
// Plugin intercepts and resolves to: '/project/overrides/nuxt/composables/useAuth.ts'
```

---

## Type Definitions

### `OverrideMappingInterface`

Defined in `scan_overrides.ts`:

```typescript
interface OverrideMappingInterface {
  originalPath: string    // Absolute path to original file
  overridePath: string    // Absolute path to override file
  relativePath: string    // Relative path from base directory
}
```

---

## Function Dependencies

```
scanOverrides()
  └── scanDirectory()

createOverrideAliases()
  └── scanOverrides()

getExcludedPaths()
  └── scanOverrides()

createTypeScriptPaths()
  └── scanOverrides()

handleAppResolve()
  └── scanOverrides()

handleImportsDirs()
  └── scanOverrides()

handleNitroConfig()
  └── getExcludedPaths()
      └── scanOverrides()

handlePagesExtend()
  └── scanOverrides()

overridePlugin()
  └── scanOverrides()
```

---

## Notes

- All functions use path normalization (`normalize()`) for cross-platform compatibility
- Functions that mutate parameters (like `scanDirectory`, `handleNitroConfig`) do so intentionally
- The `scanOverrides()` function is the core function used by most other utilities
- Path separators are normalized (backslashes to forward slashes) for consistency
- The module handles both `nuxt/` and `modules/` directory overrides


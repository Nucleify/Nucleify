# Overrides

This folder contains files that override original files from `nuxt/` and `modules/`.

## How it works

1. **Folder structure**: Create a file with the same directory structure as the original file:
   - `overrides/nuxt/` - overrides files from `nuxt/`
   - `overrides/modules/` - overrides files from `modules/`

2. **Example**:
   - Original file: `nuxt/composables/useAuth.ts`
   - Override: `overrides/nuxt/composables/useAuth.ts`
   
   Or:
   - Original file: `modules/nuc_auth/atomic/LoginButton.vue`
   - Override: `overrides/modules/nuc_auth/atomic/LoginButton.vue`

3. **Automatic redirection**: The system automatically:
   - Redirects all imports to override files
   - Excludes original files from the Nuxt build
   - Handles all import types (relative, absolute, from `~`, from `modules/`)

## Notes

- Override files must have the exact same directory structure as the original files
- The system works for both TypeScript/JavaScript and Vue components
- Original files are not included in the build at all if they have an override

## Module Documentation

For more information about the override system implementation, see the [`nuc_overrides`](../modules/nuc_overrides/README.md) module documentation.

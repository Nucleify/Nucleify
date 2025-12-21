# Nuc Overrides

Nuxt module for file overrides system. Allows overriding files from `nuxt/` and `modules/` directories by placing files in the `overrides/` directory with the same structure.

## How it works

1. **Directory structure**: Create a file in the same directory structure as the original file:
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
   - Excludes original files from Nuxt build
   - Handles all import types (relative, absolute, with `~`, with `modules/`)
   - Handles special files like `app.vue` and `pages/`

## Notes

- Override files must have exactly the same directory structure as original files
- The system works for both TypeScript/JavaScript and Vue components
- Original files are not included in the build at all if they have an override


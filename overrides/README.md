# Overrides

This folder contains files that override original files from `nuxt/` and `modules/`.

## How it works

1. **Folder structure**: Create a file with the same directory structure as the original file:
   - `overrides/nuxt/` - overrides files from `nuxt/` (frontend)
   - `overrides/modules/` - overrides files from `modules/` (both frontend and backend)

2. **Frontend Examples** (Nuxt/TypeScript/Vue):
   - Original file: `nuxt/composables/useAuth.ts`
   - Override: `overrides/nuxt/composables/useAuth.ts`
   
   Or:
   - Original file: `modules/nuc_auth/atomic/LoginButton.vue`
   - Override: `overrides/modules/nuc_auth/atomic/LoginButton.vue`

3. **Backend Examples** (Laravel/PHP):
   - Original file: `modules/nuc_auth/app/Models/User.php`
   - Override: `overrides/modules/nuc_auth/app/Models/User.php`
   
   Or:
   - Original file: `modules/nuc_auth/config/auth.php`
   - Override: `overrides/modules/nuc_auth/config/auth.php`

4. **Automatic redirection**: 
   - **Frontend**: The system automatically redirects all imports to override files, excludes original files from the Nuxt build, and handles all import types (relative, absolute, from `~`, from `modules/`)
   - **Backend**: The system automatically loads override files instead of original files when loading modules (providers, classes, configs, migrations, etc.)

## Notes

- Override files must have the exact same directory structure as the original files
- **Frontend**: The system works for both TypeScript/JavaScript and Vue components. Original files are not included in the build at all if they have an override.
- **Backend**: The system works for PHP files (classes, configs, migrations, seeders, factories, etc.). Override files are loaded instead of original files during application bootstrap.

## Module Documentation

For more information about the frontend override system implementation, see the [`nuc_overrides`](../modules/nuc_overrides/README.md) module documentation.

# Overriding

Overrides allow you to replace original files without modifying source code. This enables custom client implementations without editing core files, while maintaining clean upgrade paths.

Supported overrides:
- **Frontend** (Vue, TypeScript): `nuxt/`, `modules/*`
- **Backend** (Laravel, PHP): `modules/*`, `app/*`, `config/*`, `database/*`, `routes/*`

## Key Rules

- Override files must have the **exact same path** as originals
- Override files **completely replace** originals (no merging)
- Copy the original folder, delete files you don't override, **keep only what you change**
- Only override what you **need to change**
- Test thoroughly - overrides may break with updates

## How It Works

Place files in the `overrides/` directory with the same structure as the original:

```txt
overrides/
├── nuxt/                    # Overrides for nuxt/ directory
│   ├── composables/
│   ├── pages/
│   └── ...
└── modules/                 # Overrides for modules/ directory
    └── nuc_auth/
        ├── atomic/
        └── app/
```

The system automatically:
- **Frontend**: Redirects imports, excludes originals from build, handles all import types
- **Backend**: Loads override PHP files instead of originals during bootstrap

## Common Use Cases

### Custom Authentication

```txt
overrides/
└── modules/
    └── nuc_auth/
        ├── atomic/
        │   └── pages/
        │       └── Login/
        │           └── index.vue      # Custom login UI
        └── app/
            └── Http/
                └── Controllers/
                    └── Auth/
                        └── LoginController.php     # Custom auth logic
```

### Extended User Model

```txt
overrides/
└── modules/
    └── nuc_entities/
        └── app/
            └── Models/
                └── User.php           # Additional fields/relations
```

### Custom Dashboard

```txt
overrides/
└── nuxt/
    └── pages/
        └── dashboard.vue              # Custom dashboard layout
```

## Frontend Overrides

### Vue Components

Original: `modules/nuc_auth/atomic/pages/Login/index.vue`

Override: `overrides/modules/nuc_auth/atomic/pages/Login/index.vue`

```html
<template>
  <div class="custom-login">
    <!-- Your custom login UI -->
  </div>
</template>

<script setup lang="ts">
// Your custom logic
</script>
```

### TypeScript Files

Original: `nuxt/composables/useAuth.ts`

Override: `overrides/nuxt/composables/useAuth.ts`

```typescript
export function useAuth() {
  // Your custom authentication logic
}
```

### Nuxt Pages

Original: `nuxt/pages/dashboard.vue`

Override: `overrides/nuxt/pages/dashboard.vue`

## Backend Overrides

### Models

Original: `modules/nuc_entities/app/Models/User.php`

Override: `overrides/modules/nuc_entities/app/Models/User.php`

```php
<?php

namespace Modules\nuc_entities\app\Models;

class User extends \Illuminate\Foundation\Auth\User
{
    // Your custom model logic
    protected $fillable = ['name', 'email', 'custom_field'];
}
```

### Services

Original: `modules/nuc_auth/app/Services/AuthService.php`

Override: `overrides/modules/nuc_auth/app/Services/AuthService.php`

### Controllers

Original: `modules/nuc_entities/app/Http/Controllers/UserController.php`

Override: `overrides/modules/nuc_entities/app/Http/Controllers/UserController.php`

### Configurations

Original: `modules/nuc_auth/config/auth.php`

Override: `overrides/modules/nuc_auth/config/auth.php`

## Technical Details

### Frontend (Vite Plugin)

The override system uses a Vite plugin that:
1. Scans `overrides/nuxt/` and `overrides/modules/` on startup
2. Creates a mapping of original → override paths
3. Intercepts file loads and returns override content
4. Watches for changes and hot-reloads

### Backend (PHP Service)

The `OverrideService` class:
1. Builds a map of original → override paths
2. Provides `getOverridePath()` for resolution
3. Helper functions use this service automatically

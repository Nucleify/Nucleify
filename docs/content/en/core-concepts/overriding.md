# Overriding

Overrides allow you to replace original files without modifying source code. This enables custom client implementations without editing core files, while maintaining clean upgrade paths.

Supported overrides:
- **Frontend** (Vue, TypeScript): `nuxt/`, `modules/*`
- **Backend** (Supabase SQL, API handlers): `modules/*/supabase/`

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
    └── nuc_users/
        ├── atomic/
        └── supabase/
```

The system automatically:
- **Frontend**: Redirects imports, excludes originals from build, handles all import types
- **Backend**: Same mechanism for `supabase/api/*.ts` handlers imported by the API gateway (TypeScript overrides)

## Common Use Cases

### Custom Authentication

```txt
overrides/
└── modules/
    └── nuc_users/
        ├── atomic/
        │   └── pages/
        │       └── Login/
        │           └── index.vue      # Custom login UI
        └── supabase/
            └── api/
                └── handle.ts              # Custom API logic
```

### Custom API handler

```txt
overrides/
└── modules/
    └── nuc_entities/
        └── supabase/
            └── api/
                └── handle.ts           # Extra validation or custom queries
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

Original: `modules/nuc_users/auth/pages/login.vue`

Override: `overrides/modules/nuc_users/auth/pages/login.vue`

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

### API handlers

Original: `modules/nuc_users/supabase/api/handle.ts`

Override: `overrides/modules/nuc_users/supabase/api/handle.ts`

```typescript
import { apiNotHandled } from 'nuc_api'
import type { ApiContext, ApiHandlerResult } from 'nuc_server'

export async function handleAuthApi(ctx: ApiContext): Promise<ApiHandlerResult> {
  // Your custom handler logic
  return apiNotHandled()
}
```

### SQL migrations

For schema changes specific to your deployment, prefer new migration files in your own module rather than overriding core SQL. If you must override seed data, mirror the path under `overrides/modules/<module>/supabase/seeders/`.

## Technical Details

### Frontend (Vite Plugin)

The override system uses a Vite plugin that:
1. Scans `overrides/nuxt/` and `overrides/modules/` on startup
2. Creates a mapping of original → override paths
3. Intercepts file loads and returns override content
4. Watches for changes and hot-reloads

Server-side API handlers under `modules/*/supabase/api/` use the same resolution when imported through the Nuxt/Next build.

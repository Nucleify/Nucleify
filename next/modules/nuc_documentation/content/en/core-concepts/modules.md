# Modules

Modules are the core organizational unit in Nucleify. They encapsulate related functionality into reusable, self-contained packages that work across both Laravel (backend) and Vue/Nuxt (frontend).

## Naming Convention

| Type | Prefix | Example |
|------|--------|---------|
| Core modules | `nuc_` | `nuc_auth`, `nuc_entities` |
| Custom modules | `your_prefix_` | `ex_payments`, `my_blog` |

Core modules (`nuc_*`) are maintained by Nucleify. Custom modules should use a unique prefix to avoid conflicts.

## Module Structure

```txt
modules/ex_example/
├── config.json              # Module metadata (required)
├── ex_example.php           # Laravel ServiceProvider (required for backend)
├── ex_example.ts            # Vue component registration (required for frontend)
├── index.ts                 # TypeScript barrel export (required for frontend)
├── _index.scss              # SCSS entry point
├── README.md                # Module documentation
├── app/                     # Laravel backend logic
├── atomic/                  # Vue components & TypeScript
├── config/                  # PHP configuration files
├── database/                # Migrations, factories, seeders
├── routes/                  # API routes
├── tests/                   # PHP/Pest tests
└── vitests/                 # Vitest frontend tests
```

## Required Files

### `config.json`

Module metadata and state:

```json
{
  "name": "ex_example",
  "description": "Example module description",
  "version": "0.0.1",
  "category": "feature",
  "installed": true,
  "enabled": true
}
```

| Field | Description |
|-------|-------------|
| `name` | Unique identifier, must match folder name |
| `description` | Brief module purpose |
| `version` | Semantic version |
| `category` | `core`, `feature`, or `utility` |
| `installed` | Whether module is installed |
| `enabled` | Whether module is active |

### `ex_example.php`

Laravel ServiceProvider for backend registration:

```php
<?php

namespace Modules\ex_example;

use Illuminate\Support\ServiceProvider;

class ex_example extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/database/migrations');
        $this->loadRoutesFrom(__DIR__ . '/routes/api.php');
    }
}
```

Register in `config/modules.php`:

```php
return [
    Modules\ex_example\ex_example::class,
];
```

### `ex_example.ts`

Vue global component registration:

```typescript
import type { App } from 'vue'
import { ExExamplePage, ExExampleDashboard } from './atomic'

export function registerExExample(app: App<Element>): void {
  app
    .component('ex-example-page', ExExamplePage)
    .component('ex-example-dashboard', ExExampleDashboard)
}
```

### `index.ts`

Barrel export for all module exports:

```typescript
export * from './ex_example'
export * from './atomic'
export * from './vitests'
```

Add to `modules/index.ts`:

```typescript
export * from './ex_example'
```

## Backend Structure (`app/`)

```txt
app/
├── Contracts/                      # Interfaces
│   └── ExampleContract.php
├── Facades/                        # Laravel facades
│   └── ExampleFacade.php
├── Http/
│   ├── Controllers/                # API controllers
│   │   └── ExampleController.php
│   ├── Middleware/                 # Custom middleware
│   └── Requests/                   # Form validation
│       └── Example/
│           ├── PostRequest.php
│           └── PutRequest.php
├── Models/                         # Eloquent models
│   └── Example.php
├── Resources/                      # API resources
│   └── ExampleResource.php
└── Services/                       # Business logic
    └── ExampleService.php
```

## Frontend Structure (`atomic/`)

Uses Atomic Design methodology:

```txt
atomic/
├── index.ts                        # Barrel export
├── _index.scss                     # SCSS imports
├── bosons/                         # Utilities & types (smallest units)
│   ├── constants/                  # Static values
│   │   └── fields/                 # Form field definitions
│   ├── types/                      # TypeScript interfaces
│   │   ├── api/                    # API response types
│   │   └── object/                 # Domain object types
│   └── utils/                      # Helper functions
│       └── api/                    # API request functions
├── pages/                          # Full page components
│   └── General/
│       ├── index.ts
│       └── index.vue
└── templates/                      # Page sections/layouts
    └── Dashboard/
        ├── index.ts
        └── General.vue
```

### Bosons

Smallest building blocks - types, constants, utilities:

```typescript
// atomic/bosons/types/api/interfaces.ts
export interface ExampleApiResponse {
  id: number
  name: string
  created_at: string
}

// atomic/bosons/utils/api/requests.ts
export async function getExamples(): Promise<ExampleApiResponse[]> {
  return await api.get('/api/examples')
}
```

### Pages

Full-page Vue components:

```html
<!-- atomic/pages/General/index.vue -->
<template>
  <ExExampleDashboard />
</template>

<script setup lang="ts">
import { ExExampleDashboard } from '../../templates'
</script>
```

### Templates

Reusable page sections:

```html
<!-- atomic/templates/Dashboard/General.vue -->
<template>
  <section class="ex-example-dashboard">
    <slot />
  </section>
</template>
```

## Database (`database/`)

```txt
database/
├── factories/                        # Model factories for testing
│   └── ExampleFactory.php
├── migrations/                       # Database migrations
│   └── 2024_01_01_000000_create_examples_table.php
└── seeders/                          # Data seeders
    └── ExampleSeeder.php
```

## Routes (`routes/`)

```php
// routes/api.php
Route::prefix('api')->group(function (): void {
    Route::middleware(['web', 'auth'])->group(function (): void {
        Route::prefix('examples')->controller(ExampleController::class)->group(function (): void {
            Route::get('/', 'index')->name('examples.index');
            Route::get('/{id}', 'show')->name('examples.show');
            Route::post('/', 'store')->name('examples.store');
            Route::put('/{id}', 'update')->name('examples.update');
            Route::delete('/{id}', 'destroy')->name('examples.destroy');
        });
    });
});
```

## Testing

### PHP Tests (`tests/`)

Uses Pest PHP with organized structure:

```txt
tests/
├── Pest.php                        # Pest configuration
├── TestGroups.php                  # Test group definitions
├── TestUses.php                    # Shared test traits
├── Database/
│   ├── Factories/                  # Factory tests
│   ├── Migrations/                 # Migration tests
│   └── Models/                     # Model tests
└── Feature/
    ├── Api/                        # HTTP endpoint tests
    │   └── Example/
    │       ├── HTTP200Test.php
    │       ├── HTTP401Test.php
    │       └── HTTP405Test.php
    ├── Controllers/                # Controller tests
    └── Services/                   # Service tests
```

### Vitest (`vitests/`)

Frontend unit tests:

```txt
vitests/
├── index.ts                        # Barrel export
├── api/                            # API request tests
│   └── Example/
│       └── 200.test.ts
└── constants/                      # Test constants
    └── api/
        └── example.ts
```

## Creating a Module

1. **Create folder**: `modules/yourprefix_modulename/`

2. **Add `config.json`** with module metadata

3. **Create entry points**:
   - `yourprefix_modulename.php` (if backend needed)
   - `yourprefix_modulename.ts` (if frontend needed)
   - `index.ts` (always required)

4. **Register module**:
   - Add to `config/modules.php` (backend)
   - Add to `modules/index.ts` (frontend)

5. **Add structure** as needed:
   - `app/` for backend logic
   - `atomic/` for frontend components
   - `database/` for migrations
   - `routes/` for API endpoints
   - `tests/` and `vitests/` for testing

## Best Practices

- **Naming**: Use unique prefix (`nuc_` is reserved for core modules)
- **Exports**: Export everything through `index.ts` files
- **Types**: Define all TypeScript types in `atomic/bosons/types/`
- **API**: Keep API logic in `atomic/bosons/utils/api/`
- **Testing**: Write tests for both backend and frontend
- **SCSS**: Use `_index.scss` for module-specific styles
- **Documentation**: Include `README.md` in each module

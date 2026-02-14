# Modules Structure

## Overview

The project uses a **modular architecture** where each module is a self-contained unit in `modules/`. Modules are prefixed with `nuc_` and can contain both **Laravel backend** and **TypeScript/Vue frontend** code. Modules are registered in `config/modules.php` (backend) and `modules/index.ts` (frontend).

---

## Module Naming

- All modules are prefixed with `nuc_` (e.g. `nuc_entities`, `nuc_auth`, `nuc_charts`)
- Module folder name matches the module class name and config name

---

## Module Configuration (`config.json`)

Every module has a `config.json` at its root:

```json
{
  "name": "nuc_example",
  "description": "Module that contains example functions.",
  "version": "0.1.0",
  "category": "core",
  "installed": true,
  "enabled": true
}
```

---

## Full-Stack Module Structure (e.g. `nuc_entities`)

Modules with both backend and frontend code follow this structure:

```
modules/nuc_example/
├── config.json                # Module metadata
├── nuc_example.php            # Laravel ServiceProvider (backend entry)
├── nuc_example.ts             # Vue plugin registration (frontend entry)
├── index.ts                   # Barrel file (re-exports everything)
├── _index.scss                # Module-level SCSS imports (optional)
├── README.md                  # Module documentation
│
├── app/                       # Laravel backend
│   ├── Contracts/             # Interfaces for models
│   ├── Http/
│   │   ├── Controllers/       # API controllers
│   │   └── Requests/          # Form request validation
│   │       └── {Entity}/
│   │           ├── PostRequest.php
│   │           └── PutRequest.php
│   ├── Models/                # Eloquent models
│   ├── Resources/             # API resources (JSON transformers)
│   └── Services/              # Business logic services
│
├── config/                    # Laravel config files (optional)
├── database/
│   ├── factories/             # Model factories
│   ├── migrations/            # Database migrations
│   └── seeders/               # Database seeders
├── routes/
│   └── api.php                # Module API routes
│
├── atomic/                    # Frontend (Atomic Design)
│   ├── bosons/                # Constants, types, utils
│   ├── pages/                 # Full-page components
│   └── templates/             # Reusable template components
│
├── tests/                     # Pest PHP tests
│   ├── Database/
│   │   ├── Factories/         # Factory tests
│   │   ├── Migrations/        # Migration tests
│   │   └── Models/            # Model tests (instance + scope)
│   ├── Feature/
│   │   ├── Api/               # HTTP status code tests per entity
│   │   │   └── {Entity}/
│   │   │       ├── HTTP200Test.php
│   │   │       ├── HTTP302Test.php
│   │   │       ├── HTTP401Test.php
│   │   │       ├── HTTP405AuthTest.php
│   │   │       ├── HTTP405UnAuthTest.php
│   │   │       ├── HTTP422PostTest.php
│   │   │       ├── HTTP422PutTest.php
│   │   │       └── HTTP500Test.php
│   │   └── Controllers/       # Controller tests
│   ├── Pest.php
│   ├── TestConstants.php
│   ├── TestGroups.php
│   └── TestUses.php
│
└── vitests/                   # Vitest frontend tests
    ├── api/
    │   └── {Entity}/
    │       └── 200.test.ts
    ├── constants/
    └── index.ts
```

---

## Frontend-Only Module Structure (e.g. `nuc_charts`, `nuc_pricings`)

Modules without backend code have a simpler structure:

```
modules/nuc_example/
├── config.json
├── nuc_example.ts             # Vue plugin registration
├── index.ts                   # Barrel file
├── _index.scss                # SCSS imports (optional)
├── README.md
│
├── atomic/                    # or components/
│   ├── boson/                 # Utilities and types
│   └── template/              # Template components
│
└── vitests/                   # Frontend tests
```

---

## Component-Based Module Structure (e.g. `nuc_sections`, `nuc_templates`)

Some modules use `components/` instead of `atomic/` for domain-specific components:

```
modules/nuc_sections/
├── components/
│   ├── navbar/
│   │   ├── index.vue
│   │   ├── index.ts
│   │   ├── _index.scss
│   │   └── components/        # Sub-components
│   ├── footer/
│   ├── faq/
│   └── contact/
```

---

## Module Registration

### Backend (Laravel)
Modules with a ServiceProvider are registered in `config/modules.php`:

```php
return [
    Modules\nuc_entities\nuc_entities::class,
    Modules\nuc_auth\nuc_auth::class,
    // ...
];
```

The ServiceProvider (`nuc_example.php`) loads migrations and routes:

```php
class nuc_example extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/database/migrations');
        $this->loadRoutesFrom(__DIR__ . '/routes/api.php');
    }
}
```

### Frontend (TypeScript)
All modules are re-exported from `modules/index.ts`:

```typescript
export * from './nuc_example'
```

The module's `nuc_example.ts` registers Vue components globally:

```typescript
import type { App } from 'vue'
import { NucExamplePage } from './atomic'

export function registerNucExample(app: App<Element>): void {
  app.component('nuc-example-page', NucExamplePage)
}
```

---

## Module Categories

Modules have a `category` field in their `config.json`. Current category: `"core"`.

---

## Barrel File Convention

Every folder uses `index.ts` barrel files for clean re-exports:

```typescript
// Module index.ts
export * from './nuc_example'   // Main module file
export * from './atomic'         // Frontend atomic exports
export * from './vitests'        // Test exports (if any)
```

---

## Key Modules

| Module | Description | Backend | Frontend |
|--------|-------------|---------|----------|
| `nuc_entities` | CRUD entities (Article, Contact, Money, User) | ✅ | ✅ |
| `nuc_auth` | Authentication (login, register, logout) | ✅ | ✅ |
| `nuc_colors` | Theme color management | ✅ | ✅ |
| `nuc_files` | File upload and management | ✅ | ✅ |
| `nuc_modules` | Module management system | ✅ | ✅ |
| `nuc_charts` | Chart components (Chart.js) | ❌ | ✅ |
| `nuc_api` | API utilities and types | ❌ | ✅ |
| `nuc_stores` | State management (Pinia, cookies, storage) | ❌ | ✅ |
| `nuc_sections` | Landing page sections (navbar, footer, FAQ) | ❌ | ✅ |
| `nuc_templates` | Reusable visual templates | ❌ | ✅ |
| `nuc_documentation` | Documentation system (Markdown) | ❌ | ✅ |
| `nuc_animations` | GSAP + CSS animations | ❌ | ✅ |
| `nuc_pages` | Marketing/static pages | ✅ | ✅ |
| `nuc_pricings` | Pricing sections | ❌ | ✅ |
| `nuc_globals` | Global constants, types, styles | ❌ | ✅ |


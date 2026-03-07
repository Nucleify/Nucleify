# Modules

Modular architecture — each module is `modules/nuc_*`, self-contained with optional backend + frontend. All PHP classes use `App\*` namespace (e.g. `App\Models\Article`, `App\Services\ArticleService`) — modules are part of the main app, not separate packages. Only the ServiceProvider uses `Modules\nuc_*` namespace. Registered in `config/modules.php` (backend) and `modules/index.ts` (frontend).

## Full-Stack Module Structure

```
modules/nuc_example/
├── config.json              # { name, description, version, category, installed, enabled }
├── nuc_example.php          # Laravel ServiceProvider (loads migrations + routes)
├── nuc_example.ts           # Vue plugin (registers components globally)
├── index.ts                 # Barrel re-exports
├── _index.scss              # Module SCSS (optional)
├── app/
│   ├── Contracts/           # Model interfaces
│   ├── Http/Controllers/
│   ├── Http/Requests/{Entity}/  # PostRequest.php, PutRequest.php
│   ├── Models/
│   ├── Resources/
│   └── Services/
├── database/
│   ├── factories/
│   ├── migrations/
│   └── seeders/
├── routes/api.php
├── atomic/                  # Frontend
│   ├── bosons/              # constants, types, utils/api
│   ├── pages/
│   └── templates/
├── tests/                   # Pest PHP
│   ├── Pest.php, TestConstants.php, TestGroups.php, TestUses.php
│   ├── Database/{Factories,Migrations,Models}/
│   └── Feature/{Api/{Entity}/HTTP{code}Test.php, Controllers/}
└── vitests/                 # Vitest
    ├── api/{Entity}/200.test.ts
    └── constants/api/
```

Frontend-only modules skip `app/`, `database/`, `routes/`, `tests/`. Some use `components/` instead of `atomic/`.

## Registration

**Backend:** `config/modules.php` → `Modules\nuc_example\nuc_example::class`

**Frontend:** `modules/index.ts` → `export * from './nuc_example'`

```typescript
// nuc_example.ts
import type { App } from 'vue'
import { NucExamplePage } from './atomic'
export function registerNucExample(app: App<Element>): void {
  app.component('nuc-example-page', NucExamplePage)
}
```

## ServiceProvider

```php
class nuc_example extends ServiceProvider {
    public function boot(): void {
        $this->loadMigrationsFrom(__DIR__ . '/database/migrations');
        $this->loadRoutesFrom(__DIR__ . '/routes/api.php');
    }
}
```

## Barrel Files

Every folder uses `index.ts` for clean re-exports. Module `index.ts` re-exports: main file, `atomic/`, `vitests/`.

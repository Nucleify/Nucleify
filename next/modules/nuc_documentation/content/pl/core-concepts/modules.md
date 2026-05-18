# Moduły

Moduły są główną jednostką organizacyjną w Nucleify. Zamykają powiązaną funkcjonalność w samodzielnych, wielokrotnego użytku modułach, które działają zarówno po stronie Laravel (backend) jak i Vue/Nuxt (frontend).

## Konwencja nazewnictwa

| Typ | Prefix | Przykład |
|-----|--------|----------|
| Moduły core | `nuc_` | `nuc_auth`, `nuc_entities` |
| Moduły własne | `twoj_prefix_` | `ex_payments`, `my_blog` |

Moduły core (`nuc_*`) są utrzymywane przez Nucleify. Moduły własne powinny używać unikalnego prefixu, aby uniknąć konfliktów.

## Struktura modułu

```txt
modules/ex_example/
├── config.json              # Metadane modułu (wymagane)
├── ex_example.php           # Laravel ServiceProvider (wymagane dla backendu)
├── ex_example.ts            # Rejestracja komponentów Vue (wymagane dla frontendu)
├── index.ts                 # Barrel export TypeScript (wymagane dla frontendu)
├── _index.scss              # Punkt wejścia SCSS
├── README.md                # Dokumentacja modułu
├── app/                     # Logika backendu Laravel
├── atomic/                  # Komponenty Vue i TypeScript
├── config/                  # Pliki konfiguracyjne PHP
├── database/                # Migracje, factories, seedery
├── routes/                  # Trasy API
├── tests/                   # Testy PHP/Pest
└── vitests/                 # Testy frontendowe Vitest
```

## Wymagane pliki

### `config.json`

Metadane i stan modułu:

```json
{
  "name": "ex_example",
  "description": "Opis przykładowego modułu",
  "version": "0.0.1",
  "category": "feature",
  "installed": true,
  "enabled": true
}
```

| Pole | Opis |
|------|------|
| `name` | Unikalny identyfikator, musi odpowiadać nazwie folderu |
| `description` | Krótki opis przeznaczenia modułu |
| `version` | Wersja semantyczna |
| `category` | `core`, `feature` lub `utility` |
| `installed` | Czy moduł jest zainstalowany |
| `enabled` | Czy moduł jest aktywny |

### `ex_example.php`

Laravel ServiceProvider do rejestracji backendu:

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

Zarejestruj w `config/modules.php`:

```php
return [
    Modules\ex_example\ex_example::class,
];
```

### `ex_example.ts`

Globalna rejestracja komponentów Vue:

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

Barrel export dla wszystkich eksportów modułu:

```typescript
export * from './ex_example'
export * from './atomic'
export * from './vitests'
```

Dodaj do `modules/index.ts`:

```typescript
export * from './ex_example'
```

## Struktura backendu (`app/`)

```txt
app/
├── Contracts/                      # Interfejsy
│   └── ExampleContract.php
├── Facades/                        # Fasady Laravel
│   └── ExampleFacade.php
├── Http/
│   ├── Controllers/                # Kontrolery API
│   │   └── ExampleController.php
│   ├── Middleware/                 # Własne middleware
│   └── Requests/                   # Walidacja formularzy
│       └── Example/
│           ├── PostRequest.php
│           └── PutRequest.php
├── Models/                         # Modele Eloquent
│   └── Example.php
├── Resources/                      # Zasoby API
│   └── ExampleResource.php
└── Services/                       # Logika biznesowa
    └── ExampleService.php
```

## Struktura frontendu (`atomic/`)

Wykorzystuje metodologię Atomic Design:

```txt
atomic/
├── index.ts                        # Barrel export
├── _index.scss                     # Importy SCSS
├── bosons/                         # Narzędzia i typy (najmniejsze jednostki)
│   ├── constants/                  # Wartości statyczne
│   │   └── fields/                 # Definicje pól formularzy
│   ├── types/                      # Interfejsy TypeScript
│   │   ├── api/                    # Typy odpowiedzi API
│   │   └── object/                 # Typy obiektów domenowych
│   └── utils/                      # Funkcje pomocnicze
│       └── api/                    # Funkcje żądań API
├── pages/                          # Komponenty pełnych stron
│   └── General/
│       ├── index.ts
│       └── index.vue
└── templates/                      # Sekcje stron/layouty
    └── Dashboard/
        ├── index.ts
        └── General.vue
```

### Bosons

Najmniejsze elementy składowe - typy, stałe, narzędzia:

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

Komponenty pełnych stron Vue:

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

Wielokrotnego użytku sekcje stron:

```html
<!-- atomic/templates/Dashboard/General.vue -->
<template>
  <section class="ex-example-dashboard">
    <slot />
  </section>
</template>
```

## Baza danych (`database/`)

```txt
database/
├── factories/                        # Factories modeli do testów
│   └── ExampleFactory.php
├── migrations/                       # Migracje bazy danych
│   └── 2024_01_01_000000_create_examples_table.php
└── seeders/                          # Seedery danych
    └── ExampleSeeder.php
```

## Trasy (`routes/`)

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

## Testowanie

### Testy PHP (`tests/`)

Używa Pest PHP z uporządkowaną strukturą:

```txt
tests/
├── Pest.php                        # Konfiguracja Pest
├── TestGroups.php                  # Definicje grup testów
├── TestUses.php                    # Współdzielone traity testów
├── Database/
│   ├── Factories/                  # Testy factories
│   ├── Migrations/                 # Testy migracji
│   └── Models/                     # Testy modeli
└── Feature/
    ├── Api/                        # Testy endpointów HTTP
    │   └── Example/
    │       ├── HTTP200Test.php
    │       ├── HTTP401Test.php
    │       └── HTTP405Test.php
    ├── Controllers/                # Testy kontrolerów
    └── Services/                   # Testy serwisów
```

### Vitest (`vitests/`)

Testy jednostkowe frontendu:

```txt
vitests/
├── index.ts                        # Barrel export
├── api/                            # Testy żądań API
│   └── Example/
│       └── 200.test.ts
└── constants/                      # Stałe testowe
    └── api/
        └── example.ts
```

## Tworzenie modułu

1. **Utwórz folder**: `modules/twojprefix_nazwamodulu/`

2. **Dodaj `config.json`** z metadanymi modułu

3. **Utwórz punkty wejścia**:
   - `twojprefix_nazwamodulu.php` (jeśli potrzebny backend)
   - `twojprefix_nazwamodulu.ts` (jeśli potrzebny frontend)
   - `index.ts` (zawsze wymagane)

4. **Zarejestruj moduł**:
   - Dodaj do `config/modules.php` (backend)
   - Dodaj do `modules/index.ts` (frontend)

5. **Dodaj strukturę** według potrzeb:
   - `app/` dla logiki backendu
   - `atomic/` dla komponentów frontendu
   - `database/` dla migracji
   - `routes/` dla endpointów API
   - `tests/` i `vitests/` dla testów

## Dobre praktyki

- **Nazewnictwo**: Używaj unikalnego prefixu (`nuc_` jest zarezerwowany dla modułów core)
- **Eksporty**: Eksportuj wszystko przez pliki `index.ts`
- **Typy**: Definiuj wszystkie typy TypeScript w `atomic/bosons/types/`
- **API**: Trzymaj logikę API w `atomic/bosons/utils/api/`
- **Testowanie**: Pisz testy zarówno dla backendu jak i frontendu
- **SCSS**: Używaj `_index.scss` dla stylów specyficznych dla modułu
- **Dokumentacja**: Dołącz `README.md` do każdego modułu

# Moduły

Moduły są główną jednostką organizacyjną w Nucleify. Zamykają powiązaną funkcjonalność w samodzielnych pakietach wielokrotnego użytku, które działają z **Supabase** (SQL + handlery API) oraz **Vue/Nuxt** lub **React/Next** (frontend).

## Konwencja nazewnictwa

| Typ | Prefix | Przykład |
|-----|--------|----------|
| Moduły core | `nuc_` | `nuc_users`, `nuc_entities` |
| Moduły własne | `twoj_prefix_` | `ex_payments`, `my_blog` |

Moduły core (`nuc_*`) są utrzymywane przez Nucleify. Moduły własne powinny używać unikalnego prefixu, aby uniknąć konfliktów.

## Struktura modułu

```txt
modules/ex_example/
├── config.json              # Metadane modułu (wymagane)
├── ex_example.ts            # Rejestracja komponentów Vue
├── ex_example.react.ts      # Rejestracja React (opcjonalnie)
├── index.ts                 # Barrel export TypeScript
├── _index.scss              # Punkt wejścia SCSS
├── README.md
├── atomic/                  # Komponenty UI i composables
├── supabase/                # Backend: SQL + handlery API
│   ├── migrations/
│   ├── seeders/
│   ├── factories/
│   └── api/handle.ts
└── vitests/                 # Testy Vitest
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

### `ex_example.ts`

Globalna rejestracja komponentów Vue:

```typescript
import type { App } from 'vue'
import { ExExamplePage } from './atomic'

export function registerExExample(app: App<Element>): void {
  app.component('ex-example-page', ExExamplePage)
}
```

Zarejestruj w `nuxt/plugins/modules.ts` przez `registerExExample`.

### `supabase/api/handle.ts`

Handler API dla bramki modułu:

```typescript
import { apiNotHandled, trySimpleCrud } from 'nuc_api'
import type { ApiContext, ApiHandlerResult } from 'nuc_server'

export async function handleExampleApi(ctx: ApiContext): Promise<ApiHandlerResult> {
  if (ctx.segments[0] !== 'examples') return apiNotHandled()
  return (await trySimpleCrud(ctx, { table: 'examples' })) ?? apiNotHandled()
}
```

Dodaj `handleExampleApi` do tablicy handlerów w `nuxt/server/api/[...slug].ts`.

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

## Struktura backendu (`supabase/`)

```txt
supabase/
├── migrations/                     # Schemat PostgreSQL (*.sql)
├── seeders/                        # Dane seed
├── factories/                      # Dane demo/testowe
├── api/
│   ├── handle.ts                   # Wejście bramki: handleExampleApi
│   └── *_helpers.ts                # Nazwy tabel, mapowanie wierszy
└── functions/                      # Opcjonalne Edge Functions
```

Handlery używają helperów `nuc_api` (`trySimpleCrud`, `tryScopedCrud`) oraz klienta Supabase JS przekazanego w `ApiContext`.

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

Najmniejsze elementy składowe — typy, stałe, narzędzia:

```typescript
// types/api/interfaces.ts
export interface ExampleApiResponse {
  id: number
  name: string
  created_at: string
}

// utils/api.ts
export async function getExamples(): Promise<ExampleApiResponse[]> {
  return await api.get('/api/examples')
}
```

### Pages

Komponenty pełnych stron Vue:

```html
<!-- pages/General/index.vue -->
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
<!-- components/Dashboard/General.vue -->
<template>
  <section class="ex-example-dashboard">
    <slot />
  </section>
</template>
```

## Baza danych (`supabase/migrations/`)

```txt
supabase/migrations/
└── 20260501000000_nuc_example.sql
```

Zastosuj przez `bash .config/bash/apply-module-migrations.sh` (scala SQL ze wszystkich modułów).

## Trasy API

Bramka mapuje `/api/{segments}` na handlery modułów. Przykład: `GET /api/examples` → `handleExampleApi` → `supabase.from('examples').select()`.

## Testowanie

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
   - `twojprefix_nazwamodulu.ts` (Vue) i/lub `.react.ts` (React)
   - `index.ts` (zawsze wymagane)
   - `supabase/api/handle.ts` (jeśli potrzebne API)

4. **Zarejestruj moduł**:
   - Dodaj handler do `nuxt/server/api/[...slug].ts` (i bramki Next, jeśli używana)
   - Dodaj do `modules/index.ts` i `nuxt/plugins/modules.ts`

5. **Dodaj strukturę** według potrzeb:
   - `atomic/` dla UI
   - `supabase/migrations`, `seeders` dla bazy danych
   - `vitests/` dla testów

## Dobre praktyki

- **Nazewnictwo**: Używaj unikalnego prefixu (`nuc_` jest zarezerwowany dla modułów core)
- **Eksporty**: Eksportuj wszystko przez pliki `index.ts`
- **Typy**: Definiuj wszystkie typy TypeScript w `types/`
- **API**: Trzymaj logikę API w `utils/api.ts`
- **Testowanie**: Preferuj Vitest dla UI i composables API
- **SCSS**: Używaj `_index.scss` dla stylów specyficznych dla modułu
- **Dokumentacja**: Dołącz `README.md` do każdego modułu

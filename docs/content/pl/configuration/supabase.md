# Supabase

Nucleify używa [Supabase](https://supabase.com) do PostgreSQL, Auth, Storage i Edge Functions. Schemat bazy i seedery są **własnością modułów funkcjonalnych** w `shared_modules/nuc_*/supabase/` i scalane na poziomie monorepo pod `supabase/`.

Dostęp serwerowy z Nuxt idzie przez bramkę API Nitro - nie przez bezpośrednie wywołania service-role z przeglądarki. To samo dotyczy wygenerowanych shelli (Next, Solid, Svelte): współdzielą tę samą instancję Supabase i ten sam model modułów.

---

## Architektura

```txt
Przeglądarka
  → /api/*  (web/src/server/api/[...slug].ts)
  → dispatchSupabaseApiGateway()
  → nuc_*/supabase/api/handle.ts
  → Supabase (PostgreSQL, Auth, Edge Functions)
```

Rejestr bramki:

```typescript
// shared_modules/nuc_api/supabase/api/gateway_dispatch.ts
export const supabaseApiGatewayHandlers = [
  handleColorsApi,
  handleLanguagesApi,
] as const
```

Dodawaj domeny przez implementację `handle*Api` i dopisanie do tej tablicy.

---

## Środowisko

Ustaw w root `.env` (zob. [Zmienne środowiskowe](/pl/docs/configuration/environment)):

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_EDGE_BASE=
```

- **`SUPABASE_KEY`** - eksponowany klientowi przez `runtimeConfig.public`
- **`SUPABASE_SERVICE_ROLE_KEY`** - tylko serwer, używany przez bramkę Nitro

---

## Układ SQL modułu

Każdy moduł może dostarczać artefakty SQL:

```txt
shared_modules/nuc_example/supabase/
├── api/
│   ├── handle.ts
│   └── example_handlers.ts
├── migrations/       # zmiany schematu (*.sql)
├── factories/        # SQL factory dla dev/test
└── seeders/          # dane seed (*.sql)
```

Przykłady w monorepo:

- `nuc_colors/supabase/migrations/`, `seeders/`, `factories/`
- `nuc_languages/supabase/migrations/`

---

## Merge i skrypty apply

SQL modułów scala się do projektu Supabase monorepo skryptami bash w `.config/bash/`:

| Skrypt | Komenda |
|--------|---------|
| Merge całego SQL modułów | `pnpm supabase:merge-sql` |
| Zastosuj migracje (local) | `pnpm supabase:migrations:apply:local` |
| Zastosuj migracje (linked remote) | `pnpm supabase:migrations:apply:linked` |
| Zastosuj factories (local) | `pnpm supabase:factories:apply:local` |
| Zastosuj seeders (local) | `pnpm supabase:seeders:apply:local` |
| Pełny setup local | `pnpm supabase:setup:local` |
| Pełny setup linked | `pnpm supabase:setup:linked` |

Implementacja:

- `.config/bash/merge-module-supabase-sql.sh` - zbiera SQL modułów
- `.config/bash/apply-module-migrations.sh` - uruchamia migracje
- `.config/bash/apply-module-sql.sh` - uruchamia factories/seeders

---

## Pisanie handlerów API

### Wejście bramki (`handle.ts`)

```typescript
import { apiNotHandled, apiMethodNotAllowed } from 'nuc_api'
import type { ApiContext, ApiHandlerResult } from 'nuc_server'

export async function handleExampleApi(ctx: ApiContext): Promise<ApiHandlerResult> {
  if (ctx.segments[0] !== 'example') return apiNotHandled()
  // dispatch do tabeli tras …
  return apiMethodNotAllowed()
}
```

Zwróć `apiNotHandled()`, gdy prefiks ścieżki nie pasuje - bramka próbuje kolejnego handlera.

### Trasy z auth

Używaj helperów z `nuc_api`:

```typescript
import { withGatewayUser } from 'nuc_api'

return withGatewayUser(ctx, async (gatewayCtx, userId) => {
  // userId dostępny dla zapytań w zakresie RLS
})
```

### Requesty klienta

Używaj narzędzi requestów `nuc_api` z frontendu:

```typescript
import { apiRequest } from 'modules/nuc_api/utils/api_request'
```

Nigdy nie osadzaj klucza service role w kodzie klienta.

---

## Row Level Security

Włącz RLS na tabelach eksponowanych przez PostgREST. Dodaj polityki dla roli `authenticated`. Migracje modułów powinny zawierać polityki obok definicji tabel.

Testuj polityki zarówno na kliencie anon, jak i authenticated przed shipem.

---

## Edge Functions

Funkcje edge modułu żyją pod `shared_modules/nuc_*/supabase/functions/`. Przykład:

```txt
shared_modules/nuc_colors/supabase/functions/user-colors/index.ts
```

`SUPABASE_EDGE_BASE` w `.env` domyślnie wskazuje na `{SUPABASE_URL}/functions/v1`.

---

## Lokalny workflow developerski

1. Zainstaluj Supabase CLI i uruchom lokalny stack (lub zlinkuj remote)
2. Skonfiguruj root `.env` z URL i kluczami projektu
3. Zaaplikuj scalony SQL:

```bash
pnpm supabase:setup:local
```

4. Uruchom Nuxt:

```bash
make web
```

5. Zweryfikuj bramkę:

```bash
curl http://localhost:3000/api
curl http://localhost:3000/api/colors/…   # trasy konkretnego modułu
```

---

## Katalog monorepo `supabase/`

Top-level `supabase/` trzyma config projektu, scalony output migracji i wspólną konfigurację edge - wypełniany skryptami merge ze źródeł modułów.

---

## Powiązana dokumentacja

- [Moduły](/pl/docs/core-concepts/modules) - struktura modułu i rejestracja bramki
- [Zmienne środowiskowe](/pl/docs/configuration/environment) - zmienne Supabase
- [Web & Admin](/pl/docs/configuration/web) - punkt wejścia bramki Nitro

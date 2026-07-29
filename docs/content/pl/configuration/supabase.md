# Konfiguracja Supabase

Nucleify używa **Supabase** jako backendu: **PostgreSQL** do danych, **Auth** do użytkowników, **Storage** do plików oraz opcjonalnie **Edge Functions**. Frontend komunikuje się z **bramką API modułów** na trasach serwerowych Nuxt/Next, która używa klienta Supabase z **service role**.

---

## Jak to działa

```txt
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                       NUXT 3 / NEXT (frontend + trasy serwerowe)                       │
│                                                                                        │
│ ┌────────────────────────┐    ┌────────────────────────┐    ┌────────────────────────┐ │
│ │     UI Vue / React     │───►│    nuc_api (klient)    │───►│     bramka /api/*      │ │
│ │     Pinia / Zustand    │───►│    apiRequest, auth    │───►│    (Nitro / Route)     │ │
│ └────────────────────────┘    └────────────────────────┘    └────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────────────────┘
                                            │
                            modules/*/supabase/api/handle.ts
                               (handlery tras per moduł)
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                        SUPABASE                                        │
│                                                                                        │
│     ┌────────────────┐  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐     │
│     │   PostgreSQL   │  │      Auth      │  │    Storage     │  │ Edge Functions │     │
│     │     + RLS      │  │     (JWT)      │  │   (buckety)    │  │ (opcjonalnie)  │     │
│     └────────────────┘  └────────────────┘  └────────────────┘  └────────────────┘     │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Przepływ żądania

1. **Przeglądarka** wywołuje `apiRequest('/api/contacts', …)` z `nuc_api`.
2. **Trasa serwerowa** `nuxt/server/api/[...slug].ts` (lub odpowiednik w Next) odbiera żądanie.
3. Tworzony jest klient Supabase z `SUPABASE_SERVICE_ROLE_KEY` (tylko serwer).
4. Bramka iteruje po **handlerach modułów** (`handleEntitiesApi`, `handleUsersApi`, …). Pierwszy rozpoznający ścieżkę zwraca JSON.
5. Handlery używają helperów z `nuc_api` (`tryScopedCrud`, `trySimpleCrud`) i wykonują zapytania przez klient JS (`supabase.from('tabela').select()` itd.).
6. **Auth:** przeglądarka używa klucza anon (`SUPABASE_KEY`) przez `getSupabaseClient()` — np. `supabase.auth.signInWithPassword`, potem profil w `user_profiles`.

### Dlaczego bramka API, a nie tylko RLS z przeglądarki?

- Spójny **kształt REST** dla wszystkich modułów.
- **Service role** na serwerze — operacje administracyjne bez ujawniania klucza w kliencie.
- **Walidacja i scope** (`user_id`) w handlerach modułów.
- Te same handlery na **Nuxt** i **Next**.

---

## Zmienne środowiskowe

Skopiuj `.config/.env.nuxt.example` lub `.config/.env.next.example` do `.env` w katalogu głównym.

| Zmienna | Wymagana | Opis |
|---------|----------|------|
| `SUPABASE_URL` | Tak | URL projektu |
| `SUPABASE_KEY` | Tak | Klucz anon — bezpieczny w przeglądarce |
| `SUPABASE_SERVICE_ROLE_KEY` | Tak (serwer) | Service role — **tylko serwer** |
| `SUPABASE_EDGE_BASE` | Opcjonalnie | Bazowy URL Edge Functions |
| `NUXT_PUBLIC_APP_URL` | Nuxt | Publiczny URL aplikacji |

Nuxt udostępnia wartości publiczne przez `runtimeConfig.public` w `.config/nuxt/runtime.ts`:

```typescript
public: {
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseKey: process.env.SUPABASE_KEY || '',
}
```

Konfiguracja prywatna (serwer):

```typescript
supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
```

Next odczytuje `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_KEY` z fallbackiem do `SUPABASE_*` w `next.config.ts`.

---

## Struktura modułu (`supabase/`)

Każdy moduł z logiką backendową trzyma SQL i handlery obok frontendu:

```txt
modules/nuc_example/
├── config.json
├── nuc_example.ts              # registerNucExample (Vue)
├── index.ts                    # barrel
├── atomic/                     # UI + composables API
└── supabase/
    ├── migrations/             # DDL PostgreSQL (*.sql)
    ├── seeders/                # Dane seed (*.sql)
    ├── factories/              # Dane demo/test (*.sql)
    ├── api/
    │   ├── handle.ts           # export handleExampleApi(ctx)
    │   └── *_helpers.ts        # nazwy tabel, mapowanie wierszy
    └── functions/              # Opcjonalne Edge Functions (Deno)
```

### Rejestracja handlerów API

**Nuxt** — dodaj handler do `nuxt/server/api/[...slug].ts`:

```typescript
import { handleExampleApi } from '../../../modules/nuc_example/supabase/api/handle'

const handlers = [
  // …istniejące handlery
  handleExampleApi,
]
```

**Next** — zarejestruj w `modules/nuc_api/supabase/api/gateway_dispatch.ts` (`supabaseApiGatewayHandlers`).

Każdy handler otrzymuje `ApiContext`:

```typescript
type ApiContext = {
  event: H3Event          // lub wrapper żądania Next
  method: string          // GET, POST, PUT, DELETE
  segments: string[]      // ścieżka po /api/
  supabase: SupabaseClient
  ok: (data, extra?) => object
}
```

Zwróć `apiNotHandled()`, jeśli ścieżka nie należy do modułu; `apiOk(ctx, data)` lub `apiError(status, message)` gdy obsłużysz żądanie.

### Helpery CRUD (`nuc_api`)

| Helper | Zastosowanie |
|--------|--------------|
| `trySimpleCrud` | Publiczne tabele, zagnieżdżone ścieżki jak `/api/modules` |
| `tryScopedCrud` | Wiersze z `user_id` (kontakty, pliki, …) |
| Własne trasy | `dispatchRoutes` / handlery specyficzne (auth, uploady) |

---

## Migracje i seedery

Pliki SQL w `supabase/migrations/` i `supabase/seeders/` per moduł. Repozytorium scala je w jeden plik i stosuje przez Supabase CLI:
```bash
# Scal migracje ze wszystkich modułów (sortowanie po nazwie pliku)
bash .config/bash/merge-module-supabase-sql.sh migrations

# Zastosuj na lokalnym Supabase (wymaga CLI + uruchomionej instancji)
bash .config/bash/apply-module-migrations.sh

# Seedery
bash .config/bash/merge-module-supabase-sql.sh seeders
bash .config/bash/apply-module-sql.sh seeders
```

Wynik merge: `supabase/.temp/merged_migrations.sql`, `merged_seeders.sql`.

**Nazewnictwo:** `YYYYMMDDHHMMSS_nuc_modulename_opis.sql` — ta sama kolejność we wszystkich modułach.

**RLS:** Migracje zwykle włączają `row level security` i polityki. Bramka API używa service role; bezpośredni dostęp klienta z kluczem anon nadal respektuje polityki.

---

## Uwierzytelnianie

- **Rejestracja / logowanie:** `nuc_users` (`auth/`) używa `getSupabaseClient().auth` (email/hasło, sesja JWT).
- **Profil:** Po auth ładowany jest wiersz `user_profiles` (`getAndSetUser` w `nuc_users/auth`).
- **Wywołania API:** `apiRequest` wysyła cookies/nagłówki; serwer weryfikuje scope przez uid z Supabase Auth w handlerach.
- Sesje to **JWT Supabase Auth**.

---

## Klient (`nuc_client`)

```typescript
import { getSupabaseClient } from 'nuc_client'

const supabase = getSupabaseClient()
const { data } = await supabase.from('contacts').select('*')
```

`modules/nuc_api/supabase/client.ts` rozwiązuje URL/klucz z `runtimeConfig` Nuxt lub `process.env` w Next.

---

## Checklist lokalny

1. Utwórz projekt na [supabase.com](https://supabase.com) (lub `supabase start` lokalnie).
2. Ustaw `SUPABASE_URL`, `SUPABASE_KEY`, `SUPABASE_SERVICE_ROLE_KEY` w `.env`.
3. Uruchom migracje: `bash .config/bash/apply-module-migrations.sh`
4. Uruchom seedery: `bash .config/bash/apply-module-sql.sh seeders`
5. Uruchom frontend: `make nuxt` lub `make next`
6. Sprawdź bramkę: `GET /api/test` → `{ "message": "Hello World" }`

---

## Produkcja

- Nigdy nie commituj kluczy **service role**; używaj sekretów CI/hosta.
- Ustaw `NITRO_PRESET` (np. `cloudflare`) przy wdrożeniu Nuxt; bramka działa jako funkcje serverless.
- Dopasuj CORS i `NUXT_PUBLIC_APP_URL` do domeny produkcyjnej.
- Uruchom scalone migracje na produkcyjnej bazie przed deployem.

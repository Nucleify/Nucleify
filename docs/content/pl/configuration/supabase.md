# Supabase

Supabase to warstwa backendowa dla wszystkich aplikacji Nucleify. Dostarcza PostgreSQL, uwierzytelnianie, storage plików i Edge Functions. Zarówno `web/` (Nuxt), jak i `web-next/` (Next.js) łączą się z tą samą instancją Supabase.

## Przegląd architektury

```
┌──────────────┐     ┌──────────────────┐     ┌───────────────────────────┐
│  Aplikacja   │────▶│  Serwer Nitro    │────▶│  Supabase                 │
│  (Vue/React) │     │  Bramka API      │     │  ├── PostgreSQL           │
│              │     │  [...slug].ts    │     │  ├── Auth (GoTrue)        │
└──────────────┘     └──────────────────┘     │  ├── Storage              │
                                               │  └── Edge Functions       │
                                               └───────────────────────────┘
```

Aplikacje klienckie nigdy nie komunikują się z Supabase bezpośrednio dla mutacji danych. Zamiast tego wszystkie żądania API przechodzą przez trasę catch-all Nitro, która kieruje do handlerów specyficznych dla modułu. To trzyma klucz service role na serwerze i zapewnia spójną powierzchnię API.

Dla operacji tylko do odczytu po stronie klienta (stan auth, subskrypcje realtime) klient Supabase SDK używa klucza anon bezpośrednio.

## Wzorzec bramki API

### Przepływ żądania

```
Klient → /api/user-colors (PUT)
       → web/src/server/api/[...slug].ts       # catch-all Nitro
       → gateway_dispatch.ts                     # Parsuje slug, iteruje handlery
       → nuc_colors/supabase/api/handle.ts       # Handler modułu
       → Supabase PostgreSQL                     # Operacja bazy danych
       ← Odpowiedź JSON
```

### Trasa catch-all

Punkt wejścia to `web/src/server/api/[...slug].ts`. On:

1. Wywołuje `ensureServerEnv()` aby załadować zmienne `.env` na serwerze
2. Parsuje slug URL na segmenty ścieżki
3. Obsługuje wbudowane trasy (`/api/` → sprawdzenie gotowości, `/api/test` → hello world)
4. Tworzy klienta Supabase z **kluczem service role** (omija RLS)
5. Deleguje do `dispatchSupabaseApiGateway()` z kontekstem żądania

### Dispatch bramki

`shared_modules/nuc_api/supabase/api/gateway_dispatch.ts` utrzymuje rejestr wszystkich handlerów modułów:

```typescript
export const supabaseApiGatewayHandlers = [
  handleColorsApi,
  handleLanguagesApi,
] as const
```

Gdy przychodzi żądanie, bramka iteruje przez każdy handler. Handler albo przejmuje żądanie (zwraca `{ handled: true, ... }`), albo przekazuje (`apiNotHandled()`). Jeśli żaden handler nie pasuje, bramka zwraca 404.

### Obiekt ApiContext

Każdy handler otrzymuje `ApiContext` zawierający:

```typescript
type ApiContext = {
  event: H3Event          // Zdarzenie Nitro (nagłówki, body itd.)
  method: string          // Metoda HTTP (GET, POST, PUT, ...)
  segments: string[]      // Sparsowane segmenty URL
  supabase: SupabaseClient // Klient service-role
  ok: (data, extra?) => object  // Helper odpowiedzi
}
```

## Tworzenie handlerów API

Każdy moduł implementuje plik `handle.ts` w `shared_modules/nuc_*/supabase/api/`. Oto standardowy wzorzec:

```typescript
import { apiMethodNotAllowed, apiNotHandled, tryJwtUserTable } from 'nuc_api'
import type { ApiContext, ApiHandlerResult } from 'nuc_server'

export async function handleExampleApi(
  ctx: ApiContext
): Promise<ApiHandlerResult> {
  // Obsługuj tylko żądania zaczynające się od naszego prefiksu trasy
  if (ctx.segments[0] !== 'example') return apiNotHandled()

  // tryJwtUserTable: weryfikuje JWT, rozwiązuje userId, obsługuje GET/PUT
  const result = await tryJwtUserTable(ctx, {
    table: 'example_table',
    onPut: handleExamplePut,
  })

  return result ?? apiMethodNotAllowed()
}
```

Po utworzeniu handlera zarejestruj go w `gateway_dispatch.ts`:

```typescript
import { handleExampleApi } from '../../../nuc_example/supabase/api/handle'

export const supabaseApiGatewayHandlers = [
  handleColorsApi,
  handleLanguagesApi,
  handleExampleApi,  // Dodaj tutaj
] as const
```

### Helpery uwierzytelniania

- **`withGatewayUser(ctx, fn)`** — Wyciąga i weryfikuje JWT z nagłówka `Authorization` żądania. Wywołuje `fn(ctx, userId)` jeśli ważny, lub zwraca błąd auth.
- **`tryJwtUserTable(ctx, opts)`** — Helper wyższego poziomu łączący weryfikację JWT ze standardowymi operacjami CRUD na tabeli scoped do użytkownika. Automatycznie obsługuje GET (pobierz wiersze) i PUT/PATCH (przez callback `onPut`).

## Przepływ auth

Uwierzytelnianie używa Supabase Auth (GoTrue) przez `@supabase/supabase-js`:

1. **Rejestracja** — Klient wywołuje `supabase.auth.signUp({ email, password })` używając klucza anon
2. **Logowanie** — Klient wywołuje `supabase.auth.signInWithPassword({ email, password })`
3. **Sesja** — Supabase zwraca tokeny access + refresh; SDK zarządza odświeżaniem automatycznie
4. **Wywołania API** — Token dostępu jest wysyłany jako `Authorization: Bearer <token>` do bramki Nitro
5. **Weryfikacja serwera** — `withGatewayUser()` weryfikuje JWT względem Supabase i wyciąga ID użytkownika

Stan formularza auth zarządza `create_auth_form_state` w `shared_modules/nuc_api/`, który dostarcza typowane reaktywne pola formularza dla logowania i rejestracji.

## Konfiguracja lokalnego developmentu

### Wymagania

- Docker (Supabase uruchamia PostgreSQL, GoTrue i inne usługi w kontenerach)
- Supabase CLI (`npx supabase`)

### Uruchamianie Supabase

```bash
npx supabase start
```

To uruchamia pełny stack Supabase lokalnie. CLI wypisuje lokalny URL i klucze:

```
API URL:   http://127.0.0.1:54321
anon key:  eyJ...
service_role key: eyJ...
```

Skopiuj te wartości do pliku `.env`:

```env
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_KEY=eyJ...              # klucz anon
SUPABASE_SERVICE_ROLE_KEY=eyJ...  # klucz service_role
```

### Zatrzymywanie Supabase

```bash
npx supabase stop
```

## Migracje bazy danych

Migracje są w dwóch miejscach:

1. **Globalne** — `supabase/migrations/` (np. `20260430000000_initial_schema.sql`)
2. **Per moduł** — `shared_modules/nuc_*/supabase/migrations/` (np. `nuc_colors/supabase/migrations/20260430000002_user_colors.sql`)

### Stosowanie migracji

```bash
# Zastosuj wszystkie migracje modułów do lokalnego Supabase
pnpm supabase:migrations:apply:local

# Zastosuj do połączonego projektu zdalnego
pnpm supabase:migrations:apply:linked
```

### Pełna konfiguracja lokalna

Aby zastosować migracje, fabryki i seedery jednym razem:

```bash
pnpm supabase:setup:local
```

To uruchamia:

1. `supabase:migrations:apply:local` — Zmiany schematu
2. `supabase:factories:apply:local` — Dane fabryk/fixture
3. `supabase:seeders:apply:local` — Dane seed

### Skrypt merge

Migracje modułów są scalane do `supabase/migrations/` przez skrypt `.config/bash/merge-module-supabase-sql.sh`. Uruchom go przez:

```bash
pnpm supabase:merge-sql
```

### Pisanie migracji

Pliki migracji podążają za konwencją nazewnictwa `YYYYMMDDHHMMSS_description.sql`. Zawsze włącz RLS i dodaj polityki dla roli `authenticated`:

```sql
CREATE TABLE IF NOT EXISTS public.example_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.example_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own items"
  ON public.example_items
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

## Edge Functions

Edge Functions działają na Deno i są w `supabase/functions/`:

```
supabase/functions/
├── health/index.ts        # Endpoint health check
├── test/index.ts          # Endpoint testowy
├── contact-form/index.ts  # Handler formularza kontaktowego
└── terminal/index.ts      # Narzędzie terminala
```

Edge Functions specyficzne dla modułów są w odpowiednich katalogach modułów:

```
shared_modules/nuc_colors/supabase/functions/user-colors/index.ts
shared_modules/nuc_languages/supabase/functions/languages/index.ts
```

Edge Functions używają standardowej biblioteki Deno:

```typescript
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'

serve(() => {
  return new Response(
    JSON.stringify({ ok: true, service: 'nucleify-backend' }),
    { headers: { 'content-type': 'application/json' } }
  )
})
```

Bazowy URL Edge Functions jest konfigurowany przez zmienną środowiskową `SUPABASE_EDGE_BASE`, która domyślnie to `{SUPABASE_URL}/functions/v1`.

## Zmienne środowiskowe

Zobacz [Zmienne środowiskowe](/pl/docs/configuration/environment) po pełną referencję. Zmienne specyficzne dla Supabase to:

| Zmienna | Wymagana | Opis |
| --- | --- | --- |
| `SUPABASE_URL` | Tak | URL projektu (`http://127.0.0.1:54321` lokalnie) |
| `SUPABASE_KEY` | Tak | Klucz anon dla SDK po stronie klienta |
| `SUPABASE_SERVICE_ROLE_KEY` | Tak | Klucz service dla operacji serwerowych (omija RLS) |
| `SUPABASE_EDGE_BASE` | Nie | Bazowy URL Edge Functions (auto-derivowany z `SUPABASE_URL`) |

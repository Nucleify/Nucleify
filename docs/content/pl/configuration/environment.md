# Zmienne środowiskowe

Nucleify używa jednego pliku `.env` w root monorepo. Wszystkie pakiety — `web/`, `admin/`, `docs/`, `compiler/` — czytają z tego współdzielonego pliku.

## Tworzenie pliku .env

Uruchomienie `make run` automatycznie kopiuje plik przykładowy, jeśli `.env` nie istnieje:

```bash
make run
# → Created .env from web/.config/.env.example — fill in SUPABASE_* before using the API.
```

Możesz też skopiować ręcznie:

```bash
cp web/.config/.env.example .env
```

Plik przykładowy jest w `web/.config/.env.example`. Dodatkowe pliki przykładowe (`.env.ci.example`, `.env.test.example`) są dostępne w tym samym katalogu dla środowisk CI i testowych.

## Jak ładowany jest dotenv

Wbudowane wsparcie dotenv w Nuxt obsługuje większość ładowania, ale Nucleify ma też własny skrypt `load-env.ts`, który uruchamia się przed ewaluacją konfiguracji Nuxt:

```
web/.config/nuxt/load-env.ts
```

Ten skrypt rozwiązuje root monorepo i wywołuje `dotenv.config()` z poprawną ścieżką. Preferuje `.env` na poziomie monorepo; jeśli ten plik nie istnieje, wraca do `web/.env`.

Po stronie serwera (handlery API Nitro) `ensureServerEnv()` z `shared_modules/nuc_api/supabase/api/server_env.ts` ładuje następujące pliki w kolejności:

1. `.env`
2. `.env.local`
3. `.env.{NODE_ENV}` (np. `.env.development`)
4. `.env.{NODE_ENV}.local`

W trybie development późniejsze pliki nadpisują wcześniejsze wartości. W produkcji uzupełniane są tylko brakujące klucze.

## Referencja zmiennych

### Aplikacja

| Zmienna | Przykład | Opis |
| --- | --- | --- |
| `APP_NAME` | `Nucleify` | Wyświetlana nazwa aplikacji |
| `APP_ENV` | `local` | Środowisko: `local`, `production` lub `testing` |
| `APP_DEBUG` | `true` | Włącz output debug w development |
| `NUXT_PUBLIC_APP_URL` | `http://localhost:3000` | Publiczny URL aplikacji, używany w SSR i po stronie klienta |

### SSR i prerendering

| Zmienna | Przykład | Opis |
| --- | --- | --- |
| `SSR` | `true` | Włącz server-side rendering (`true` / `false`) |
| `NITRO_PRESET` | `cloudflare` | Preset wdrożenia Nitro (np. `cloudflare`, `node-server`) |
| `PRERENDER_ROUTES` | `/home,/dev,/login,...` | Trasy do prerenderowania w czasie buildu, rozdzielone przecinkami |
| `PRERENDER_CRAWL_LINKS` | `true` | Crawl linków ze stron prerenderowanych, aby odkryć więcej tras |
| `PRERENDER_IGNORE` | `/settings` | Trasy wykluczone z prerenderowania |
| `PRERENDER_LOCALES` | `en,pl,vn` | Prefiksy locale do prerenderowania |
| `DEV_TOOLS` | `true` | Włącz Nuxt DevTools w lokalnym development |

### Supabase

| Zmienna | Przykład | Opis |
| --- | --- | --- |
| `SUPABASE_URL` | `http://127.0.0.1:54321` | URL projektu Supabase (lokalny lub hostowany) |
| `SUPABASE_KEY` | _(klucz anon)_ | Klucz anon/public — bezpieczny po stronie klienta |
| `SUPABASE_SERVICE_ROLE_KEY` | _(klucz service)_ | Klucz service role — **tylko serwer**, omija RLS |
| `SUPABASE_EDGE_BASE` | `http://127.0.0.1:54321/functions/v1` | Bazowy URL Edge Functions |

### Submoduły i build

| Zmienna | Przykład | Opis |
| --- | --- | --- |
| `NUC_SUBMODULES_BRANCH` | `main` | Branch używany przez `prepare-submodules` |
| `NUC_SUBMODULES_CHECK` | `1` | Pomiń katalogi submodułów, które już istnieją |
| `NUC_ALLOWED_ORIGINS` | `https://nucleify.io` | Dozwolone originy CORS |
| `NUC_ALLOWED_ORIGINS_PATTERNS` | | Wzorce regex dla originów CORS |
| `NUC_CONVERT_DOCUMENTS_URL` | `https://convert-documents-nucleify.koyeb.app` | Zewnętrzny serwis konwersji dokumentów |

### Integracje zewnętrzne

| Zmienna | Opis |
| --- | --- |
| `CALENDLY_CLIENT_ID` | Calendly OAuth client ID |
| `CALENDLY_CLIENT_SECRET` | Calendly OAuth client secret |
| `CALENDLY_WEBHOOK_SIGNING_KEY` | Weryfikacja podpisu webhook Calendly |
| `CALENDLY_OAUTH_REDIRECT_URI` | URL callback OAuth dla Calendly |
| `CALENDLY_APP_REDIRECT_URL` | Przekierowanie po zakończeniu auth Calendly |
| `CALENDLY_WEBHOOK_URL` | Endpoint webhook Calendly |
| `GOOGLE_CALENDAR_CLIENT_ID` | Google Calendar OAuth client ID |
| `GOOGLE_CALENDAR_CLIENT_SECRET` | Google Calendar OAuth client secret |
| `GOOGLE_CALENDAR_OAUTH_REDIRECT_URI` | URL callback OAuth dla Google Calendar |
| `GOOGLE_CALENDAR_APP_REDIRECT_URL` | Przekierowanie po auth Google Calendar |

### Email

| Zmienna | Przykład | Opis |
| --- | --- | --- |
| `AUTH_EMAIL_RESEND_KEY` | | Klucz API Resend dla emaili transakcyjnych |
| `AUTH_EMAIL_FROM` | `business@nucleify.io` | Adres nadawcy dla emaili auth |
| `CONTACT_FORM_EMAIL` | `business@nucleify.io` | Odbiorca zgłoszeń z formularza kontaktowego |

## Development vs produkcja

### Lokalny development

```env
APP_ENV=local
APP_DEBUG=true
SSR=true
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_KEY=eyJ...       # z `npx supabase start`
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NUXT_PUBLIC_APP_URL=http://localhost:3000
DEV_TOOLS=true
```

Gdy `APP_ENV=local`, Nuxt rejestruje dodatkowe moduły tylko dla dev (`@nuxt/test-utils/module`, `nuxt-link-checker`) i wyłącza reguły tras produkcyjnych jak cache SWR.

### Produkcja

```env
APP_ENV=production
APP_DEBUG=false
SSR=true
NITRO_PRESET=cloudflare
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NUXT_PUBLIC_APP_URL=https://nucleify.io
```

W produkcji reguły tras włączają cache SWR i prerendering dla wszystkich ścieżek locale. Output konsoli jest usuwany przez Terser podczas buildu Vite. DevTools i moduły debug są wykluczone.

## Runtime config

Zmienne środowiskowe są udostępniane aplikacji Nuxt przez `runtimeConfig` (zdefiniowany w `web/.config/nuxt/runtime.ts`):

- **Prywatne** (tylko serwer): `supabaseServiceRoleKey`, `authEmailResendKey`, `authEmailFrom`, `contactFormRecipient`
- **Publiczne** (klient + serwer): `appUrl`, `apiUrl`, `supabaseEdgeBase`, `supabaseUrl`, `supabaseKey`, `appEnv`

Uzyskaj do nich dostęp w composables przez `useRuntimeConfig()`:

```typescript
const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl  // '/api'
```

Po stronie serwera klucze prywatne są też dostępne:

```typescript
const config = useRuntimeConfig(event)
const serviceKey = config.supabaseServiceRoleKey
```

# Zmienne środowiskowe

Nucleify odczytuje konfigurację z `.env` w katalogu głównym repozytorium. Użyj `.config/.env.nuxt.example` lub `.config/.env.next.example` jako szablonu (`make nuxt` / `make next` kopiuje go automatycznie).

Konfiguracja Nuxt znajduje się w `.config/nuxt/` i jest scalana w `.config/nuxt.config.ts`.

## Wymagane (Supabase)

| Zmienna | Opis | Przykład |
|---------|------|----------|
| `SUPABASE_URL` | URL projektu Supabase | `https://xxx.supabase.co` |
| `SUPABASE_KEY` | Klucz anon/public (bezpieczny w przeglądarce) | `eyJhbG…` |
| `SUPABASE_SERVICE_ROLE_KEY` | Klucz service role (tylko serwer) | `eyJhbG…` |

Nigdy nie udostępniaj `SUPABASE_SERVICE_ROLE_KEY` w bundle klienta ani publicznych repozytoriach.

## Aplikacja

| Zmienna | Opis | Domyślnie |
|---------|------|-----------|
| `APP_NAME` | Nazwa aplikacji | `Nucleify` |
| `APP_ENV` | Środowisko | `local` |
| `APP_DEBUG` | Szczegółowe błędy | `true` |
| `APP_FRONTEND` | Aktywny stack | `nuxt` lub `next` |
| `NUXT_PUBLIC_APP_URL` | Publiczny URL (Nuxt) | `http://localhost:3000` |

## SSR i prerendering (Nuxt)

```env
SSR=true
PRERENDER_ROUTES=/home,/dev,/login,/docs
PRERENDER_CRAWL_LINKS=true
PRERENDER_IGNORE=/settings
PRERENDER_LOCALES=en,pl,vn
NITRO_PRESET=cloudflare
```

| Zmienna | Opis |
|---------|------|
| `SSR` | Włącz server-side rendering |
| `PRERENDER_ROUTES` | Trasy do prerenderowania (przecinek) |
| `PRERENDER_CRAWL_LINKS` | Odkrywanie linków podczas prerender |
| `PRERENDER_IGNORE` | Trasy do pominięcia |
| `NITRO_PRESET` | Cel wdrożenia Nitro |

## Opcjonalne

| Zmienna | Opis |
|---------|------|
| `SUPABASE_EDGE_BASE` | Bazowy URL Edge Functions |
| `NUC_CONVERT_DOCUMENTS_URL` | Zewnętrzny serwis konwersji dokumentów |
| `DEV_TOOLS` | Włącz Nuxt devtools |

## Przykład `.env` (Nuxt)

```env
APP_NAME=Nucleify
APP_ENV=local
APP_DEBUG=true
NUXT_PUBLIC_APP_URL=http://localhost:3000

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

APP_FRONTEND=nuxt
SSR=true
NITRO_PRESET=cloudflare
```

Zobacz [konfigurację Supabase](/pl/docs/configuration/supabase), aby dowiedzieć się, jak te klucze są używane w bramce API i kliencie.

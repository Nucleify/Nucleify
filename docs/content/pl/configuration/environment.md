# Zmienne środowiskowe

Nucleify czyta zmienne środowiskowe z jednego pliku `.env` w **root repozytorium**. `make run` tworzy go z `web/.config/.env.example`. Nuxt ładuje zmienne przez `web/.config/nuxt/load-env.ts` przed ewaluacją configu.

---

## Setup

```bash
make run
# edytuj .env w root repozytorium
```

Nigdy nie commituj `.env`. Szablony są w `web/.config/`:

| Plik | Cel |
|------|-----|
| `.env.example` | Lokalny development (kopiowany przez `make run`) |
| `.env.ci.example` | Referencja CI |
| `.env.test.example` | Referencja środowiska testowego |

---

## Aplikacja

| Zmienna | Przykład | Opis |
|---------|----------|------|
| `APP_NAME` | `Nucleify` | Wyświetlana nazwa aplikacji |
| `APP_ENV` | `local` | `local` / `production` / `testing` |
| `APP_DEBUG` | `true` | Flaga debug |
| `NUXT_PUBLIC_APP_URL` | `http://localhost:3000` | Publiczny URL aplikacji (też w runtime config) |

---

## Supabase

| Zmienna | Wymagane | Opis |
|---------|----------|------|
| `SUPABASE_URL` | Tak (dla tras API) | URL projektu |
| `SUPABASE_KEY` | Klient | Klucz anon/public - bezpieczny w przeglądarce przez runtime config |
| `SUPABASE_SERVICE_ROLE_KEY` | Serwer | Service role - **nigdy** nie eksponuj klientowi |
| `SUPABASE_EDGE_BASE` | Opcjonalnie | Bazowy URL Edge Functions (domyślnie z `SUPABASE_URL`) |

Bramka Nitro w `web/src/server/api/[...slug].ts` czyta `SUPABASE_URL` i `SUPABASE_SERVICE_ROLE_KEY` z runtime config Nitro. Brak wartości → HTTP 503 dla tras modułów; smoke `/api` i `/api/test` nadal odpowiadają.

Mapowanie runtime (`web/.config/nuxt/runtime.ts`):

```typescript
export const runtimeConfig = {
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  public: {
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseKey: process.env.SUPABASE_KEY || '',
    supabaseEdgeBase: process.env.SUPABASE_EDGE_BASE || `${process.env.SUPABASE_URL || ''}/functions/v1`,
    appUrl: process.env.NUXT_PUBLIC_APP_URL || 'https://nucleify.io',
    apiUrl: process.env.NUXT_PUBLIC_API_URL || '/api',
    appEnv: process.env.APP_ENV || 'production',
  },
}
```

---

## Nuxt / Nitro

| Zmienna | Przykład | Opis |
|---------|----------|------|
| `SSR` | `true` | Server-side rendering |
| `NITRO_PRESET` | `cloudflare` | Preset wdrożenia Nitro |
| `PRERENDER_ROUTES` | `/home,/investor,/404` | Trasy statyczne, przecinkami (docs na docs.nucleify.io) |
| `PRERENDER_CRAWL_LINKS` | `true` | Podążaj za linkami przy prerender |
| `PRERENDER_IGNORE` | `/settings` | Trasy do pominięcia |
| `PRERENDER_LOCALES` | `en,pl,vn` | Locale w prerender |
| `DEV_TOOLS` | | Przełącznik Nuxt DevTools |

---

## Specyficzne dla Nucleify

| Zmienna | Przykład | Opis |
|---------|----------|------|
| `NUC_SUBMODULES_BRANCH` | `main` | Branch dla `prepare:submodules` |
| `NUC_SUBMODULES_CHECK` | `1` | Pomiń istniejące katalogi przy prepare submodules |
| `NUC_ALLOWED_ORIGINS` | | Allowlista CORS |
| `NUC_ALLOWED_ORIGINS_PATTERNS` | | Wzorce allowlisty CORS |
| `NUC_CONVERT_DOCUMENTS_URL` | | Zewnętrzna usługa konwersji dokumentów |

---

## Integracje (opcjonalne)

Przykładowe `.env` zawiera placeholdery Calendly i Google Calendar OAuth. Uzupełnij tylko, gdy włączysz te integracje we wdrożeniu.

| Grupa | Zmienne |
|-------|---------|
| Calendly | `CALENDLY_CLIENT_ID`, `CALENDLY_CLIENT_SECRET`, `CALENDLY_WEBHOOK_SIGNING_KEY`, … |
| Google Calendar | `GOOGLE_CALENDAR_CLIENT_ID`, `GOOGLE_CALENDAR_CLIENT_SECRET`, … |

---

## Shelle produktu (Next / Solid / Svelte)

Wygenerowane shelle Next czytają zmienne Supabase w obu konwencjach nazewnictwa, gdzie to wspierane:

- `NEXT_PUBLIC_SUPABASE_URL` lub `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (tylko serwer)

Shelle produktu Solid i Svelte (`web-solid/`, `web-svelte/`, …) używają tych samych nazw `SUPABASE_*` z roota przez Vite `import.meta.env`. Trzymaj jedno root `.env` - Nuxt i wszystkie ścieżki codegen konwersji rozwiązują je z root monorepo.

---

## Lokalny workflow Supabase

Przy Supabase CLI zlinkowanym do projektu:

```bash
pnpm supabase:migrations:apply:local
pnpm supabase:seeders:apply:local
# lub:
pnpm supabase:setup:local
```

Szczegóły merge migracji: [Supabase](/pl/docs/configuration/supabase).

---

## Checklist bezpieczeństwa

1. **Nigdy** nie commituj `SUPABASE_SERVICE_ROLE_KEY`
2. Eksponuj klientowi tylko `SUPABASE_KEY` (anon) przez `runtimeConfig.public`
3. Uprzywilejowane operacje DB idą przez handlery bramki `/api/*`
4. Przejrzyj `NUC_ALLOWED_ORIGINS*` przed deployem produkcyjnym

---

## Powiązana dokumentacja

- [Instalacja](/pl/docs/getting-started/installation) - pierwsze utworzenie `.env`
- [Web & Admin](/pl/docs/configuration/web) - runtime config i rozdzielona konfiguracja Nuxt
- [Supabase](/pl/docs/configuration/supabase) - baza i migracje

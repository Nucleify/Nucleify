# Web & Admin

`web/` i `admin/` to aplikacje Nuxt 4 (kanoniczne źródło). Konfiguracja jest rozdzielona między `web/.config/nuxt/` (i odpowiednik w `admin/`) i składana przez cienki `nuxt.config.ts` w root każdego pakietu.

---

## Kompozycja konfiguracji

```txt
web/
├── nuxt.config.ts          # importuje i rozprzestrzenia moduły konfiguracji
└── .config/nuxt/
    ├── load-env.ts         # ładuje root .env monorepo przed ewaluacją config
    ├── app.ts              # head, meta, base URL
    ├── structure.ts        # aliasy, srcDir, pluginy, importy
    ├── runtime.ts          # runtimeConfig (klucze publiczne + prywatne)
    ├── modules.ts          # moduły Nuxt (@nuxtjs/i18n itd.)
    ├── locales.ts          # lista locale i konfiguracja i18n
    ├── nitro.ts            # preset serwera, handlery
    ├── vite.ts             # pluginy Vite, SCSS, opcje build
    ├── route-rules.ts      # SWR, prerender, cache per trasa
    ├── performance.ts      # fonty, optymalizacja obrazów
    ├── dev.ts              # ustawienia tylko dla dev
    └── hooks.ts            # hooki cyklu życia Nuxt
```

`admin/` podąża za tym samym wzorcem z własnym katalogiem `.config/nuxt/`.

---

## Układ źródeł

Obie aplikacje używają `srcDir: 'src'` (nie folderu `nuxt/`):

```txt
web/src/
├── pages/
│   ├── [lang]/             # cienkie wrappery tras i18n
│   └── home/               # sekcje landingowe
├── plugins/
│   ├── modules.ts          # registerNuc* dla modułów współdzielonych
│   └── nucleify-ui.client.ts
├── composables/            # auto-importowane
├── layouts/
├── assets/styles/          # wpis SCSS (importuje style shared_modules)
├── nucleify.ts             # re-eksportuje powierzchnię współdzieloną + helpery app
└── server/
    └── api/
        └── [...slug].ts    # catch-all Nitro → gateway_dispatch
```

Prymitywy UI to custom elements Lit (`nui-*`) z `nucleify-ui` / `portable/nui/`. Kompozycja landingu jest w `web/src/pages/` — nie ma drzewa komponentów `ad-*`.

---

## Aliasy

Zdefiniowane w `web/.config/nuxt/structure.ts`:

| Alias | Rozwiązuje się do |
|-------|-------------------|
| `nucleify` | `~/nucleify` (barrel aplikacji) |
| `modules` | `../shared_modules` |
| `portable/nui` | `../portable/nui` |
| `nuc_client` | `~/nuc_client` |
| `nuc_server` | `~/server/nuc_server` |
| `#nuc-compiler/runtime` | `../compiler/runtime/index.ts` |

Importuj moduły współdzielone po nazwie pakietu (np. `import { apiRequest } from 'nuc_api'`) — alias `modules` to umożliwia.

---

## Rejestracja modułów

Moduły współdzielone rejestrują się jako pluginy Vue w `web/src/plugins/modules.ts`:

```typescript
import { defineNuxtPlugin } from 'nuxt/app'
import { registerNucColors } from '../../../shared_modules/nuc_colors/nuc_colors'
import { registerNucDarkMode } from '../../../shared_modules/nuc_dark_mode/nuc_dark_mode'
import { registerNucGlobals } from '../../../shared_modules/nuc_globals/nuc_globals'
import { registerNucLanguages } from '../../../shared_modules/nuc_languages/nuc_languages'

export default defineNuxtPlugin({
  name: 'modules-registration',
  enforce: 'pre',
  setup(nuxtApp) {
    registerNucGlobals(nuxtApp.vueApp)
    registerNucColors(nuxtApp.vueApp)
    registerNucDarkMode(nuxtApp.vueApp)
    registerNucLanguages(nuxtApp)
  },
})
```

`registerNucLanguages` otrzymuje pełny `nuxtApp`, ponieważ podłącza się do zdarzeń i18n Nuxt.

---

## Runtime config

`web/.config/nuxt/runtime.ts` udostępnia zmienne środowiskowe aplikacji:

**Prywatne** (tylko serwer):

- `supabaseServiceRoleKey`
- `authEmailResendKey`
- `authEmailFrom`
- `contactFormRecipient`

**Publiczne** (klient + serwer):

- `appUrl`, `apiUrl`, `supabaseUrl`, `supabaseKey`, `supabaseEdgeBase`, `appEnv`

```typescript
const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl  // '/api'
```

Zobacz [Zmienne środowiskowe](/pl/docs/configuration/environment) po pełną referencję zmiennych.

---

## Bramka API

Cały ruch API serwera przechodzi przez jeden catch-all Nitro:

```
web/src/server/api/[...slug].ts
  → dispatchSupabaseApiGateway()
  → shared_modules/nuc_*/supabase/api/handle.ts
```

Kod klienta wywołuje `/api/...` — nigdy Supabase bezpośrednio z przeglądarki dla operacji uprzywilejowanych.

---

## i18n

Locale są skonfigurowane w `web/.config/nuxt/locales.ts`. Wrappery tras pod `src/pages/[lang]/` delegują do stron funkcjonalnych. Domyślne przekierowanie locale kieruje `/` → `/en/home`.

Prefiksy locale do prerenderowania kontroluje `PRERENDER_LOCALES` w `.env`.

---

## System UI

- **Komponenty web Lit** z `nucleify-ui` (`nui-button`, `nui-icon`, …)
- **Design tokeny** i rejestracja w `portable/nui/`
- Rejestrowane przez plugin `nucleify-ui.client.ts`
- Autorstwo przenośne (`*.nuc.tsx`) mapuje `nui-*` na cele emisji

---

## Migracja shelli produktu

Wygenerowane aplikacje: `web-next/`, `admin-next/`, `web-solid/`, `admin-solid/`, `web-svelte/`, `admin-svelte/` (lub własna nazwa `--out`):

```bash
make web TARGET=next      # konwersja + start dev Next
make web TARGET=solid     # konwersja + start dev Solid
make web TARGET=svelte    # konwersja + start dev Svelte
make admin TARGET=next    # admin → next|solid|svelte analogicznie
make admin TARGET=solid
make admin TARGET=svelte

# Zewnętrzne drzewo Nuxt-like (z roota monorepo):
pnpm compiler -- convert web --target=next --path=/path/to/app --out=my-next --force
pnpm compiler -- convert web --target=solid --path=/path/to/app --out=my-solid --force
pnpm compiler -- convert web --target=svelte --path=/path/to/app --out=my-svelte --force
```

Rozwijaj w Nuxt (`web/`, `admin/`), konwertuj gdy potrzebujesz innego frameworka. Konwersja Astro `docs/` nie jest jeszcze dostępna. Zobacz [Kompilator](/pl/docs/core-concepts/compiler).

---

## Nadpisania

Dostosowania per wdrożenie trafiają do `overrides/web/` lub `overrides/admin/`, odzwierciedlając oryginalną ścieżkę pliku. Zobacz [Nadpisywanie](/pl/docs/core-concepts/overriding).

---

## Komendy dev

| Komenda | Akcja |
|---------|-------|
| `make web` | Uruchom serwer dev Nuxt (`web/`) |
| `make admin` | Uruchom dev admin Nuxt |
| `pnpm --filter @nucleify/web dev` | Bezpośredni filtr pnpm |
| `pnpm --filter @nucleify/admin dev` | Bezpośredni filtr admin |

Domyślny port: `3000`. Środowisko ładowane z root `.env` monorepo przez `load-env.ts`.

---

## Powiązana dokumentacja

- [Zmienne środowiskowe](/pl/docs/configuration/environment) — zmienne `.env`
- [Supabase](/pl/docs/configuration/supabase) — backend i handlery API
- [Moduły](/pl/docs/core-concepts/modules) — struktura modułów współdzielonych

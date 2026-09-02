# Moduły

Nucleify dostarcza sześć modułów funkcjonalnych w `shared_modules/`. Każdy moduł to samodzielny pakiet domenowy z narzędziami frontendowymi, opcjonalnymi handlerami API Supabase, migracjami, typami i testami — konsumowany przez `web/`, `admin/` i generowane powłoki Next.

Nie ma katalogu `modules/` w root. Aplikacje importują przez ścieżki względne lub alias Nuxt `modules` → `shared_modules/`.

---

## Sześć modułów

| Moduł | Domena | Kluczowe ścieżki |
|-------|--------|------------------|
| `nuc_api` | Klient API, dispatch gateway, formularze auth, requesty encji, toasty | `supabase/api/gateway_dispatch.ts`, `utils/api_request.ts` |
| `nuc_colors` | System motywów/kolorów, zmienne SCSS, utils kolorów | `styles/`, `supabase/api/handle.ts` |
| `nuc_dark_mode` | Preferencja trybu ciemnego (load, persist, apply) | `utils/use_dark_mode.ts`, `nuc_dark_mode.ts` |
| `nuc_globals` | Media queries, helpery obrazów, globalne style, wspólne typy | `media/`, `styles/`, `nuc_globals.ts` |
| `nuc_languages` | i18n, komunikaty locale, API tłumaczeń | `plugins/nuc_translations.ts`, `supabase/api/handle.ts` |
| `nuc_stores` | Helpery Pinia/Zustand, utils cookie/localStorage/session | `pinia/`, `zustand/`, `cookie/` |

Modułów **nie ma** w monorepo: `nuc_users`, `nuc_auth` — flow auth żyje w `nuc_api`.

---

## Anatomia modułu

Każdy katalog `nuc_*` ma spójny układ:

```txt
shared_modules/nuc_example/
├── config.json              # name, version, category, enabled
├── nuc_example.ts           # plugin Vue (registerNucExample)
├── index.ts                 # barrel export Vue
├── index.react.ts           # barrel export React (gdy potrzebny)
├── _index.scss              # opcjonalne globalne style modułu
├── README.md
├── constants/
├── types/
│   ├── interfaces.ts
│   ├── interfaces.react.ts  # gdy typy React się różnią
│   └── variables.ts
├── utils/                   # composables, hooki, funkcje czyste
├── components/              # opcjonalne UI wielokrotnego użytku
├── supabase/
│   ├── api/
│   │   ├── handle.ts        # wejście gateway (handleExampleApi)
│   │   └── *_handlers.ts    # tabele tras
│   ├── migrations/
│   ├── factories/
│   └── seeders/
└── vitests/
```

---

## Rejestracja w Nuxt

`web/src/plugins/modules.ts` rejestruje cztery moduły przy starcie aplikacji:

```typescript
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

`nuc_api` i `nuc_stores` są importowane na żądanie — bez globalnego pluginu.

Tłumaczenia ładują się też przez ścieżkę pluginu Nuxt w konfiguracji:

```typescript
// web/.config/nuxt/structure.ts
plugins: [
  resolve(process.cwd(), '../shared_modules/nuc_languages/plugins/nuc_translations.ts'),
],
```

---

## Zasady importów

**Wewnątrz modułu** — tylko importy względne. Nigdy z `web/`, `admin/` ani `docs/`.

**Z aplikacji** — alias lub ścieżka względna:

```typescript
// przez alias (Nuxt)
import { useDarkMode } from 'modules/nuc_dark_mode/utils/use_dark_mode'

// jawna względna (też OK)
import { apiRequest } from '../../../shared_modules/nuc_api/utils/api_request'
```

**Publiczne API** — eksport przez `index.ts` i root barrel `shared_modules/index.ts`. Nie importuj `from 'nucleify'` w modułach (zależność cykliczna).

---

## Integracja z bramką API

Handlery modułów eksportują async `handle*Api(ctx)`. Zarejestruj w rejestrze gateway:

```typescript
// shared_modules/nuc_api/supabase/api/gateway_dispatch.ts
export const supabaseApiGatewayHandlers = [
  handleColorsApi,
  handleLanguagesApi,
] as const
```

Punkt wejścia Nitro:

```txt
web/src/server/api/[...slug].ts
  → parseApiSlug()
  → dispatchSupabaseApiGateway(ctx)
  → pierwszy handler gdzie result.handled === true
```

### Wzorzec handlera

```typescript
import { apiMethodNotAllowed, apiNotHandled, withGatewayUser } from 'nuc_api'
import type { ApiContext, ApiHandlerResult } from 'nuc_server'

export async function handleExampleApi(ctx: ApiContext): Promise<ApiHandlerResult> {
  if (ctx.segments[0] !== 'example') return apiNotHandled()
  return withGatewayUser(ctx, async (gatewayCtx, userId) => {
    // dispatch tablicy tras …
    return apiMethodNotAllowed()
  })
}
```

Kod klienta woła `/api/example/...` przez helpery request `nuc_api` — nie service keys Supabase w przeglądarce.

---

## Supabase per moduł

Każdy moduł może mieć własne artefakty SQL:

| Katalog | Cel |
|---------|-----|
| `supabase/migrations/` | Zmiany schematu |
| `supabase/factories/` | SQL factory test/dev |
| `supabase/seeders/` | Dane seed |

Lokalnie:

```bash
pnpm supabase:migrations:apply:local
pnpm supabase:seeders:apply:local
# lub razem:
pnpm supabase:setup:local
```

Skrypty scalają SQL modułów przez `.config/bash/merge-module-supabase-sql.sh`.

---

## Warianty React

Moduły wspierające Tryb B eksponują odpowiedniki `.react.ts`:

- `index.react.ts` — barrel React
- `utils/use_*.react.ts` — hooki React odzwierciedlające composables Vue
- `types/interfaces.react.ts` — typy React gdy potrzebne

Kompilator i convert produktu używają ich przy emisji powłok Next.

---

## Tworzenie nowego modułu

1. Skopiuj strukturę z istniejącego modułu `nuc_*`
2. Dodaj metadane `config.json`
3. Zaimplementuj `nuc_example.ts` z `registerNucExample`
4. Eksportuj publiczne API z `index.ts`
5. Dodaj do `shared_modules/index.ts` jeśli potrzebne globalnie
6. Zarejestruj plugin w `web/src/plugins/modules.ts` jeśli wymaga setupu app-wide
7. Dodaj handler gateway w `gateway_dispatch.ts` jeśli eksponuje trasy API
8. Dodaj `vitests/` i uruchom `pnpm test:shared`

Zob. [Feature-Sliced Design](/pl/docs/core-concepts/feature-sliced-design) dla uzasadnienia architektonicznego.

---

## Powiązane docs

- [Feature-Sliced Design](/pl/docs/core-concepts/feature-sliced-design)
- [Supabase](/pl/docs/configuration/supabase)
- [Nadpisywanie](/pl/docs/core-concepts/overriding) — patch modułów bez edycji upstream

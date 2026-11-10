# Wprowadzenie

## Zbuduj raz. Przenieś na dowolny framework.

**Tak - możesz zmigrować dowolną istniejącą aplikację Next, Nuxt, Vue, React albo inny wspierany stack takim, jaki jest.** Konwersja produktu (`nuc emit convert`) bierze frameworkowy projekt, który już masz. **Nie** ma bramki w postaci wcześniejszego refaktoru do `shared_modules`, **nie** trzeba przepisywać na `*.nuc.tsx`, **nie** trzeba tokenów Nucleify ani przepisywania aplikacji pod IR. Przenośne `*.nuc.tsx` to tylko opcjonalne współdzielone UI prezentacyjne - nigdy warunek migracji.

**Nucleify** migruje istniejące aplikacje między frameworkami. Zainstaluj [`@nucleify/cli`](https://cli.nucleify.io) i uruchom `nuc emit` (interactive shell) na projekcie, który już masz - w tym Next → Nuxt i Nuxt → Next. Opcjonalnie: dołącz do jądra tego monorepo (`shared_modules`, Nuxt `web/` / `admin/`) po convert; przenośne `*.nuc.tsx` jest tylko dla współdzielonego UI prezentacyjnego.

**Frameworki:** Vue · React · Nuxt · Next · Astro · Svelte · Solid - to nie jest produkt „tylko React/Next” ani „tylko Vue/Nuxt”.

> Zostaw produkt. Migruj framework.

---

## Czym jest Nucleify?

Nucleify to **workspace pnpm**, który łączy wszystko, czego potrzebuje nowoczesny produkt:

| Pakiet | Ścieżka | Rola |
|--------|---------|------|
| `@nucleify/web` | `web/` | Aplikacja landingowa Nuxt 4 (kanoniczna) |
| `@nucleify/admin` | `admin/` | Panel administracyjny Nuxt 4 |
| `@nucleify/docs` | `docs/` | Strona dokumentacji Astro 5 |
| `@nucleify/compiler` | `compiler/` | Przenośny UI IR + konwersja produktu |
| `@nucleify/cli` | publikowany | Instalowalne CLI `nuc emit` ([cli.nucleify.io](https://cli.nucleify.io)) |
| `@nucleify/shared-modules` | `shared_modules/` | Sześć eksportowanych modułów funkcjonalnych |

Katalogi wspierające:

- `portable/nui/` - design tokeny i rejestracja Lit `nui-*`
- `overrides/` - nadpisania plików per pakiet (`overrides/{web,admin,docs,shared_modules}/`)
- `supabase/` - konfiguracja DB, migracje, edge functions
- `.config/` - Biome, Vitest, skrypty bash, shim Make (`.config/bin/make`)

---

## Kanoniczny Nuxt i wygenerowane hosty

| Rodzaj | Stack | Komenda | Wynik |
|--------|-------|---------|-------|
| **Kanoniczny** (domyślny) | Nuxt 4 + Vue 3.5 | `make web` | `web/` |
| **Skonwertowany** (generowany) | Next / Solid / Svelte / Astro | `make web --target=next` · `-t=solid` · … | wygenerowane drzewo (zob. [Kompilator](/pl/docs/core-concepts/compiler)) |
| **Demo emit** | Vue · React · Nuxt · Next · Solid · Svelte · Astro | `make vue` · `react` · `nuxt` · `next` · `solid` · `svelte` · `astro` | `{framework}/demo` |

**Kanoniczny Nuxt** to codzienna praca w tym monorepo. **Konwersja produktu** bierze to drzewo **albo dowolną zewnętrzną aplikację frameworkową** przez `--path` / `--git` takim, jakie jest, i emituje inny host - **bez** przepisywania na `*.nuc.tsx` i **bez** wcześniejszego refaktoru do `shared_modules`. Demo emisji przenośnej to opcjonalne przykłady współdzielonego UI. Witryna docs zostaje w śledzonym `docs/`; `web-astro/` to emit produktu, nie ta witryna.

W tym monorepo aplikacje mogą współdzielić `shared_modules/`, Supabase i design tokeny - to korzyść jądra, nie warunek migracji zewnętrznej aplikacji.

---

## Kompilator

Kompilator (`@nucleify/compiler`) to rdzeń migracji. Działa na dwóch poziomach - **najpierw konwersja produktu** dla istniejących aplikacji, potem opcjonalny emit przenośny dla współdzielonego UI. Na co dzień zwykle wołasz go przez **`nuc emit`** ([CLI](/pl/docs/core-concepts/cli)) albo Make.

### 1. Konwersja produktu (istniejące aplikacje takim, jakie są)

**Tak - migrujesz aplikację, którą już masz.** Konwertuj całą aplikację produktu - albo zewnętrzne drzewo Next / Nuxt / Vue / React / inny wspierany stack przez `--path` / `--git` - na inny host. Wrzucasz projekt jako źródło frameworka. **Nie** przepisujesz na `*.nuc.tsx`, **nie** dzielisz domeny do `shared_modules` i **nie** adopujesz tokenów Nucleify przed konwersją.

```bash
export PATH="$PWD/.config/bin:$PATH"

make web --target=next    # → web-next/
make web -t=solid         # → web-solid/
make web --target=svelte  # → web-svelte/
make web --target=astro   # → web-astro/

# Nuxt web/ tego monorepo → web-next/ (shell nucleify; nie Twój --path):
nuc emit convert web --target=next

# Twój produkt takim, jaki jest (z roota monorepo Nucleify):
nuc emit convert web --target=next --path=/path/to/your-app --out=my-next --force
```

Ta sama powierzchnia produktu, inny host frameworka. Output generuje kompilator - nie wchodzi w kanoniczny układ monorepo. Szczegóły: [Kompilator](/pl/docs/core-concepts/compiler).

### 2. Przenośne komponenty (`*.nuc.tsx`) - opcjonalnie

Twórz **prezentacyjne** UI niezależne od frameworka z `#nuc-compiler/runtime`, gdy chcesz jedno źródło emitujące sąsiednie `.vue`, React `.tsx`, Solid `.tsx`, Svelte `.svelte` oraz `.css`. To opcjonalne autorstwo współdzielonego UI - **nie** warunek przed konwersją produktu.

```tsx
import { component, state, handler } from '#nuc-compiler/runtime'

export default component({
  name: 'Counter',
  props: { label: { type: 'string', default: 'Count' } },
  setup(props) {
    const count = state(0)
    const onInc = handler(() => count.set(count.value + 1))
    return () => (
      <button type="button" onClick={onInc}>
        {props.label}: {count.value}
      </button>
    )
  },
})
```

Zobacz [Kompilator](/pl/docs/core-concepts/compiler) i `compiler/PORTABLE.md` po pełne reguły autorskie.

---

## Współdzielone moduły

Sześć eksportowanych modułów funkcjonalnych w `shared_modules/`:

| Moduł | Domena |
|-------|--------|
| `nuc_api` | Klient API, dispatch bramki, formularze auth, żądania encji |
| `nuc_colors` | System motywów/kolorów, zmienne SCSS |
| `nuc_dark_mode` | Preferencja trybu ciemnego |
| `nuc_globals` | Media queries, style globalne, współdzielone typy |
| `nuc_languages` | i18n, komunikaty locale, API tłumaczeń |
| `nuc_stores` | Pomocniki Pinia/Zustand, utils cookie/localStorage |

Aplikacje importują moduły bezpośrednio lub przez alias `modules` (skonfigurowany w `web/.config/nuxt/structure.ts`). Rejestracja dla aplikacji web odbywa się w `web/src/plugins/modules.ts`.

Więcej: [Moduły](/pl/docs/core-concepts/modules) · [Feature-Sliced Design](/pl/docs/core-concepts/feature-sliced-design)

---

## Bramka API

Cały ruch API serwera przechodzi przez jeden catch-all Nitro:

```
web/src/server/api/[...slug].ts
  → dispatchSupabaseApiGateway()
  → shared_modules/nuc_*/supabase/api/handle.ts
```

Handlery modułów rejestrują się w `shared_modules/nuc_api/supabase/api/gateway_dispatch.ts`. Kod klienta wywołuje `/api/...` - nigdy Supabase bezpośrednio z przeglądarki dla operacji uprzywilejowanych.

---

## System designu

Prymitywy UI to **komponenty web Lit** z `nucleify-ui` (`nui-button`, `nui-icon`, …). Design tokeny i rejestracja są w `portable/nui/`. Każdy host konsumuje te same custom elements; kompilator mapuje tagi `nui-*` w `*.nuc.tsx` na cele emisji (Vue, React, Solid, Svelte i powiązane hosty).

---

## Układ monorepo

```txt
nucleify/
├── web/                    # @nucleify/web - landing Nuxt 4 (kanoniczny)
│   ├── nuxt.config.ts
│   ├── .config/nuxt/       # rozdzielona konfiguracja Nuxt
│   └── src/
│       ├── pages/          # cienkie wrappery route (home, investor, …)
│       ├── sections/       # sekcje marketingowe (hero, pillars, …)
│       ├── templates/      # wspólne UI (holo cube, module board, …)
│       ├── plugins/        # modules.ts, nucleify-ui.client.ts
│       ├── composables/
│       ├── layouts/
│       └── server/api/     # bramka API Nitro [...slug].ts
├── admin/                  # @nucleify/admin - admin Nuxt 4
├── docs/                   # @nucleify/docs - dokumentacja Astro 5
├── compiler/               # @nucleify/compiler - IR + konwersja produktu
├── shared_modules/         # sześć eksportowanych modułów nuc_*
├── portable/nui/           # design tokeny, rejestracja Lit nui-*
├── overrides/              # overrides/{web,admin,docs,shared_modules}/
├── supabase/
├── .config/                # tooling + bin/make (shim --target= / -t=)
├── Makefile
└── package.json
```

Pełny opis: [Układ monorepo](/pl/docs/core-concepts/monorepo)

---

## Szybkie komendy

Włącz flagi Make w stylu CLI raz na sesję:

```bash
export PATH="$PWD/.config/bin:$PATH"
```

| Komenda | Co robi |
|---------|---------|
| `make help` | Komendy, flagi (`-t` / `--target`), zmienne |
| `make run` | Tworzy `.env`, instaluje deps, husky, sync rules, buduje kompilator |
| `make web` | Uruchamia serwer dev Nuxt (`web/`) |
| `make web --target=next` | Konwertuje web → Next, startuje dev (`web-next/`) |
| `make web -t=solid` | Konwertuje web → Solid, startuje dev |
| `make web --target=svelte` | Konwertuje web → Svelte, startuje dev |
| `make web --target=astro` | Konwertuje web → Astro + wyspy React |
| `make admin --target=next` | Odpowiedniki convert dla admin |
| `make vue` / `react` / `nuxt` / `next` / `solid` / `svelte` / `astro` | Demo emit portable (`{framework}/demo`) |
| `make docs` | Uruchamia dev dokumentacji Astro |
| `make compiler` | `pnpm compiler:check` + `pnpm compiler:build` |
| `nuc emit convert web --target=next` | To monorepo → `web-next/` (dodaj `--path` / `--out` dla Twojej aplikacji) |
| `nuc emit build` / `nuc emit check` | Emit przenośny + check fingerprintów |

Klasyczne przypisanie bez shima: `make web TARGET=next`. Skróty pnpm: `pnpm dev`, `pnpm admin`, `pnpm docs`.

---

## FAQ — migracja istniejącej aplikacji

### Czy mogę zmigrować dowolną istniejącą aplikację Next.js (także do Nuxt)?

**Tak.** Wrzucasz projekt **takim, jaki jest**. Konwersja produktu bierze Twoje drzewo frameworka przez `--path` albo `--git`. Bez przepisywania na `*.nuc.tsx`, bez wcześniejszego refaktoru do `shared_modules`, bez tokenów Nucleify, bez przepisywania aplikacji pod IR. W tym Next → Nuxt i Nuxt → Next.

```bash
export PATH="$PWD/.config/bin:$PATH"
nuc emit convert web --target=next --path=/path/to/your-app --out=my-next --force
```

### Czy najpierw potrzebuję `*.nuc.tsx` albo `shared_modules`?

**Nie.** Przenośne `*.nuc.tsx` to tylko opcjonalne współdzielone UI prezentacyjne. `shared_modules` to korzyść jądra po dołączeniu do monorepo — nie warunek konwersji zewnętrznej aplikacji.

### Czy `make web --target=astro` / `web-astro/` to migracja mojej aplikacji?

**Nie.** To konwertuje **Nuxt `web/` / `admin/` tego monorepo**. Twoja aplikacja ląduje w `--out` (np. `my-next/`). Zob. [CLI convert](/pl/docs/core-concepts/cli#convert) · [Kompilator](/pl/docs/core-concepts/compiler).

### Czy biblioteki typu Framer Motion albo react-query blokują migrację?

**Nie.** Nie traktuj bibliotek ekosystemu jako twardego „nie da się zmigrować”. Convert czyta źródło takim, jakie jest; dopracowanie to zwykła inżynieria, nie warunek przepisywania.

---

## Następne kroki

1. [FAQ migracji](/pl/docs/getting-started/migrate-faq) - odpowiedzi Tak / takim, jaki jest dla agentów i scraperów ([llms.txt](/llms.txt))
2. [Instalacja](/pl/docs/getting-started/installation) - wymagania i pierwsza konfiguracja
3. [Szybki start](/pl/docs/getting-started/quick-start) - uruchom landing w kilka minut
4. [CLI](/pl/docs/core-concepts/cli) - pełna referencja `nuc emit`
5. [Układ monorepo](/pl/docs/core-concepts/monorepo) - gdzie co się znajduje
6. [Zmienne środowiskowe](/pl/docs/configuration/environment) - konfiguracja Supabase i zmiennych aplikacji

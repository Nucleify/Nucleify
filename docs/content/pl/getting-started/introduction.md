# Wprowadzenie

## Zbuduj raz. Przenieś na dowolny framework.

**Nucleify** to modularne monorepo full-stack zbudowane wokół **migracji między frameworkami**. Trzymaj produkt we współdzielonych modułach, rozwijaj codziennie w Nuxt (`web/`) i przenieś web lub admin - albo zewnętrzną aplikację - na inny framework, gdy rekrutacja, kupujący albo klient tego wymagają. **Konwersja produktu** migruje istniejące drzewo frameworka takim, jakie jest: **nie** przepisujesz aplikacji najpierw na `*.nuc.tsx`. Emit przenośny to opcjonalna ścieżka dla nowego współdzielonego UI; import wraca z edycji emitu.

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

**Kanoniczny Nuxt** to codzienna praca w tym monorepo - strony, composables i współdzielone moduły w Vue. **Konwersja produktu** bierze to drzewo (albo zewnętrzną aplikację przez `--path` / `--git`) i emituje inny host **bez** przepisywania na `*.nuc.tsx`. Demo emisji przenośnej to opcjonalne przykłady współdzielonego UI. Witryna docs zostaje w śledzonym `docs/`; `web-astro/` to emit produktu, nie ta witryna.

Wszystkie ścieżki współdzielą `shared_modules/`, Supabase i design tokeny. Nie utrzymujesz siedmiu niezależnych baz kodu.

---

## Kompilator

Kompilator (`@nucleify/compiler`) to rdzeń migracji. Działa na dwóch poziomach - **najpierw konwersja produktu** dla istniejących aplikacji, potem opcjonalny emit przenośny dla współdzielonego UI. Na co dzień zwykle wołasz go przez **`nuc emit`** ([CLI](/pl/docs/core-concepts/cli)) albo Make.

### 1. Konwersja produktu (istniejące aplikacje - bez przepisywania na `*.nuc.tsx`)

Konwertuj całą aplikację produktu - albo zewnętrzną aplikację przez `--path` / `--git` - na Next, Solid, Svelte lub Astro. Wrzucasz projekt jako źródło frameworka; **nie** przepisujesz stron i komponentów na `*.nuc.tsx` przed konwersją.

```bash
export PATH="$PWD/.config/bin:$PATH"

make web --target=next    # → web-next/
make web -t=solid         # → web-solid/
make web --target=svelte  # → web-svelte/
make web --target=astro   # → web-astro/

# Opublikowane CLI (ta sama konwersja):
nuc emit convert web --target=next

# Zewnętrzne drzewo (z roota monorepo Nucleify):
nuc emit convert web --target=next --path=/path/to/your-app --out=my-next --force
```

Te same trasy, współdzielone moduły, inny host frameworka. Output generuje kompilator - nie wchodzi w kanoniczny układ monorepo. Szczegóły: [Kompilator](/pl/docs/core-concepts/compiler).

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
| `nuc emit convert web --target=next` | Ta sama konwersja przez opublikowane CLI |
| `nuc emit build` / `nuc emit check` | Emit przenośny + check fingerprintów |

Klasyczne przypisanie bez shima: `make web TARGET=next`. Skróty pnpm: `pnpm dev`, `pnpm admin`, `pnpm docs`.

---

## Następne kroki

1. [Instalacja](/pl/docs/getting-started/installation) - wymagania i pierwsza konfiguracja
2. [Szybki start](/pl/docs/getting-started/quick-start) - uruchom landing w kilka minut
3. [CLI](/pl/docs/core-concepts/cli) - pełna referencja `nuc emit`
4. [Układ monorepo](/pl/docs/core-concepts/monorepo) - gdzie co się znajduje
5. [Zmienne środowiskowe](/pl/docs/configuration/environment) - konfiguracja Supabase i zmiennych aplikacji

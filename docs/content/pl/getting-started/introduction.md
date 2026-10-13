# Wprowadzenie

## Zbuduj raz. Przenieś na dowolny framework.

**Nucleify** to modularne monorepo full-stack. Trzymaj produkt we współdzielonych modułach, rozwijaj codziennie w Nuxt (`web/`) i migruj web, admin lub docs na inny framework, gdy trzeba — bez przepisywania biznesu.

**Shelle:** Vue · React · Nuxt · Next · Astro · Svelte · Solid — to nie jest produkt „tylko React/Next” ani „tylko Vue/Nuxt”.

> Zbuduj nucleus raz. Odpal każdy shell.

---

## Czym jest Nucleify?

Nucleify to **workspace pnpm**, który łączy wszystko, czego potrzebuje nowoczesny produkt:

| Pakiet | Ścieżka | Rola |
|--------|---------|------|
| `@nucleify/web` | `web/` | Aplikacja landingowa Nuxt 4 (Tryb A, kanoniczna) |
| `@nucleify/admin` | `admin/` | Panel administracyjny Nuxt 4 |
| `@nucleify/docs` | `docs/` | Strona dokumentacji Astro 5 |
| `@nucleify/compiler` | `compiler/` | Przenośny kompilator UI oparty na IR |
| `@nucleify/shared-modules` | `shared_modules/` | Sześć eksportowanych modułów funkcjonalnych |

Katalogi wspierające:

- `portable/nui/` — design tokeny i rejestracja Lit `nui-*`
- `overrides/` — nadpisania plików per pakiet (`overrides/{web,admin,docs,shared_modules}/`)
- `supabase/` — konfiguracja DB, migracje, edge functions
- `.config/` — Biome, Vitest, skrypty bash

---

## Architektura dual-mode: Tryb A i Tryb B

| Tryb | Stack | Komenda | Wynik |
|------|-------|---------|-------|
| **Tryb A** (domyślny) | Nuxt 4 + Vue 3.5 | `make web` | `web/` |
| **Tryb B** (generowany) | Next / Solid | `make web TARGET=next` · `make web TARGET=solid` | wygenerowane drzewo (zob. [Kompilator](/pl/docs/core-concepts/compiler)) |
| **Demo emit** | Vue · React · Nuxt · Next · Solid | `make vue` · `react` · `nuxt` · `next` · `solid` | `{framework}/demo` |

**Tryb A** to codzienna praca — strony, composables i współdzielone moduły w Vue. **Tryb B** i demo emit rozprowadzają ten sam nucleus na kolejne shelle. Astro hostuje dokumentację; Svelte i Solid są pełnoprawnymi celami emit/surface.

Wszystkie ścieżki współdzielą `shared_modules/`, Supabase i design tokeny. Nie utrzymujesz siedmiu niezależnych baz kodu.

---

## Kompilator

Kompilator (`@nucleify/compiler`) to sposób migracji UI między shellami. Działa na dwóch poziomach:

### 1. Przenośne komponenty (`*.nuc.tsx`)

Twórz UI niezależne od frameworka z `#nuc-compiler/runtime`. Kompilator emituje sąsiednie pliki `.vue`, `.tsx` i `.css`:

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

### 2. Konwersja powłoki produktu

Konwertuj całą aplikację Nuxt na Next lub Solid:

```bash
make web TARGET=next    # → web-next/
make web TARGET=solid   # → web-solid/
```

Te same trasy, współdzielone moduły, inna powłoka frameworka. Output generuje kompilator — nie wchodzi w kanoniczny układ monorepo.

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

Handlery modułów rejestrują się w `shared_modules/nuc_api/supabase/api/gateway_dispatch.ts`. Kod klienta wywołuje `/api/...` — nigdy Supabase bezpośrednio z przeglądarki dla operacji uprzywilejowanych.

---

## System designu

Prymitywy UI to **komponenty web Lit** z `nucleify-ui` (`nui-button`, `nui-icon`, …). Design tokeny i rejestracja są w `portable/nui/`. Każdy shell konsumuje te same custom elements; kompilator mapuje tagi `nui-*` w `*.nuc.tsx` na cele emisji (Vue, React, Solid i pokrewne shelle).

---

## Układ monorepo

```txt
nucleify/
├── web/                    # @nucleify/web — landing Nuxt 4 (Tryb A)
│   ├── nuxt.config.ts
│   ├── .config/nuxt/       # rozdzielona konfiguracja Nuxt
│   └── src/
│       ├── pages/          # strony Vue (np. home/sections/)
│       ├── plugins/        # modules.ts, nucleify-ui.client.ts
│       ├── composables/
│       ├── layouts/
│       └── server/api/     # bramka API Nitro [...slug].ts
├── admin/                  # @nucleify/admin — admin Nuxt 4
├── docs/                   # @nucleify/docs — dokumentacja Astro 5
├── compiler/               # @nucleify/compiler — przenośny kompilator UI IR
├── shared_modules/         # sześć eksportowanych modułów nuc_*
├── portable/nui/           # design tokeny, rejestracja Lit nui-*
├── overrides/              # overrides/{web,admin,docs,shared_modules}/
├── supabase/
├── .config/
├── Makefile
└── package.json
```

Pełny opis: [Układ monorepo](/pl/docs/core-concepts/monorepo)

---

## Szybkie komendy

| Komenda | Co robi |
|---------|---------|
| `make run` | Tworzy `.env`, instaluje deps, husky, sync rules, buduje kompilator |
| `make web` | Uruchamia serwer dev Nuxt (`web/`) |
| `make web TARGET=next` | Konwertuje powłokę Vue do Next, uruchamia dev |
| `make web TARGET=solid` | Konwertuje powłokę Vue do Solid, uruchamia dev |
| `make vue` / `react` / `nuxt` / `next` / `solid` | Demo emit portable |
| `make admin` | Uruchamia dev admin Nuxt |
| `make docs` | Uruchamia dev dokumentacji Astro |
| `make compiler` | Uruchamia `pnpm compiler:check` + `pnpm compiler:build` |

Odpowiedniki pnpm: `pnpm dev`, `pnpm admin`, `pnpm docs`.

---

## Następne kroki

1. [Instalacja](/pl/docs/getting-started/installation) — wymagania i pierwsza konfiguracja
2. [Szybki start](/pl/docs/getting-started/quick-start) — uruchom landing w kilka minut
3. [Układ monorepo](/pl/docs/core-concepts/monorepo) — gdzie co się znajduje
4. [Zmienne środowiskowe](/pl/docs/configuration/environment) — konfiguracja Supabase i zmiennych aplikacji

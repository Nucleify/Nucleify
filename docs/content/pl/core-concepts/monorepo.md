# Układ monorepo

Nucleify to workspace pnpm. Każdy pakiet ma wyraźną granicę, współdzielone narzędzia są w `.config/`, a aplikacje produktowe konsumują logikę funkcjonalną z `shared_modules/` — nigdy odwrotnie.

---

## Mapa najwyższego poziomu

```txt
nucleify/
├── web/                    # @nucleify/web — landing Nuxt 4 (Tryb A, kanoniczny)
├── admin/                  # @nucleify/admin — panel admin Nuxt 4
├── docs/                   # @nucleify/docs — dokumentacja Astro 5
├── compiler/               # @nucleify/compiler — przenośny kompilator UI IR
├── shared_modules/         # @nucleify/shared-modules — sześć modułów funkcjonalnych
├── portable/nui/           # design tokeny, rejestracja Lit nui-*
├── overrides/              # overrides/{web,admin,docs,shared_modules}/
├── supabase/               # konfiguracja DB, migracje, edge functions
├── .config/                # Biome, Vitest, skrypty bash, helpery CI
├── .cursor/                # agenci Cursor i reguły monorepo
├── Makefile                # make run, make web, make admin, …
└── package.json            # skrypty root workspace
```

---

## Aplikacje produktowe

### `web/` — `@nucleify/web`

Kanoniczna aplikacja landingowa Nuxt 4 (Tryb A).

```txt
web/
├── nuxt.config.ts          # składa rozdzieloną konfigurację z .config/nuxt/
├── .config/
│   ├── .env.example        # szablon kopiowany do root .env przez make run
│   └── nuxt/               # app, dev, i18n, nitro, runtime, structure, vite, …
└── src/
    ├── pages/
    │   ├── [lang]/         # cienkie wrappery routingu (i18n)
    │   └── home/           # sekcje landingowe
    ├── plugins/
    │   ├── modules.ts      # registerNuc* dla modułów współdzielonych
    │   └── nucleify-ui.client.ts
    ├── composables/
    ├── layouts/
    ├── assets/             # wpis SCSS (importuje style shared_modules)
    ├── nucleify.ts         # re-eksportuje powierzchnię współdzieloną + helpery app
    └── server/
        └── api/
            └── [...slug].ts  # catch-all Nitro → gateway_dispatch
```

Kluczowe fakty:

- `srcDir` to `src` (nie `nuxt/`)
- Alias `modules` → `../shared_modules`
- Alias `#nuc-compiler/runtime` → `../compiler/runtime/index.ts`

### `admin/` — `@nucleify/admin`

Te same konwencje Nuxt co `web/`, skupione na stronach dashboardu pod `admin/src/pages/`.

---

## `docs/` — `@nucleify/docs`

Statyczna strona dokumentacji Astro 5.

```txt
docs/
├── content/
│   ├── en/{category}/{slug}.md
│   └── pl/{category}/{slug}.md
├── public/                 # favicon, logo
└── src/
    ├── pages/
    │   └── [lang]/docs/[category]/[slug].astro
    ├── layouts/DocsLayout.astro
    ├── components/         # DocsSidebar, DocsToc, LangSwitcher
    └── lib/                # ścieżki doc, renderer markdown, nawigacja
```

Kategorie są zdefiniowane w `docs/src/lib/constants/docs.ts`. Trasy mają postać `/pl/docs/{category}/{slug}`.

---

## `compiler/` — `@nucleify/compiler`

Przenośny kompilator UI oparty na IR. Samodzielny — nie importuje z `web/`, `admin/` ani `docs/`.

```txt
compiler/
├── src/
│   ├── parse/              # *.nuc.tsx → AST
│   ├── ir/                 # reprezentacja pośrednia
│   ├── emit/               # IR → .vue / .tsx / .css
│   └── sync/               # import zwrotny z emisji, konwersja powłok produktu
├── runtime/                # #nuc-compiler/runtime (component, state, handler, …)
├── templates/              # źródła scaffold dla gitignored demo
├── tests/
├── fixtures/
└── PORTABLE.md             # reguły autorskie dla *.nuc.tsx
```

Gitignored demo emisji: `{vue,react,nuxt,next}/demo/` (przez `make vue`, `make next` itd.).

---

## `shared_modules/` — `@nucleify/shared-modules`

Sześć wchłoniętych modułów funkcjonalnych (nie submoduły git):

| Moduł | Ścieżka |
|-------|---------|
| Klient API i bramka | `shared_modules/nuc_api/` |
| Kolory i motyw | `shared_modules/nuc_colors/` |
| Tryb ciemny | `shared_modules/nuc_dark_mode/` |
| Globalne i media | `shared_modules/nuc_globals/` |
| i18n i tłumaczenia | `shared_modules/nuc_languages/` |
| Storage i helpery stanu | `shared_modules/nuc_stores/` |

Barrel export: `shared_modules/index.ts`. Każdy moduł jest samodzielny z opcjonalnym `supabase/`, `utils/`, `types/` i `vitests/`.

**Nie ma** katalogu `modules/` na poziomie root ani pakietów `nuc_users` czy `nuc_auth`.

---

## `portable/nui/`

Design tokeny i rejestracja custom elements Lit dla `nucleify-ui` (tagi `nui-*`). Referencjonowany przez Nuxt przez alias `portable/nui` w `web/.config/nuxt/structure.ts`.

---

## `overrides/`

Warstwy nadpisań per pakiet. Odwzoruj dowolną ścieżkę pliku:

```txt
overrides/
├── web/src/…
├── admin/src/…
├── docs/src/…
└── shared_modules/nuc_*/…
```

Nadpisania zastępują oryginalny plik w całości — bez merge. Tylko Nuxt; nie jest częścią importu kompilatora. Zobacz [Nadpisywanie](/pl/docs/core-concepts/overriding).

---

## `supabase/`

Konfiguracja projektu Supabase na poziomie monorepo. SQL modułów jest w każdym `shared_modules/nuc_*/supabase/` i scalany przez `.config/bash/merge-module-supabase-sql.sh`.

---

## `.config/`

Współdzielone narzędzia monorepo:

- Biome (`pnpm check`, `pnpm write`)
- Root config Vitest (`vitest.config.ts`) — projekty `web` i `shared`
- Vitest kompilatora (`.config/vitest.compiler.config.ts`)
- Skrypty bash: merge/apply Supabase, hook checks, prepare submodule
- Hooki Husky delegują do `.config/bash/hook-checks.sh`

---

## Kierunek zależności

```txt
web / admin / docs
         ↓ importuje
    shared_modules / portable / compiler/runtime
         ↓
    supabase (przez handlery API)
```

**Reguły:**

- Aplikacje importują z `shared_modules/`; moduły nigdy nie importują z aplikacji
- Logika kompilatora pozostaje w `compiler/src/`
- Nadpisania przesłaniają pliki app lub modułu w czasie buildu (tylko Nuxt)

---

## Referencja Makefile

| Komenda | Akcja |
|---------|-------|
| `make run` | `.env` + setup + kompilator |
| `make setup` | install, husky, prepare, sync-rules, kompilator |
| `make web` | dev Nuxt (`TARGET=nuxt` domyślnie) |
| `make web TARGET=next` | konwersja + dev Next |
| `make admin` / `make admin TARGET=next` | odpowiedniki admin |
| `make docs` | dev dokumentacji Astro |
| `make compiler` | check + build |
| `make vue` / `make react` / `make nuxt` / `make next` | gitignored demo przenośne |

---

## Powiązana dokumentacja

- [Moduły](/pl/docs/core-concepts/modules) — wewnętrzna struktura modułu
- [Kompilator](/pl/docs/core-concepts/compiler) — Tryb A vs Tryb B
- [Web & Admin](/pl/docs/configuration/web) — szczegóły konfiguracji Nuxt

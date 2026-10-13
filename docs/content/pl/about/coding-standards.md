# Standardy kodowania

Konwencje czytelnego, spójnego kodu w monorepo Nucleify. W razie wątpliwości dopasuj się do sąsiednich plików w pakiecie, który edytujesz.

---

## Struktura monorepo

```txt
nucleify/
├── web/               # @nucleify/web — landing Nuxt
├── admin/             # @nucleify/admin — admin Nuxt
├── docs/              # @nucleify/docs — docs Astro
├── compiler/          # @nucleify/compiler — przenośny kompilator UI
├── shared_modules/    # sześć eksportowanych modułów nuc_*
├── portable/nui/      # design tokeny
├── overrides/         # nadpisania plików per pakiet
├── supabase/          # scalona konfiguracja DB
└── .config/           # wspólne narzędzia
```

Kanoniczne ścieżki produktu: `web/src/` (nie root `modules/` ani `nuxt/` jako srcDir). Prymitywy UI to `nui-*`, nie drzewo `ad-*`. Auth żyje w `nuc_api`.

---

## Komendy pakietów

| Pakiet | Komenda dev |
|--------|-------------|
| `web/` | `make web` lub `pnpm dev` |
| `admin/` | `make admin` lub `pnpm admin` |
| `docs/` | `make docs` lub `pnpm docs` |
| `compiler/` | `make compiler` |

Bootstrap: `make run`. Shell produktu: `make web`. (`make nuxt` / `make next` / … to demo emit portable, nie aplikacja produktu.)

---

## Struktura modułu współdzielonego

```txt
shared_modules/nuc_example/
├── config.json
├── nuc_example.ts           # registerNucExample (plugin Vue)
├── index.ts                 # barrel Vue
├── index.react.ts           # barrel React (gdy potrzebny)
├── _index.scss
├── supabase/api/handle.ts
├── constants/
├── types/
├── utils/
├── components/              # opcjonalnie
└── vitests/
```

**Reguły importu:**

- Wewnątrz modułów: tylko importy względne
- Nigdy nie importuj z `web/`, `admin/` ani `docs/` wewnątrz modułów
- Nigdy `import from 'nucleify'` wewnątrz modułów (cykl)
- Aplikacje importują przez alias `modules/…` lub ścieżki `shared_modules/…`

---

## Struktura aplikacji web

```txt
web/src/
├── pages/[lang]/            # cienkie wrappery i18n
├── pages/home/              # kompozycja landingu
├── plugins/modules.ts       # registerNuc*
├── composables/             # tylko app-specific
├── layouts/
├── assets/                  # wejście SCSS
├── nucleify.ts              # re-eksporty
└── server/api/[...slug].ts  # bramka
```

- Vue SFC: `<script setup lang="ts">`
- UI: `nui-*` z `nucleify-ui`
- Logika domenowa: `shared_modules/`, nie `web/src/`

---

## Nazewnictwo plików i folderów

| Rodzaj | Konwencja | Przykład |
|--------|-----------|----------|
| Vue SFC | PascalCase | `NucHomeHero.vue` |
| Composable | `use_` + snake_case | `use_dark_mode.ts` |
| Sibling hook React | `.react.ts` | `use_dark_mode.react.ts` |
| Komponent przenośny | PascalCase + `.nuc.tsx` | `Counter.nuc.tsx` |
| Utils | snake_case | `api_request.ts` |
| Typy | pliki snake_case | `interfaces.ts`, `variables.ts` |
| Testy | `*.test.ts` w `vitests/` | `darken_color.test.ts` |
| Partiale SCSS | `_name.scss` | `_mixins.scss` |

---

## TypeScript

- Strict typing — unikaj `any`, chyba że config Nuxt wymusza (dokumentuj biome-ignore)
- Eksportuj typy z `types/` — nie duplikuj interfejsów między plikami
- Używaj siblingów typów `.react.ts`, gdy props React odbiegają od Vue

---

## Komponenty Vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SomeType } from 'modules/nuc_example/types/interfaces'

const props = defineProps<{ id: string }>()
const open = ref(false)
</script>

<template>
  <nui-button @click="open = !open">{{ props.id }}</nui-button>
</template>
```

- Preferuj Composition API z `<script setup>`
- Prymitywy: `nui-*`; UI domenowe: komponenty modułów

---

## Komponenty przenośne

Autoruj w `*.nuc.tsx` zgodnie z `compiler/PORTABLE.md`:

- Bez store, routerów ani Supabase w plikach przenośnych
- Na zewnątrz tylko props + events
- Po zmianach: `pnpm compiler:build`; commituj autorstwo + emit
- Import edycji: `pnpm compiler -- import --from=vue|react|solid|svelte`
- Nie re-eksportuj `*.nuc.tsx` z publicznych barreli (`index.ts`, `modules.ts`, …)
- Łamiące zmiany IR podnoszą `IR_VERSION` i migrują fixture’y w tym samym PR

---

## Handlery API

- Wejście: `handle.ts` eksportuje `handle*Api`
- Rejestracja w `shared_modules/nuc_api/supabase/api/gateway_dispatch.ts`
- Zwracaj `apiNotHandled()` dla niedopasowanych prefiksów
- Używaj `withGatewayUser` dla tras uwierzytelnionych
- Włącz RLS na eksponowanych tabelach

---

## SCSS

- Style modułów: `shared_modules/nuc_*/styles/`
- Wejście aplikacji importuje pliki `_index.scss` modułów
- Lint: `pnpm slint`

---

## Testy

- Testy modułów: `shared_modules/nuc_*/vitests/`
- Testy Nuxt: `web/vitests/`
- Przed commitem: `pnpm tests`
- Testuj zachowanie — unikaj asercji szczegółów implementacji

---

## Lint i format

```bash
pnpm check       # Biome (lint + format check)
pnpm write       # Biome auto-fix
pnpm typeslint   # tsc --noEmit -p web/tsconfig.json
pnpm slint       # Stylelint na SCSS
pnpm tests       # Vitest
```

Husky uruchamia to na pre-commit przez `.config/bash/hook-checks.sh` (pre-push jest no-op).

---

## Git i commity

- Skupione commity — jedna sprawa na zmianę, gdy to możliwe
- Nie commituj `.env`, demo emit (`vue/demo` itd.) ani `*.ir.json`
- Trzymaj się istniejącego stylu wiadomości commitów w repo

---

## Reguły Cursor i agenci

- Reguły monorepo: `.cursor/rules/`
- Reguły pakietu: `{pkg}/.config/rules/`
- Sync: `pnpm sync-rules`
- Agenci workflow feature: `web/.cursor/agents/`

---

## Powiązana dokumentacja

- [Moduły](/pl/docs/core-concepts/modules)
- [Feature-Sliced Design](/pl/docs/core-concepts/feature-sliced-design)
- [Vitest](/pl/docs/tests/vitest)
- [Kodeks postępowania](/pl/docs/about/code-of-conduct)

Referencja root: `CODE_STANDARDS.md` w repozytorium (utrzymuj w sync z tą stroną).

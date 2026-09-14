# Standardy kodowania

Standardy kodu, struktury i nazewnictwa w Nucleify. Ich przestrzeganie zapewnia czytelny, spójny i łatwy w utrzymaniu kod w całym monorepo.

---

## Struktura projektu

```txt
nucleify/
├── web/                    # @nucleify/web — aplikacja landingowa Nuxt 4 (kanoniczna)
├── admin/                  # @nucleify/admin — panel admin Nuxt 4
├── docs/                   # @nucleify/docs — strona dokumentacji Astro
├── compiler/               # Przenośny kompilator UI (Vue ↔ React)
├── portable/               # Przenośne komponenty *.nuc.tsx
├── shared_modules/         # Współdzielone pakiety funkcjonalne nuc_*
├── overrides/              # Warstwy nadpisań per pakiet
├── supabase/               # Konfiguracja Supabase i scalone SQL
└── .config/                # Narzędzia monorepo / bash / helpery CI
```

---

## Struktura modułu

Każdy moduł w `shared_modules/` to samodzielny pakiet funkcjonalny:

```txt
shared_modules/nuc_<feature>/
├── supabase/               # Migracje, seedery, handlery API
│   ├── migrations/         # Migracje SQL z timestampem
│   └── api/                # Handlery edge functions
├── utils/                  # Composables, hooki, helpery
├── types/                  # Interfejsy TypeScript
├── vitests/                # Testy frontendowe (Vitest)
├── config.json             # Metadane modułu
├── index.ts                # Barrel export Vue
├── index.react.ts          # Barrel export React
├── nuc_<feature>.ts        # Rejestracja Vue
└── README.md               # Dokumentacja modułu
```

---

## Konwencje nazewnictwa

### Pliki i katalogi

| Typ | Konwencja | Przykład |
|-----|-----------|----------|
| Foldery modułów | `snake_case` | `nuc_api`, `nuc_languages` |
| Pliki TypeScript | `snake_case` | `use_auth.ts`, `parse_headings.ts` |
| Komponenty Vue | foldery `kebab-case` | `input-text/index.vue` |
| Pliki SCSS | prefiks `_` | `_index.scss` |
| Migracje SQL | prefiks timestamp | `20260501000000_nuc_languages.sql` |
| Punkty wejścia | `index.*` | `index.ts`, `index.vue` |

### Identyfikatory kodu

| Typ | Konwencja | Przykład |
|-----|-----------|----------|
| Komponenty | `PascalCase` | `InputText`, `DataTable` |
| Definicje typów | `PascalCase` | `UserProps`, `ButtonEmits` |
| Composables | prefiks `use`, `camelCase` | `useAuth`, `useHeadings` |
| Stałe | `SCREAMING_SNAKE_CASE` | `API_BASE_URL`, `MAX_RETRIES` |
| Funkcje | `camelCase` | `getUserById`, `parseMarkdown` |
| Klasy CSS | BEM / `kebab-case` | `nui-button`, `card__header--active` |
| Trasy API | URL `kebab-case` | `/api/user-profile` |

---

## Hierarchia Atomic Design

Komponenty podążają za ścisłą hierarchią Atomic Design:

1. **Boson** — Funkcje narzędziowe, helpery, design tokeny
2. **Atom** — Podstawowe elementy UI (`Button`, `Input`, `Icon`)
3. **Molecule** — Połączone atomy (`FloatLabel`, `Anchor`, `SearchBar`)
4. **Organism** — Złożone komponenty (`DataTable`, `Dialog`, `NavBar`)
5. **Template** — Layouty stron (`DashboardLayout`, `AuthLayout`)

### Struktura plików komponentu

```txt
<component>/
├── index.vue               # Główny komponent
├── index.ts                # Eksporty
├── _index.scss             # Style (opcjonalne)
└── types/
    ├── index.ts            # Barrel export
    ├── interfaces.ts       # Props, emits, slots
    └── variables.ts        # Zmienne CSS, stałe
```

Komponenty aplikacji web znajdują się w `web/src/components/{atom,molecule,organism}/` z prefiksem `ad-`.

---

## Konwencje TypeScript

### Preferuj interfejsy nad typami

```typescript
// ✅ Dobrze — używaj interfejsów dla kształtów obiektów
interface UserData {
  id: number
  name: string
  email: string
}

// ❌ Unikaj — aliasy typów dla prostych kształtów obiektów
type UserData = {
  id: number
  name: string
  email: string
}
```

### Tryb strict

- Włącz `strict: true` we wszystkich plikach `tsconfig.json`
- Bez `any` — używaj `unknown`, gdy typ jest naprawdę nieznany
- Jawne typy zwracane dla eksportowanych funkcji

```typescript
// ✅ Dobrze — jawne typy, bez any
function getUser(id: number): UserData {
  // ...
}

// ❌ Źle — unikaj any
function getUser(id: any): any {
  // ...
}
```

### Handlery API

```typescript
// ✅ Dobrze — typowany wynik handlera
export async function handle(ctx: ApiContext): Promise<ApiHandlerResult> {
  const crud = await trySimpleCrud(ctx)
  if (crud.handled) return crud
  return apiNotHandled()
}
```

---

## Najlepsze praktyki komponentów

### Komponenty Vue

```vue
<script setup lang="ts">
// ✅ Props w dół, zdarzenia w górę — z interfejsami TypeScript
interface Props {
  label: string
  disabled?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: []
  update: [value: string]
}>()
</script>
```

### Reguły

- **Props w dół, zdarzenia w górę** — Jednokierunkowy przepływ danych
- **Pojedyncza odpowiedzialność** — Jeden komponent, jeden cel
- **Interfejsy TypeScript dla props** — Zawsze definiuj interfejsy `Props` i `Emits`
- **Tylko Composition API** — Bez Options API w nowym kodzie
- **`<script setup>`** — Preferowana składnia dla komponentów Vue
- **Małe szablony** — Wyciągaj złożoną logikę do composables

---

## Konwencje importów

- Używaj **barrel exports** (`index.ts`) dla publicznych API modułów
- Używaj **importów względnych** wewnątrz modułu
- Używaj **aliasów pakietów** między modułami (`nuc_api`, `modules`)
- Grupuj importy: zewnętrzne → pakiety monorepo → względne

```typescript
// Zewnętrzne
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

// Monorepo
import { apiRequest } from 'nuc_api'

// Względne
import type { UserData } from './types'
import { formatName } from './utils'
```

---

## Konwencje Git

### Conventional Commits

```txt
feat(nuc_languages): add translation preload middleware
fix(compiler): resolve JSX attribute conversion edge case
docs: update getting started guide
refactor(admin): simplify dashboard data fetching
test(nuc_api): add API error handling tests
chore: update dependencies
```

### Nazewnictwo branchy

```txt
feat/nuc-languages-preload
fix/compiler-jsx-attributes
docs/getting-started-update
refactor/admin-dashboard
```

---

## Narzędzia jakości kodu

| Narzędzie | Cel | Komenda |
|-----------|-----|---------|
| [Biome](https://biomejs.dev) | Formatowanie i linting (JS/TS) | `pnpm check`, `pnpm typeslint` |
| [Stylelint](https://stylelint.io) | Linting SCSS/CSS | `pnpm slint` |
| [Vitest](https://vitest.dev) | Testy jednostkowe i komponentów | `pnpm tests` |
| TypeScript | Sprawdzanie typów | `pnpm check` |

### Checklist pre-commit

```bash
pnpm check          # Sprawdzanie typów + Biome
pnpm typeslint      # Lint TypeScript
pnpm slint          # Stylelint
pnpm tests          # Uruchom zestaw testów
```

---

## Wytyczne modułów

- Każdy moduł musi być **samodzielny** — backend, frontend i testy razem
- Logika backendowa jest w `shared_modules/<module>/supabase/`
- UI frontendowe jest w `shared_modules/<module>/utils/` lub komponentach aplikacji
- Komponenty globalne/współdzielone trafiają do `web/src/components/`
- Używaj `config.json` dla metadanych modułu
- Dokumentuj każdy moduł przez `README.md`

---

## Dlaczego te standardy

- Zgodność z konwencjami Nuxt, Next i Supabase
- Umożliwia skalowanie horyzontalne przez izolowane moduły
- Wyraźny podział odpowiedzialności backend/frontend
- Spójne UI z Atomic Design
- Łatwy onboarding nowych kontrybutorów
- Kompilator polega na przewidywalnej strukturze, aby generować poprawny output

# Standardy kodowania

Standardy dla kodu, struktury i nazewnictwa w Nucleify. Przestrzeganie ich zapewnia czytelny, spójny i łatwy w utrzymaniu kod.

---

## Struktura projektu

```txt
root/
├── modules/                # Samowystarczalne moduły (supabase/, atomic/)
├── nuxt/                   # Frontend Nuxt
├── next/                   # Frontend Next.js (opcjonalnie)
├── supabase/               # Scalone SQL, lokalna konfiguracja Supabase
├── .config/                # Konfiguracja Nuxt/Next/narzędzi
└── vitests/                # Globalne testy frontendu
```

---

## Struktura modułu

```txt
modules/<nazwa_modulu>/
├── supabase/               # Migracje, seedery, handlery API
├── atomic/                 # UI (Vue/React/TS/SCSS)
├── vitests/                # Testy Vitest
├── config.json             # Metadane modułu
├── index.ts                # Barrel export
├── <nazwa_modulu>.ts       # Rejestracja Vue
├── <nazwa_modulu>.react.ts # Rejestracja React (opcjonalnie)
└── README.md
```

---

## Konwencje nazewnictwa

### Backend (Supabase)

| Typ | Konwencja | Przykład |
|-----|-----------|----------|
| Foldery modułów | `snake_case` | `nuc_users`, `nuc_entities` |
| Migracje SQL | Prefiks timestamp | `20260501000000_nuc_users.sql` |
| Handlery API | `snake_case` | `handle.ts` w `supabase/api/` |
| Routy API | `kebab-case` w URL | `/api/user-profile` |

### Frontend (Nuxt/Vue/TypeScript)

| Typ | Konwencja | Przykład |
|-----|-----------|----------|
| Komponenty Vue | foldery `kebab-case` | `input-text/index.vue` |
| Pliki TypeScript | `snake_case` | `use_auth.ts` |
| Definicje typów | `PascalCase` | `UserProps`, `ButtonEmits` |
| Composables | prefix `use` | `useAuth.ts` |
| Stałe | `SCREAMING_SNAKE_CASE` | `API_BASE_URL` |
| Entry points | `index.ts` / `index.vue` | Główny plik komponentu |

---

## Hierarchia Atomic Design

1. **Boson** – Funkcje narzędziowe, helpery
2. **Atom** – Podstawowe elementy UI (Button, Input, Icon)
3. **Molecule** – Połączone atomy (FloatLabel, Anchor)
4. **Organism** – Złożone komponenty (DataTable, Dialog)
5. **Template** – Layouty stron (DashboardLayout)

### Struktura komponentu

```txt
<komponent>/
├── index.vue               # Główny komponent
├── index.ts                # Eksporty
├── _index.scss             # Style (opcjonalnie)
└── types/
    ├── index.ts
    ├── interfaces.ts
    └── variables.ts
```

---

## Zasady kodowania

### Ogólne

- Preferuj **czytelność** nad spryt
- Stosuj **KISS** – Keep It Simple
- Stosuj **DRY** – Don't Repeat Yourself
- Komentuj tylko gdy intencja jest niejasna
- Usuwaj nieużywany kod
- Trzymaj funkcje małe i skupione

### TypeScript

```typescript
// ✅ Dobrze - jawne typy
interface UserData {
  id: number
  name: string
  email: string
}

function getUser(id: number): UserData {
  // ...
}

// ❌ Źle - unikaj any
function getUser(id: any): any {
  // ...
}
```

### Handlery API (TypeScript)

```typescript
// ✅ Dobrze - typowany wynik handlera
export async function handle(ctx: ApiContext): Promise<ApiHandlerResult> {
  const crud = await trySimpleCrud(ctx)
  if (crud.handled) return crud
  return apiNotHandled()
}
```

### Vue

```vue
<script setup lang="ts">
// ✅ Dobrze - Composition API z TypeScript
interface Props {
  label: string
  disabled?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  click: []
}>()
</script>
```

---

## Wytyczne dla modułów

- Każdy moduł powinien być **samowystarczalny**
- Logika backendowa w `modules/<modul>/supabase/`
- Frontend w `modules/<modul>/ (constants, types, utils, components)`
- Globalne komponenty w `nuxt/atomic/`
- Używaj `config.json` dla metadanych
- Dokumentuj w `README.md`

---

## Dlaczego te standardy

- Zgodność z wzorcami Nuxt, Next i Supabase
- Umożliwia skalowanie horyzontalne z modułami
- Jasne rozdzielenie backend/frontend
- Spójne UI z Atomic Design
- Łatwe wdrażanie nowych kontrybutorów



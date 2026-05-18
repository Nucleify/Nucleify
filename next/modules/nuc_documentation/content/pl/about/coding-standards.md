# Standardy kodowania

Standardy dla kodu, struktury i nazewnictwa w Nucleify. Przestrzeganie ich zapewnia czytelny, spójny i łatwy w utrzymaniu kod.

---

## Struktura projektu

```txt
root/
├── app/                    # Główna aplikacja Laravel
│   ├── Console/            # Komendy Artisan
│   ├── Exceptions/         # Obsługa wyjątków
│   ├── Http/               # Kontrolery, Middleware
│   ├── Providers/          # Service providers
│   ├── Services/           # Współdzielone serwisy
│   └── Traits/             # Reużywalne traity
│
├── config/                 # Konfiguracja Laravel
├── database/               # Migracje, fabryki, seedery
├── routes/                 # Definicje routów
├── modules/                # Samowystarczalne moduły
├── nuxt/                   # Frontend (Nuxt/Vue)
└── tests/                  # Testy globalne
```

---

## Struktura modułu

```txt
modules/<nazwa_modulu>/
├── app/                    # Kod backendowy PHP
│   ├── Controllers/
│   ├── Services/
│   ├── Models/
│   ├── Resources/
│   └── Requests/
├── config/                 # Konfiguracja modułu
├── database/               # Migracje, seedery, fabryki
├── routes/                 # Routy modułu
├── atomic/                 # Frontend (TS/Vue/SCSS)
├── tests/                  # Testy backendowe (Pest)
├── vitests/                # Testy frontendowe (Vitest)
├── config.json             # Metadane modułu
├── index.ts                # Entry point frontend
├── <nazwa_modulu>.ts       # Główny plik frontend
├── <nazwa_modulu>.php      # Główny plik backend
└── README.md               # Dokumentacja
```

---

## Konwencje nazewnictwa

### Backend (Laravel/PHP)

| Typ | Konwencja | Przykład |
|-----|-----------|----------|
| Foldery modułów | `snake_case` | `nuc_auth`, `nuc_entities` |
| Klasy PHP | `PascalCase` | `UserController.php` |
| Pliki konfiguracji | `snake_case` | `nuc_auth.php` |
| Migracje | Konwencja Laravel | `2024_01_01_000000_create_users_table.php` |
| Routy | `kebab-case` w URL | `/api/user-profile` |

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

### PHP

```php
// ✅ Dobrze - type hints
public function store(UserRequest $request): JsonResponse
{
    $user = $this->userService->create($request->validated());
    return response()->json($user);
}

// ❌ Źle - brak typów
public function store($request)
{
    // ...
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
- Logika backendowa w `modules/<modul>/app/`
- Frontend w `modules/<modul>/atomic/`
- Globalne komponenty w `nuxt/atomic/`
- Używaj `config.json` dla metadanych
- Dokumentuj w `README.md`

---

## Dlaczego te standardy

- Zgodność z wzorcami Laravel + Nuxt
- Umożliwia skalowanie horyzontalne z modułami
- Jasne rozdzielenie backend/frontend
- Spójne UI z Atomic Design
- Łatwe wdrażanie nowych kontrybutorów



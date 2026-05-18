# Coding Standards

Standards for code, structure, and naming in Nucleify. Following these ensures readable, consistent, and maintainable code.

---

## Project Structure

```txt
root/
├── app/                    # Laravel core application
│   ├── Console/            # Artisan commands
│   ├── Exceptions/         # Exception handlers
│   ├── Http/               # Controllers, Middleware
│   ├── Providers/          # Service providers
│   ├── Services/           # Shared services
│   └── Traits/             # Reusable traits
│
├── config/                 # Laravel configuration
├── database/               # Migrations, factories, seeders
├── routes/                 # Route definitions
├── modules/                # Self-contained feature modules
├── nuxt/                   # Frontend (Nuxt/Vue)
└── tests/                  # Global tests
```

---

## Module Structure

```txt
modules/<module_name>/
├── app/                    # Backend PHP code
│   ├── Controllers/
│   ├── Services/
│   ├── Models/
│   ├── Resources/
│   └── Requests/
├── config/                 # Module configuration
├── database/               # Migrations, seeders, factories
├── routes/                 # Module routes
├── atomic/                 # Frontend (TS/Vue/SCSS)
├── tests/                  # Backend tests (Pest)
├── vitests/                # Frontend tests (Vitest)
├── config.json             # Module metadata
├── index.ts                # Frontend entry
├── <module_name>.ts        # Main frontend file
├── <module_name>.php       # Main backend file
└── README.md               # Documentation
```

---

## Naming Conventions

### Backend (Laravel/PHP)

| Type | Convention | Example |
|------|------------|---------|
| Module folders | `snake_case` | `nuc_auth`, `nuc_entities` |
| PHP classes | `PascalCase` | `UserController.php` |
| Config files | `snake_case` | `nuc_auth.php` |
| Migrations | Laravel convention | `2024_01_01_000000_create_users_table.php` |
| Routes | `kebab-case` URLs | `/api/user-profile` |

### Frontend (Nuxt/Vue/TypeScript)

| Type | Convention | Example |
|------|------------|---------|
| Vue components | `kebab-case` folders | `input-text/index.vue` |
| TypeScript files | `snake_case` | `use_auth.ts` |
| Type definitions | `PascalCase` | `UserProps`, `ButtonEmits` |
| Composables | `use` prefix | `useAuth.ts` |
| Constants | `SCREAMING_SNAKE_CASE` | `API_BASE_URL` |
| Entry points | `index.ts` / `index.vue` | Component main file |

---

## Atomic Design Hierarchy

1. **Boson** – Utility functions, helpers
2. **Atom** – Basic UI elements (Button, Input, Icon)
3. **Molecule** – Combined atoms (FloatLabel, Anchor)
4. **Organism** – Complex components (DataTable, Dialog)
5. **Template** – Page layouts (DashboardLayout)

### Component Structure

```txt
<component>/
├── index.vue               # Main component
├── index.ts                # Exports
├── _index.scss             # Styles (optional)
└── types/
    ├── index.ts
    ├── interfaces.ts
    └── variables.ts
```

---

## Coding Rules

### General

- Prefer **readability** over cleverness
- Follow **KISS** – Keep It Simple
- Follow **DRY** – Don't Repeat Yourself
- Comment only when intent is unclear
- Remove unused code
- Keep functions small and focused

### TypeScript

```typescript
// ✅ Good - explicit types
interface UserData {
  id: number
  name: string
  email: string
}

function getUser(id: number): UserData {
  // ...
}

// ❌ Bad - avoid any
function getUser(id: any): any {
  // ...
}
```

### PHP

```php
// ✅ Good - type hints
public function store(UserRequest $request): JsonResponse
{
    $user = $this->userService->create($request->validated());
    return response()->json($user);
}

// ❌ Bad - no types
public function store($request)
{
    // ...
}
```

### Vue

```vue
<script setup lang="ts">
// ✅ Good - Composition API with TypeScript
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

## Module Guidelines

- Each module should be **self-contained**
- Backend logic in `modules/<module>/app/`
- Frontend in `modules/<module>/atomic/`
- Global components in `nuxt/atomic/`
- Use `config.json` for metadata
- Document in `README.md`

---

## Why These Standards

- Aligns with Laravel + Nuxt patterns
- Enables horizontal scaling with modules
- Clear separation backend/frontend
- Consistent UI with Atomic Design
- Easy onboarding for contributors



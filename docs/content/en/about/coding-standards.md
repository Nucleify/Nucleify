# Coding Standards

Standards for code, structure, and naming in Nucleify. Following these ensures readable, consistent, and maintainable code.

---

## Project Structure

```txt
nucleify/
├── web/                    # @nucleify/web — Nuxt landing app
├── admin/                  # @nucleify/admin — Nuxt admin
├── docs/                   # @nucleify/docs — Astro docs
├── compiler/               # portable UI compiler
├── shared_modules/         # shared nuc_* packages
├── overrides/              # per-package override layers
├── .config/                # monorepo tooling / bash / CI helpers
└── supabase/               # Supabase config and merged SQL
```

---

## Module Structure

```txt
modules/<module_name>/
├── supabase/               # Migrations, seeders, API handlers
├── atomic/                 # UI (Vue/React/TS/SCSS)
├── vitests/                # Frontend tests (Vitest)
├── config.json             # Module metadata
├── index.ts                # Barrel export
├── <module_name>.ts        # Vue registration
├── <module_name>.react.ts  # React registration (optional)
└── README.md
```

---

## Naming Conventions

### Backend (Supabase)

| Type | Convention | Example |
|------|------------|---------|
| Module folders | `snake_case` | `nuc_users`, `nuc_entities` |
| SQL migrations | Timestamp prefix | `20260501000000_nuc_users.sql` |
| API handlers | `snake_case` | `handle.ts` in `supabase/api/` |
| API routes | `kebab-case` URLs | `/api/user-profile` |

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

### API handlers (TypeScript)

```typescript
// ✅ Good - typed handler result
export async function handle(ctx: ApiContext): Promise<ApiHandlerResult> {
  const crud = await trySimpleCrud(ctx)
  if (crud.handled) return crud
  return apiNotHandled()
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
- Backend logic in `modules/<module>/supabase/`
- Frontend in `modules/<module>/ (constants, types, utils, components)`
- Global components in `nuxt/atomic/`
- Use `config.json` for metadata
- Document in `README.md`

---

## Why These Standards

- Aligns with Nuxt, Next, and Supabase patterns
- Enables horizontal scaling with modules
- Clear separation backend/frontend
- Consistent UI with Atomic Design
- Easy onboarding for contributors



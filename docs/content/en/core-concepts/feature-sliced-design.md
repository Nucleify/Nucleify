# Feature-Sliced Design

Feature-Sliced Design (FSD) organizes code by business domain instead of technical layers. Each module is a self-contained unit with its own frontend, backend, database, and tests.

## Key Rules

- One feature per module
- Export only what's needed via `index.ts`
- Keep modules small - split when needed
- Co-locate tests with code

## Traditional vs Feature-Sliced

```txt
# ❌ By layer                    # ✅ By domain
src/                             modules/
├── api/                         ├── nuc_users/
│   ├── auth-handler.ts          │   ├── supabase/api/handle.ts
│   └── user-handler.ts          │   ├── supabase/migrations/
├── db/                          │   ├── pages/
│   └── users.sql                │   └── vitests/
└── ui/                          └── nuc_entities/
    └── auth/                        ├── supabase/api/handle.ts
                                     └── pages/
```

## Benefits

| Benefit | Description |
|---------|-------------|
| **High cohesion** | All related code in one place |
| **Low coupling** | Modules are independent, enable/disable via `config.json` |
| **Clear boundaries** | Explicit API through `index.ts` exports |
| **Team scalability** | Teams work on separate modules without conflicts |
| **Easy testing** | Tests co-located with the code they test |

## Layer Dependencies

**Backend (`supabase/`):**
`api/handle.ts` → helpers → PostgreSQL (migrations, RLS)

**Frontend (`atomic/`):**
pages → templates → bosons (types, utils, constants)

## Cross-Module Imports

```typescript
import { userRequests, type UserInterface } from 'modules/nuc_entities'
```

Shared utilities in dedicated modules: `nuc_api`, `nuc_globals`, `nuc_stores`

## Quick Comparison

| Aspect | Layered | Feature-Sliced |
|--------|---------|----------------|
| Find code | Multiple folders | One folder |
| Add feature | Touch many places | Add one folder |
| Remove feature | Hunt scattered files | Delete one folder |

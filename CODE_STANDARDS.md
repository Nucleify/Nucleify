# Nucleify – Coding Standards

This document defines coding, structure, and naming standards for the Nucleify project.  
Following these standards ensures code is readable, consistent, and maintainable across backend and frontend layers.

## Table of Contents

- [Project Structure Overview](#project-structure-overview)
- [Module Structure](#module-structure)
- [Nuxt Frontend Structure](#nuxt-frontend-structure)
- [File and Folder Naming](#file-and-folder-naming)
- [Component Architecture](#component-architecture)
- [Coding Rules](#coding-rules)
- [Testing Standards](#testing-standards)
- [Module Guidelines](#module-guidelines)
- [Why These Standards](#why-these-standards)
- [Example: Creating a New Module](#example-creating-a-new-module)


---

## Project Structure Overview

```
root/
├── app/                    ← Laravel core application
│   ├── Console/            ← Artisan commands
│   ├── Exceptions/         ← Exception handlers
│   ├── Http/               ← Controllers, Middleware, Kernel
│   ├── Providers/          ← Service providers
│   ├── Services/           ← Shared services
│   └── Traits/             ← Reusable traits (Getters, Setters, Runners)
│
├── config/                 ← Laravel configuration files
│   ├── app.php
│   ├── database.php
│   ├── modules.php
│   └── ...
│
├── database/               ← Database layer
│   ├── factories/          ← Model factories
│   ├── migrations/         ← Database migrations
│   └── seeders/            ← Database seeders
│
├── routes/                 ← Route definitions
│   ├── api.php             ← API routes
│   ├── web.php             ← Web routes
│   └── modules.php         ← Module routes aggregator
│
├── modules/                ← Self-contained feature modules (backend + frontend)
│   └── <module_name>/
│
├── nuxt/                   ← Frontend application (Nuxt/Vue)
│   ├── atomic/             ← Atomic Design components
│   ├── pages/              ← Route pages
│   ├── layouts/            ← Layout templates
│   ├── composables/        ← Vue composables
│   ├── plugins/            ← Nuxt plugins
│   └── assets/             ← Global styles, images
│
└── tests/                  ← Global tests
```

---

## Module Structure

Each module is self-contained with both backend and frontend code:

```
modules/<module_name>/
├── app/                    ← Backend PHP code
│   ├── Controllers/        ← HTTP controllers
│   ├── Services/           ← Business logic
│   ├── Models/             ← Eloquent models
│   ├── Resources/          ← API resources
│   └── Requests/           ← Form requests
│
├── config/                 ← Module configuration (PHP)
│
├── database/               ← Module database files
│   ├── migrations/         ← Module-specific migrations
│   ├── seeders/            ← Module seeders
│   └── factories/          ← Module factories
│
├── routes/                 ← Module routes
│   └── api.php
│
├── atomic/                 ← Frontend components (TS/Vue/SCSS)
│   ├── components/         ← Vue components
│   ├── types/              ← TypeScript types
│   ├── utils/              ← Utility functions
│   └── constants/          ← Constants
│
├── tests/                  ← Backend PHP tests (Pest)
├── vitests/                ← Frontend tests (Vitest)
│
├── config.json             ← Module metadata
├── index.ts                ← Frontend entry point
├── <module_name>.ts        ← Main frontend module file
├── <module_name>.php       ← Main backend module file
├── _index.scss             ← Module styles entry (optional)
└── README.md               ← Module documentation
```

---

## Nuxt Frontend Structure

```
nuxt/
├── assets/                 ← Global assets
├── atomic/
│   ├── boson/              ← Utility functions, helpers
│   │   └── *.ts
│   │
│   ├── atom/               ← Basic UI components
│   │   └── <component>/
│   │       ├── index.vue
│   │       ├── index.ts
│   │       ├── index.stories.ts
│   │       ├── _index.scss
│   │       └── types/
│   │
│   ├── molecule/           ← Combined atoms
│   │   └── <component>/
│   │
│   └── organism/           ← Complex components
│       └── <component>/
│
├── composables/            ← Vue 3 composables
│   └── *.ts
│
├── layouts/                ← Layout templates
│   ├── default.vue
│   ├── back-office.vue
│   └── front-office.vue
│
├── pages/                  ← Route pages
│   ├── index.vue
│   ├── <page>.vue
│   └── <nested>/
│       └── *.vue
│
├── plugins/                ← Nuxt plugins
│   ├── modules.ts          ← Register modules from /modules folder
│   └── *.ts
│
└── server/                 ← Nuxt server configuration & utils
    └── *.ts
```

---

## File and Folder Naming

### Backend (Laravel/PHP)

| Type | Convention | Example |
|------|------------|---------|
| Module folders | `snake_case` | `nuc_auth`, `nuc_entities` |
| PHP classes | `PascalCase` | `UserController.php`, `AuthService.php` |
| Config files | `snake_case` | `nuc_auth.php` |
| Migration files | Laravel convention | `2024_01_01_000000_create_users_table.php` |
| Routes | `kebab-case` in URLs | `/api/user-profile` |

### Frontend (Nuxt/Vue/TypeScript)

| Type | Convention | Example |
|------|------------|---------|
| Vue components | `kebab-case` folders, `index.vue` | `input-text/index.vue` |
| TypeScript files | `snake_case` or `kebab-case` | `use_auth.ts`, `fetch-user.ts` |
| Type definitions | `PascalCase` in files | `UserProps`, `ButtonEmits` |
| Composables | `use` prefix | `useAuth.ts`, `useConfig.ts` |
| Constants | `SCREAMING_SNAKE_CASE` | `API_BASE_URL` |
| Entry points | `index.ts` / `index.vue` | Component main file |

---

## Component Architecture

### Atomic Design Hierarchy

1. **Boson** – Utility functions, transformations, helpers
2. **Atom** – Basic UI elements (Button, Input, Icon, Label)
3. **Molecule** – Simple combinations of atoms (FloatLabel, Anchor, Tile)
4. **Organism** – Complex components (DataTable, Dialog, Menu, Toast)
5. **Template** – Page-level layouts combining organisms (PageHeader, DashboardLayout)

### Component File Structure

```
<component>/
├── index.vue               ← Main component
├── index.ts                ← Exports & composition
├── index.stories.ts        ← Storybook stories (optional)
├── _index.scss             ← Component styles (optional)
└── types/
    ├── index.ts            ← Type exports
    ├── functions.ts        ← Component function types
    ├── interfaces.ts       ← Component interfaces
    └── variables.ts        ← Component variable types
```

---

## Coding Rules

### General

- Prefer **readability** over cleverness
- Follow **KISS** – Keep It Simple, Stupid
- Follow **DRY** – Don't Repeat Yourself
- Comment only when code intent is unclear
- Remove unused code, don't comment it out
- Keep functions small and focused

### TypeScript

- Use explicit types/interfaces; avoid `any`
- Export types from dedicated `types/` folders
- Use `const` assertions for literal types
- Prefer interfaces over type aliases for objects

### PHP

- Follow PSR-12 coding standard
- Use type hints for parameters and return types
- Separate concerns: Controllers → Services → Models

### Vue

- Use Composition API with `<script setup lang="ts">`
- Define props and emits with TypeScript
- Keep templates clean; move logic to composables
- Use `index.vue` as component entry point

---

## Testing Standards

### Backend (Pest/PHPUnit)

- Tests in `modules/<module>/tests/` or `tests/`
- Use Pest syntax for cleaner tests
- Group related tests with `describe()`
- Use factories for test data

### Frontend (Vitest)

- Tests in `modules/<module>/vitests/` or `vitests/`
- Test file naming: `*.test.ts`
- Mock external dependencies
- Test component behavior, not implementation

---

## Module Guidelines

- Each module should be **self-contained**
- Backend logic stays in `modules/<module>/app/`
- Frontend: `modules/<module>/atomic/` (or `components/` for simple modules)
- Global/shared components go in `nuxt/atomic/`
- Use `config.json` for module metadata
- Document module purpose in `README.md`

---

## Why These Standards

- Aligns with Laravel + Nuxt recommended patterns  
- Enables horizontal scaling with new modules  
- Maintains clear separation between backend/frontend  
- Atomic Design provides consistent UI architecture  
- Designed for scalability and future-proof development  
- Supports building modular, flexible, and forward-looking applications  
- Easy onboarding for new contributors

---

## Example: Creating a New Module

```bash
modules/nuc_example/
├── app/
│   ├── Controllers/
│   │   └── ExampleController.php
│   └── Services/
│       └── ExampleService.php
├── config/
│   └── nuc_example.php
├── database/
│   └── migrations/
│       └── 2024_01_01_000000_create_examples_table.php
├── routes/
│   └── api.php
├── atomic/
│   ├── bosons/
│   │   ├── constants/
│   │   │   ├── example.ts
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   ├── example.ts
│   │   │   └── index.ts
│   │   └── utils/
│   │       ├── example.ts
│   │       └── index.ts
│   ├── pages/
│   │   └── ExamplePage/
│   │       ├── index.vue
│   │       └── index.ts
│   ├── templates/
│   │   └── ExampleCard/
│   │       ├── index.vue
│   │       └── index.ts
│   └── types/
│       └── example.ts
├── tests/
│   └── ExampleTest.php
├── vitests/
│   └── example.test.ts
├── config.json
├── index.ts
├── nuc_example.ts
├── nuc_example.php
└── README.md
```

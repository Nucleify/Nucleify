# Introduction

## Build faster. Scale effortlessly. Ship with confidence.

**Nucleify** is the modular full-stack framework that eliminates the chaos of modern web development. One command to start. 40+ battle-tested modules ready to deploy. Zero configuration overhead.

> *"Stop reinventing the wheel. Start building your product. Now!"*

Powered by **Laravel 11** + **Nuxt 3** - the most powerful backend-frontend combination in the industry - Nucleify transforms months of development into days, while maintaining enterprise-grade code quality and 94+ PageSpeed scores out of the box.

---

## What is Nucleify?

Behind the speed is a **nucleus-inspired modular architecture** - every feature lives as a self-contained, independently testable module. No more tangled dependencies. No more "it works on my machine". Just clean, predictable code that scales with your team and your ambitions.

**Laravel 11** handles your API, authentication, and business logic. **Nuxt 3** delivers blazing-fast SSR and a reactive frontend. Nucleify bridges them seamlessly - one codebase, one workflow, infinite possibilities.

### The Numbers

| Metric | Value |
|--------|-------|
| **Time to MVP** | < 5 minutes setup |
| **Accessibility** | WCAG 2.1 AA compliant |
| **PageSpeed Score** | 94/100 |
| **SEO Score** | 100/100 |
| **Test Coverage** | 92% |
| **Production-Ready Modules** | 40+ |
| **UI Components** | 100+ |

### What You Get

- **40+ Production-Ready Modules** - Auth, files, charts, datatables, animations - all pre-built
- **Full-Stack Type Safety** - TypeScript + PHP type hints = zero runtime surprises
- **Atomic Design System** - 100+ components following industry best practices
- **Override System** - Customize any module without forking, preserve upgrade paths
- **One-Command Setup** - `make` and you're running

---

## Why Choose Nucleify?

| Challenge | ❌ Traditional Approach | ✅ Nucleify Solution |
|-----------|---------------------|-------------------|
| **Growing Complexity** | Monolithic codebase becomes unmanageable | Self-contained modules scale independently |
| **Code Reusability** | Copy-paste across projects | Modules are portable and shareable |
| **Testing Difficulty** | Tightly coupled code is hard to test | Isolated modules enable focused testing |
| **Team Collaboration** | Merge conflicts and stepping on toes | Teams own specific modules |

---

## Architecture Overview

Nucleify implements a **seamless bridge** between Laravel and Nuxt:

```txt
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                    NUXT 3 FRONTEND                                     │
│                                                                                        │
│  ┌────────────────────┐  ┌────────────────────┐  ┌──────────────────────────────────┐  │
│  │       Pages        │  │      Layouts       │  │        Atomic Components         │  │
│  │      (Router)      │  │  (Default, Admin)  │  │  (Atoms, Molecules, Organisms)   │  │
│  └────────────────────┘  └────────────────────┘  └──────────────────────────────────┘  │
│                                           │                                            │
│  ┌────────────────────────────────────────▼─────────────────────────────────────────┐  │
│  │                              PINIA STATE MANAGEMENT                              │  │
│  │                         (Persisted, Reactive, Type-Safe)                         │  │
│  └────────────────────────────────────────┬─────────────────────────────────────────┘  │
│                                           │                                            │
│  ┌────────────────────────────────────────▼─────────────────────────────────────────┐  │
│  │                           nuc_api MODULE (HTTP Layer)                            │  │
│  │                         Laravel Sanctum Authentication                           │  │
│  └────────────────────────────────────────┬─────────────────────────────────────────┘  │
└───────────────────────────────────────────┼────────────────────────────────────────────┘
                                            │
                                         REST API
                                            │
┌───────────────────────────────────────────▼────────────────────────────────────────────┐
│                                   LARAVEL 11 BACKEND                                   │
│                                                                                        │
│  ┌─────────────────────────┐  ┌──────────────────────────┐  ┌───────────────────────┐  │
│  │       Controllers       │  │         Services         │  │        Models         │  │
│  │         (HTTP)          │◄─│     (Business Logic)     │◄─│     (Eloquent ORM)    │  │
│  └─────────────────────────┘  └──────────────────────────┘  └───────────────────────┘  │
│                                            │                                           │
│  ┌─────────────────────────────────────────▼────────────────────────────────────────┐  │
│  │                                   MySQL DATABASE                                 │  │
│  └──────────────────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Core Design Principles

### Atomic Design

UI components organized into a hierarchical structure for maximum reusability. All components use the `ad-` prefix (Atomic Design):

| Level | Description | Examples |
|-------|-------------|----------|
| **Boson** | Utility functions, constants, types | `camelToKebab()`, `API_BASE_URL` |
| **Atom** | Fundamental UI elements | `<ad-button>`, `<ad-input-text>`, `<ad-avatar>` |
| **Molecule** | Combinations of atoms | `<ad-float-label>`, `<ad-anchor>`, `<ad-tile>` |
| **Organism** | Complex component structures | `<ad-data-table>`, `<ad-dialog>`, `<ad-chart>` |

### Modular Architecture

Nucleify ships with **40+ production-ready modules** organized by domain:

| Category | Modules |
|----------|---------|
| **Core** | `nuc_modules`, `nuc_api`, `nuc_stores`, `nuc_globals` |
| **Auth** | `nuc_auth`, `nuc_friendship`, `nuc_activity` |
| **Data** | `nuc_entities`, `nuc_files`, `nuc_database`, `nuc_fields` |
| **UI** | `nuc_charts`, `nuc_datatable`, `nuc_dialog`, `nuc_navigation` |
| **Visual** | `nuc_animations`, `nuc_colors`, `nuc_screen_loader`, `nuc_screen_lights` |
| **Layout** | `nuc_pages`, `nuc_sections`, `nuc_templates` |

Each module is self-contained, independently testable, and can be enabled/disabled as needed.

### Feature-Sliced Design

Each module encapsulates all related code within a single directory:

```txt
modules/nuc_auth/
├── app/                    # Backend PHP (Controllers, Services, Models)
├── atomic/                 # Frontend components (Vue, TypeScript)
├── database/               # Migrations, Seeders, Factories
├── routes/                 # API route definitions
├── tests/                  # Pest PHP tests
├── vitests/                # Vitest frontend tests
└── config.json             # Module metadata
```

### Override System

The `nuc_overrides` module provides a powerful customization layer without modifying core code:

```
overrides/
├── modules/
│   └── nuc_settings/       # Override nuc_settings module
│       ├── components/     # Custom components
│       └── constants/      # Custom constants
└── nuxt/
    └── atomic/             # Override global Nuxt atomic components
        ├── atom/           # Custom atoms
        ├── molecule/       # Custom molecules
        └── organism/       # Custom organisms
```

Overrides are automatically merged at build time, allowing you to:
- **Customize UI components** without forking modules
- **Extend functionality** while preserving upgrade paths
- **Project-specific modifications** that stay isolated from core code
- **Update framework freely** - your customizations survive `git pull`

---

## Technology Stack

| Layer | Technologies |
|-------|-------------|
| **Backend** | Laravel 11, PHP 8.2+, Laravel Sanctum, Pest PHP |
| **Frontend** | Nuxt 3, Vue 3, TypeScript, Pinia, PrimeVue 4 |
| **Styling** | SCSS, GSAP, Chart.js |
| **DevOps** | Docker, Vite, Husky, Biome, TSC, Stylelint |
| **Testing** | Pest, Vitest |

---

## Next Steps

1. **[Installation](/en/docs/getting-started/installation)** - Set up your development environment
2. **[Quick Start](/en/docs/getting-started/quick-start)** - Create your first component
3. **[Modules](/en/docs/modules/overview)** - Explore available modules
4. **[Architecture](/en/docs/architecture/overview)** - Deep dive into system design

# Introduction

## Build faster. Scale effortlessly. Ship with confidence.

**Nucleify** is the modular full-stack framework that eliminates the chaos of modern web development. One command to start. 40+ battle-tested modules ready to deploy. Zero configuration overhead.

> *"Stop reinventing the wheel. Start building your product. Now!"*

Powered by **Supabase** + **Nuxt 3** / **Next.js** — Nucleify gives you a modular full-stack app with PostgreSQL, Auth, and a unified module API gateway, plus 94+ PageSpeed scores out of the box.

---

## What is Nucleify?

Behind the speed is a **nucleus-inspired modular architecture** - every feature lives as a self-contained, independently testable module. No more tangled dependencies. No more "it works on my machine". Just clean, predictable code that scales with your team and your ambitions.

**Supabase** stores data, authenticates users, and serves files. **Nuxt 3** or **Next.js** delivers SSR and a reactive UI. Module handlers in `supabase/api/` connect the two through `/api/*` — one codebase, one workflow.

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
- **Full-Stack Type Safety** - TypeScript end to end, typed API composables
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

Nucleify connects the **frontend** to **Supabase** through a module API gateway:

```txt
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                          NUXT 3 / NEXT (frontend + /api routes)                        │
│                                                                                        │
│  ┌────────────────────┐  ┌────────────────────┐  ┌──────────────────────────────────┐  │
│  │       Pages        │  │      Layouts       │  │        Atomic Components         │  │
│  │      (Router)      │  │  (Default, Admin)  │  │  (Atoms, Molecules, Organisms)   │  │
│  └────────────────────┘  └────────────────────┘  └──────────────────────────────────┘  │
│                                           │                                            │
│  ┌────────────────────────────────────────▼─────────────────────────────────────────┐  │
│  │                        PINIA / ZUSTAND STATE MANAGEMENT                         │  │
│  └────────────────────────────────────────┬─────────────────────────────────────────┘  │
│                                           │                                            │
│  ┌────────────────────────────────────────▼─────────────────────────────────────────┐  │
│  │                    nuc_api — apiRequest, Supabase Auth (client)                  │  │
│  └────────────────────────────────────────┬─────────────────────────────────────────┘  │
└───────────────────────────────────────────┼────────────────────────────────────────────┘
                                            │  /api/*
┌───────────────────────────────────────────▼────────────────────────────────────────────┐
│                        MODULE HANDLERS (supabase/api/handle.ts)                        │
│                         nuc_api gateway — service role client                          │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
┌───────────────────────────────────────────▼────────────────────────────────────────────┐
│                                  SUPABASE (PostgreSQL)                                 │
│                         Auth · Storage · RLS · Edge Functions                          │
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

Nucleify ships with production-ready modules organized by domain:

| Category | Modules |
|----------|---------|
| **Core** | `nuc_modules`, `nuc_api`, `nuc_stores`, `nuc_globals` |
| **Auth** | `nuc_users`, `nuc_activity` |
| **Data** | `nuc_entities` |
| **UI** | `nuc_templates` (charts, dock, dialog, datatable, sections) |
| **Visual** | `nuc_globals` (animations), `nuc_colors` |
| **Layout** | `nuc_pages`, `nuc_templates` |

Each module is self-contained, independently testable, and can be enabled/disabled as needed.

### Feature-Sliced Design

Each module encapsulates all related code within a single directory:

```txt
modules/nuc_users/
├── atomic/                 # Vue/React components & composables
├── supabase/               # SQL migrations, seeders, API handlers
│   ├── migrations/
│   ├── seeders/
│   └── api/handle.ts
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
| **Backend** | Supabase (PostgreSQL, Auth, Storage), module API gateway |
| **Frontend** | Nuxt 3 / Next.js, Vue 3 / React, TypeScript, Pinia / Zustand, nucleify-ui |
| **Styling** | SCSS, GSAP, Chart.js |
| **DevOps** | Supabase CLI, Vite, Husky, Biome, TSC, Stylelint |
| **Testing** | Vitest |

---

## Next Steps

1. **[Installation](/en/docs/getting-started/installation)** - Set up your development environment
2. **[Quick Start](/en/docs/getting-started/quick-start)** - Create your first component
3. **[Modules](/en/docs/modules/overview)** - Explore available modules
4. **[Architecture](/en/docs/architecture/overview)** - Deep dive into system design

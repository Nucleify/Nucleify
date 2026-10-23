# People & Credits

The people and projects that make Nucleify possible.

---

## Core team

### Creator & lead

| Name | Role | GitHub |
|------|------|--------|
| Szymon Wieczorek | Architecture, compiler, modules, full-stack development | [@szymcode](https://github.com/szymcode) |

---

## Contributors

Thank you to everyone who has contributed to Nucleify! (Human contributors only - automation bots are omitted.)

| Name | GitHub |
|------|--------|
| Katarzyna Śmierzchalska | [@KatarzynaS97](https://github.com/KatarzynaS97) |
| Kamil D. | [@K4mD4m](https://github.com/K4mD4m) |
| Marcin Fuks | [@J0jeQ](https://github.com/J0jeQ) |
| Jakub Malik | [@JakubMalik](https://github.com/JakubMalik) |
| Kacper Bujak | [@kbujak09](https://github.com/kbujak09) |
| – | [@karol199393](https://github.com/karol199393) |
| – | [@domizalewska](https://github.com/domizalewska) |
| Kamil Błoski | [@kbloski](https://github.com/kbloski) |
| – | [@Kacper658](https://github.com/Kacper658) |
| Mateusz Szymański | [@dezmerek](https://github.com/dezmerek) |
| – | [@pysifoo](https://github.com/pysifoo) |

All contributors are listed on our [GitHub Contributors](https://github.com/Nucleify/Nucleify/graphs/contributors) page.

---

## Built with

Nucleify is built on top of open source projects:

### Backend & data

| Project | Description |
|---------|-------------|
| [Supabase](https://supabase.com) | PostgreSQL, Auth, Storage, Edge Functions |
| [@supabase/supabase-js](https://github.com/supabase/supabase-js) | JavaScript client |

### Frontend

| Project | Description |
|---------|-------------|
| [Vue 3](https://vuejs.org) | Canonical UI framework (Nuxt/Vue source) |
| [Nuxt 4](https://nuxt.com) | Vue full-stack framework |
| [React 19](https://react.dev) | Compiler-generated UI target (convert / emit) |
| [Next.js 15](https://nextjs.org) | React full-stack framework |
| [Solid](https://www.solidjs.com) | Convert / emit target (signals) |
| [Svelte](https://svelte.dev) | Convert / emit target (Svelte 5 runes) |
| [nucleify-ui](https://www.npmjs.com/package/nucleify-ui) | Lit web component library (`nui-*`) |
| [Lit](https://lit.dev) | Web components for design system primitives |

### Compiler & tooling

| Project | Description |
|---------|-------------|
| [TypeScript](https://www.typescriptlang.org) | Type safety across the stack |
| [Vite](https://vitejs.dev) | Build tool (Nuxt / Vitest) |
| [SCSS](https://sass-lang.com) | CSS preprocessor |
| [Biome](https://biomejs.dev) | Formatting and linting |
| [Vitest](https://vitest.dev) | Unit and integration tests |
| [pnpm](https://pnpm.io) | Monorepo package manager |
| [Astro](https://astro.build) | Documentation site (`@nucleify/docs`) |

---

## Architecture influences

| Idea | Source |
|------|--------|
| Feature-Sliced Design | [feature-sliced.design](https://feature-sliced.design) - domain-first module layout |
| Atomic Design | [Brad Frost](https://atomicdesign.bradfrost.com) - SCSS component hierarchy in `nuc_colors` |
| Portable UI / IR compilers | Nucleify's own `@nucleify/compiler` - `*.nuc.tsx` → Vue + React + Solid + Svelte |

---

## Special thanks

- The Supabase, Vue, React, Nuxt, Astro, Svelte, and Solid communities
- Everyone who has reported bugs or suggested features
- Open source maintainers everywhere

---

## Want to contribute?

We welcome contributions of all kinds:

- Bug reports
- Feature suggestions
- Documentation improvements
- Code contributions

Start with [Coding Standards](/en/docs/about/coding-standards) and [Code of Conduct](/en/docs/about/code-of-conduct).

---

## License

Nucleify is open source software licensed under the [MIT License](https://opensource.org/licenses/MIT).

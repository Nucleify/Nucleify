# Ludzie i podziękowania

Ludzie i projekty, które czynią Nucleify możliwym.

---

## Zespół core

### Twórca i lider

| Imię i nazwisko | Rola | GitHub |
|-----------------|------|--------|
| Szymon Wieczorek | Architektura, kompilator, moduły, development full-stack | [@szymcode](https://github.com/szymcode) |

---

## Kontrybutorzy

Dziękujemy wszystkim, którzy przyczynili się do Nucleify! (Tylko osoby - boty automatyzacji pomijamy.)

| Imię i nazwisko | GitHub |
|-----------------|--------|
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

Wszyscy kontrybutorzy są wymienieni na stronie [GitHub Contributors](https://github.com/Nucleify/Nucleify/graphs/contributors).

---

## Zbudowane z

Nucleify stoi na projektach open source:

### Backend i dane

| Projekt | Opis |
|---------|------|
| [Supabase](https://supabase.com) | PostgreSQL, Auth, Storage, Edge Functions |
| [@supabase/supabase-js](https://github.com/supabase/supabase-js) | Klient JavaScript |

### Frontend

| Projekt | Opis |
|---------|------|
| [Vue 3](https://vuejs.org) | Kanoniczny framework UI (źródło Nuxt/Vue) |
| [Nuxt 4](https://nuxt.com) | Framework full-stack Vue |
| [React 19](https://react.dev) | Cel UI kompilatora (convert / emit) |
| [Next.js 15](https://nextjs.org) | Framework full-stack React |
| [Solid](https://www.solidjs.com) | Cel convert / emit (sygnały) |
| [Svelte](https://svelte.dev) | Cel convert / emit (runy Svelte 5) |
| [nucleify-ui](https://www.npmjs.com/package/nucleify-ui) | Biblioteka web components Lit (`nui-*`) |
| [Lit](https://lit.dev) | Web components dla prymitywów design systemu |

### Kompilator i narzędzia

| Projekt | Opis |
|---------|------|
| [TypeScript](https://www.typescriptlang.org) | Type safety w całym stacku |
| [Vite](https://vitejs.dev) | Narzędzie build (Nuxt / Vitest) |
| [SCSS](https://sass-lang.com) | Preprocesor CSS |
| [Biome](https://biomejs.dev) | Formatowanie i linting |
| [Vitest](https://vitest.dev) | Testy jednostkowe i integracyjne |
| [pnpm](https://pnpm.io) | Menedżer pakietów monorepo |
| [Astro](https://astro.build) | Strona dokumentacji (`@nucleify/docs`) |

---

## Wpływy architektoniczne

| Idea | Źródło |
|------|--------|
| Feature-Sliced Design | [feature-sliced.design](https://feature-sliced.design) - układ modułów domena-first |
| Atomic Design | [Brad Frost](https://atomicdesign.bradfrost.com) - hierarchia SCSS w `nuc_colors` |
| Portable UI / IR | `@nucleify/compiler` - `*.nuc.tsx` → Vue + React + Solid + Svelte |

---

## Specjalne podziękowania

- Społecznościom Supabase, Vue, React, Nuxt, Astro, Svelte i Solid
- Wszystkim, którzy zgłaszali błędy lub sugerowali funkcje
- Maintainerom open source wszędzie

---

## Chcesz kontrybuować?

Zapraszamy wkłady wszelkiego rodzaju:

- Raporty błędów
- Sugestie funkcji
- Ulepszenia dokumentacji
- Wkład kodowy

Zacznij od [Standardów kodowania](/pl/docs/about/coding-standards) i [Kodeksu postępowania](/pl/docs/about/code-of-conduct).

---

## Licencja

Nucleify to oprogramowanie open source na licencji [MIT License](https://opensource.org/licenses/MIT).

import type { DocCategoryInterface } from '../types/interfaces'

export const DOC_CATEGORIES: DocCategoryInterface[] = [
  {
    name: { en: 'Getting Started', pl: 'Pierwsze kroki' },
    slug: 'getting-started',
    order: 1,
    pages: [
      {
        slug: 'introduction',
        title: { en: 'Introduction', pl: 'Wprowadzenie' },
        order: 1,
      },
      {
        slug: 'installation',
        title: { en: 'Installation', pl: 'Instalacja' },
        order: 2,
      },
      {
        slug: 'quick-start',
        title: { en: 'Quick Start', pl: 'Szybki start' },
        order: 3,
      },
    ],
  },
  {
    name: { en: 'Core Concepts', pl: 'Koncepcje' },
    slug: 'core-concepts',
    order: 2,
    pages: [
      {
        slug: 'monorepo',
        title: { en: 'Monorepo Layout', pl: 'Układ monorepo' },
        order: 1,
      },
      {
        slug: 'compiler',
        title: { en: 'Compiler', pl: 'Kompilator' },
        order: 2,
      },
      {
        slug: 'modules',
        title: { en: 'Modules', pl: 'Moduły' },
        order: 3,
      },
      {
        slug: 'feature-sliced-design',
        title: {
          en: 'Feature Sliced Design',
          pl: 'Feature-Sliced Design',
        },
        order: 4,
      },
      {
        slug: 'overriding',
        title: { en: 'Overriding', pl: 'Nadpisywanie' },
        order: 5,
      },
    ],
  },
  {
    name: { en: 'Configuration', pl: 'Konfiguracja' },
    slug: 'configuration',
    order: 3,
    pages: [
      {
        slug: 'environment',
        title: { en: 'Environment', pl: 'Zmienne środowiskowe' },
        order: 1,
      },
      {
        slug: 'web',
        title: { en: 'Web & Admin', pl: 'Web & Admin' },
        order: 2,
      },
      {
        slug: 'supabase',
        title: { en: 'Supabase', pl: 'Supabase' },
        order: 3,
      },
    ],
  },
  {
    name: { en: 'Tests', pl: 'Testy' },
    slug: 'tests',
    order: 4,
    pages: [{ slug: 'vitest', title: { en: 'Vitest', pl: 'Vitest' }, order: 1 }],
  },
  {
    name: { en: 'About', pl: 'O projekcie' },
    slug: 'about',
    order: 5,
    pages: [
      {
        slug: 'philosophy',
        title: { en: 'Philosophy', pl: 'Filozofia' },
        order: 1,
      },
      {
        slug: 'coding-standards',
        title: { en: 'Coding Standards', pl: 'Standardy kodowania' },
        order: 2,
      },
      {
        slug: 'code-of-conduct',
        title: { en: 'Code of Conduct', pl: 'Kodeks postępowania' },
        order: 3,
      },
      {
        slug: 'people-and-credits',
        title: { en: 'People & Credits', pl: 'Ludzie i podziękowania' },
        order: 4,
      },
    ],
  },
]

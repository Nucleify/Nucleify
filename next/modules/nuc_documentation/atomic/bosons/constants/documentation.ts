import type { DocCategoryInterface } from '../types'

export const DOC_CATEGORIES: DocCategoryInterface[] = [
  {
    name: 'Getting Started',
    slug: 'getting-started',
    order: 1,
    pages: [
      { slug: 'introduction', title: 'Introduction', order: 1 },
      { slug: 'installation', title: 'Installation', order: 2 },
      { slug: 'quick-start', title: 'Quick Start', order: 3 },
    ],
  },
  {
    name: 'Core Concepts',
    slug: 'core-concepts',
    order: 2,
    pages: [
      { slug: 'atomic-design', title: 'Atomic Design', order: 1 },
      {
        slug: 'feature-sliced-design',
        title: 'Feature Sliced Design',
        order: 2,
      },
      { slug: 'modules', title: 'Modules', order: 3 },
      { slug: 'overriding', title: 'Overriding', order: 4 },
    ],
  },
  {
    name: 'Configuration',
    slug: 'configuration',
    order: 3,
    pages: [
      { slug: 'environment', title: 'Environment', order: 1 },
      { slug: 'nuxt', title: 'Nuxt', order: 2 },
      { slug: 'laravel', title: 'Laravel', order: 3 },
    ],
  },
  {
    name: 'Tests',
    slug: 'tests',
    order: 4,
    pages: [
      { slug: 'pest', title: 'Pest', order: 1 },
      { slug: 'vitest', title: 'Vitest', order: 2 },
    ],
  },
  {
    name: 'About',
    slug: 'about',
    order: 5,
    pages: [
      { slug: 'philosophy', title: 'Philosophy', order: 1 },
      { slug: 'coding-standards', title: 'Coding Standards', order: 2 },
      { slug: 'code-of-conduct', title: 'Code of Conduct', order: 3 },
      { slug: 'people-and-credits', title: 'People & Credits', order: 4 },
    ],
  },
]

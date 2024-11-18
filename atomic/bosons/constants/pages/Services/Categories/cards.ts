import { ref, Ref, UnwrapRef } from 'vue'

import { CardCategorySingleInterface } from 'atomic/bosons/types'

export const servicesCategoriesCards: Ref<
  UnwrapRef<CardCategorySingleInterface[]>
> = ref([
  {
    image: 'open_source.svg',
    altText: 'Open source image',
    title: 'Open Source',
    description:
      'Flexible, transparent solutions with full control over data and processes.',
    url: '/open-source',
  },
  {
    image: 'data_storage.svg',
    altText: 'Data storage image',
    title: 'Data Storage',
    description:
      'Secure, optimized storage to keep your data protected and accessible.',
    url: '/data-storage',
  },

  {
    image: 'data_migration.svg',
    altText: 'Data Migration image',
    title: 'Data Migration',
    description: 'Quick, seamless data transfers with minimal downtime risk.',
    url: '/data-migration',
  },
  {
    image: 'data_integration.svg',
    altText: 'Data integration image',
    title: 'Data Integration',
    description:
      'Unified data view by connecting sources for comprehensive analysis.',
    url: '/data-integration',
  },
  {
    image: 'data_analysis.svg',
    altText: 'Data analysis image',
    title: 'Data Analysis',
    description: 'Powerful tools to turn data into actionable insights.',
    url: '/data-analysis',
  },
  {
    image: 'page_builder.svg',
    altText: 'Page builder image',
    title: 'Page Builder',
    description:
      'Build custom pages and reports effortlessly for clear data display.',
    url: '/page-builder',
  },
])

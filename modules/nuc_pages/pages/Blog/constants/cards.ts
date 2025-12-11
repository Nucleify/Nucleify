import type { Ref, UnwrapRef } from 'vue'
import { ref } from 'vue'

import type { NucCardCategoryInterface } from 'atomic'

export const blogCategoriesCards: Ref<UnwrapRef<NucCardCategoryInterface[]>> =
  ref([
    {
      image: 'world.svg',
      altText: 'Open Source',
      title: 'Integrations',
      description:
        'Explore why open-source solutions are essential for innovation, transparency, and control in modern tech.',
      url: '/home',
    },
    {
      image: 'automate.svg',
      altText: 'Automate Data image',
      title: 'Automation',
      description:
        'A guide to streamlining your data processes, reducing manual work, and improving efficiency.',
      url: '/home',
    },

    {
      image: 'data_security.svg',
      altText: 'Data security image',
      title: 'Data Security',
      description:
        'Key strategies and tools to protect your data from evolving threats and ensure privacy compliance.',
      url: '/home',
    },
  ])

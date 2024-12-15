import { ref, Ref, UnwrapRef } from 'vue'

import { CardCategoryInterface } from 'atomic'

export const blogCategoriesCards: Ref<UnwrapRef<CardCategoryInterface[]>> = ref(
  [
    {
      image: 'world.svg',
      altText: "Open Source in Today's World image",
      title: "Open Source in Today's World",
      description:
        'Explore why open-source solutions are essential for innovation, transparency, and control in modern tech.',
      url: '/open-source-world',
    },
    {
      image: 'automate.svg',
      altText: 'Automate Data image',
      title: 'How to Automate Your Data Pipeline',
      description:
        'A guide to streamlining your data processes, reducing manual work, and improving efficiency.',
      url: '/automate-data',
    },

    {
      image: 'data_security.svg',
      altText: 'Data security image',
      title: 'Data Security',
      description:
        'Key strategies and tools to protect your data from evolving threats and ensure privacy compliance.',
      url: '/data-security',
    },
    {
      image: 'scalable_website.svg',
      altText: 'Scalable Website image',
      title: 'Building a Scalable Website',
      description:
        'Learn the fundamentals of creating a website that can grow and adapt with your business needs.',
      url: '/scalable-website',
    },
    {
      image: 'tools.svg',
      altText: 'Tools for Business image',
      title: 'The Best Tools for Every Business',
      description:
        'Discover top tools for productivity, data management, and growth, tailored to any business size.',
      url: '/tools-business',
    },
  ]
)

import { ref, Ref, UnwrapRef } from 'vue'

import { CardCategorySingleInterface } from 'atomic/bosons/types'

export const aboutCategoriesCards: Ref<
  UnwrapRef<CardCategorySingleInterface[]>
> = ref([
  {
    image: 'purpose.svg',
    altText: 'Purpose image',
    title: 'Purpose',
    description:
      'Our goal is to provide secure and reliable data management solutions.',
    url: '/purpose',
  },
  {
    image: 'support_us.svg',
    altText: 'Support Us image',
    title: 'Support Us',
    description:
      'Your contribution matters! If you want to support our business, you can do this.',
    url: '/support-us',
  },

  {
    image: 'collaboration.svg',
    altText: 'Collaboration image',
    title: 'Collaboration',
    description:
      'Openness to partnerships allows us to continuously develop our platform.',
    url: '/collaboration',
  },
  {
    image: 'license.svg',
    altText: 'License image',
    title: 'License',
    description:
      'Our platform operates in accordance with the principles of open license.',
    url: '/license',
  },
  {
    image: 'contact.svg',
    altText: 'Contact image',
    title: 'Contact',
    description:
      'If you have any questions or need assistance, feel free to reach out.',
    url: '/contact',
  },
])

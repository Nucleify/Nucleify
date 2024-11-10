import { ref, Ref, UnwrapRef } from 'vue'

import { AboutCategoryCardInterface } from 'atomic/bosons/types'

export const aboutCategoriesCards: Ref<UnwrapRef<AboutCategoryCardInterface>> =
  ref([
    {
      image: 'Purpose.svg',
      altText: 'Purpose image',
      title: 'Purpose',
      description:
        'Our goal is to provide secure and reliable data management solutions.',
      url: '/purpose',
    },
    {
      image: 'SupportUs.svg',
      altText: 'Support Us image',
      title: 'Support Us',
      description:
        'Your contribution matters! If you want to support our business, you can you can do this by recommending our platform to others.',
      url: '/support-us',
    },

    {
      image: 'Collaboration.jpg',
      altText: 'Collaboration image',
      title: 'Collaboration',
      description:
        'Openness to partnerships and innovation allows us to continuously develop our platform and meet the needs of our customers.',
      url: '/collaboration',
    },
    {
      image: 'License.svg',
      altText: 'License image',
      title: 'License',
      description:
        'Our platform operates in accordance with the principles of open license. This means that users are free to use our services.',
      url: '/license',
    },
    {
      image: 'Contact.svg',
      altText: 'Contact image',
      title: 'Contact',
      description:
        'Do you have questions? We are here to help! Contact us write directly to our e-mail address: contact@yourcompany.com',
      url: '/contact',
    },
  ])

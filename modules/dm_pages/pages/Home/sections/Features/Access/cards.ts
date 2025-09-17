import type { DmFlipCardInterface } from 'atomic'

export const accessCards: DmFlipCardInterface[] = [
  {
    frontImage: 'desktop.webp',
    frontImageAlt: 'Desktop image',
    frontImageWidth: '122px',
    frontImageHeight: '92px',
    frontTitle: 'Desktop',
    backContent:
      'Responsive web design was coined in 2010 by Ethan Marcotte, optimizing layouts for desktops with flexible grids and layouts.',
    backContentClass: 'mt-2',
  },
  {
    frontImage: 'tablet.webp',
    frontImageAlt: 'Tablet image',
    frontImageWidth: '75px',
    frontImageHeight: '100px',
    frontTitle: 'Tablet',
    backContent:
      'Over 53% of internet users worldwide access the web through mobile devices, highlighting the significant shift towards mobile browsing in recent years.',
  },
  {
    frontImage: 'phone.webp',
    frontImageAlt: 'Phone image',
    frontImageWidth: '54px',
    frontImageHeight: '100px',
    frontTitle: 'Phone',
    backContent:
      "Google's implementation of mobile-first indexing in 2018 underscored the importance of mobile-responsive design, prioritizing mobile versions for indexing and ranking.",
    backContentClass: '',
  },
]

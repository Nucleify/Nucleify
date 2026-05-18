import { Carousel } from 'primereact/carousel'
import type { JSX } from 'react'

import type { CarouselInterface } from './types'

export function AdCarousel({
  className = '',
  ...rest
}: CarouselInterface): JSX.Element {
  const mergedClassName = ['ad-carousel', className].filter(Boolean).join(' ')

  return <Carousel {...rest} className={mergedClassName || undefined} />
}

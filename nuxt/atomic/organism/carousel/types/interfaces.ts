import type { CarouselResponsiveOptions } from 'primevue'

import type { ElementDirectionType } from 'atomic'

export interface CarouselInterface {
  value?: unknown[]
  page?: number
  numVisible?: number
  numScroll?: number
  responsiveOptions?: CarouselResponsiveOptions[]
  orientation?: ElementDirectionType
  verticalViewPortHeight?: string
  containerClass?: string
  contentClass?: string
  indicatorsContentClass?: string
  circular?: boolean
  autoplayInterval?: number
  showNavigators?: boolean
  showIndicators?: boolean
  prevButtonProps?: object
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}

import { CarouselResponsiveOptions } from 'primevue'

import { ElementDirectionType } from 'atomic'

export interface CarouselInterface {
  value?: any // eslint-disable-line
  page?: number
  numVisible?: number
  numScroll?: number
  responsiveOptions?: CarouselResponsiveOptions[]
  orientation?: ElementDirectionType
  verticalViewPortHeight?: string
  containerClass?: any // eslint-disable-line
  contentClass?: any // eslint-disable-line
  indicatorsContentClass?: any // eslint-disable-line
  circular?: boolean
  autoplayInterval?: number
  showNavigators?: boolean
  showIndicators?: boolean
  prevButtonProps?: object
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
}

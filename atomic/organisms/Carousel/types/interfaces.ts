import { PassThrough } from 'primevue/ts-helpers'
import { CarouselPassThroughOptions, CarouselResponsiveOptions } from 'primevue'

import { ElementDirectionType } from 'atomic'

export interface CarouselInterface {
  value?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  page?: number
  numVisible?: number
  numScroll?: number
  responsiveOptions?: CarouselResponsiveOptions[]
  orientation?: ElementDirectionType
  verticalViewPortHeight?: string
  containerClass?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  contentClass?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  indicatorsContentClass?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  circular?: boolean
  autoplayInterval?: number
  showNavigators?: boolean
  showIndicators?: boolean
  prevButtonProps?: object
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<CarouselPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}

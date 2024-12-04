import { PassThrough } from 'primevue/ts-helpers'
import { GalleriaPassThroughOptions, GalleriaResponsiveOptions } from 'primevue'
import { ButtonHTMLAttributes, HTMLAttributes } from 'vue'
import { PositionType } from 'atomic/bosons/types'

export interface GalleriaInterface {
  item?: GalleriaImageItem[]
  id?: string
  value?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  activeIndex?: number
  fullScreen?: boolean
  visible?: boolean
  numVisible?: number
  responsiveOptions?: GalleriaResponsiveOptions[]
  showItemNavigators?: boolean
  showThumbnailNavigators?: boolean
  showItemNavigatorsOnHover?: boolean
  changeItemInIndicatorHover?: boolean
  circular?: boolean
  autoPlay?: boolean
  transitionInterval?: number
  showThumbnails?: boolean
  thumbnailsPosition?: PositionType
  verticalThumbnailViewPortHeight?: string
  showIndicators?: boolean
  showIndicatorsOnItem?: boolean
  indicatorsPosition?: PositionType
  baseZIndex?: number
  maskClass?: string
  containerStyle?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  containerClass?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  containerProps?: HTMLAttributes
  prevButtonProps?: ButtonHTMLAttributes
  nextButtonProps?: ButtonHTMLAttributes
  ariaLabel?: string
  ariaRoledescription?: string
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<GalleriaPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}

export interface GalleriaImageItem {
  itemImageSrc: string
  thumbnailImageSrc: string
  alt: string
}

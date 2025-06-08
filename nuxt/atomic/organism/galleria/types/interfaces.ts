import type { GalleriaResponsiveOptions } from 'primevue'
import type { ButtonHTMLAttributes, HTMLAttributes } from 'vue'

import type { PositionType } from 'atomic'

export interface GalleriaInterface {
  item?: GalleriaImageItem[]
  id?: string
  value?: unknown[]
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
  containerStyle?: object
  containerClass?: string
  containerProps?: HTMLAttributes
  prevButtonProps?: ButtonHTMLAttributes
  nextButtonProps?: ButtonHTMLAttributes
  ariaLabel?: string
  ariaRoledescription?: string
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}

export interface GalleriaImageItem {
  itemImageSrc: string
  thumbnailImageSrc: string
  alt: string
}

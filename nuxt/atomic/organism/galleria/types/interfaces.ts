import type { GalleriaProps } from 'primevue'

export interface GalleriaInterface extends GalleriaProps {
  items?: GalleriaImageItem[]
}

export interface GalleriaImageItem {
  itemImageSrc: string
  thumbnailImageSrc: string
  alt: string
}

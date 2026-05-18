import type { GalleriaProps } from 'primereact/galleria'

export interface GalleriaInterface extends GalleriaProps {
  items?: GalleriaImageItem[]
}

export interface GalleriaImageItem {
  itemImageSrc: string
  thumbnailImageSrc: string
  alt: string
}

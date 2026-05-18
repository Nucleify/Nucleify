import type { ImageProps } from 'primereact/image'

export interface ImageInterface extends ImageProps {
  alt?: string
  width?: string
  height?: string
  fetchpriority?: 'high' | 'low'
}

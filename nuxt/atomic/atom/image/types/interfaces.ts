import { ImageProps } from 'primevue'

export interface ImageInterface extends ImageProps {
  alt?: string
  width?: string
  height?: string
  fetchpriority?: 'high' | 'low'
}

export interface ImageInterface {
  preview?: boolean
  imageStyle?: object
  imageClass?: object
  previewIcon?: string
  zoomInDisabled?: boolean
  zoomOutDisabled?: boolean
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
  src: string
  alt?: string
  width?: string
  height?: string
  fetchpriority?: 'high' | 'low'
}

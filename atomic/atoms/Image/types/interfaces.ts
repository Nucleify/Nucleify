export interface ImageInterface {
  preview?: boolean
  imageStyle?: any // eslint-disable-line
  imageClass?: any // eslint-disable-line
  previewIcon?: string
  zoomInDisabled?: boolean
  zoomOutDisabled?: boolean
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
  src: string
  alt?: string
  width?: string
  height?: string
  fetchpriority?: 'high' | 'low'
}

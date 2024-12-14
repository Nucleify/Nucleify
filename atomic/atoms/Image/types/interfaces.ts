import { PassThrough } from 'primevue/ts-helpers'
import { ImagePassThroughOptions } from 'primevue/image'

export interface ImageInterface {
  preview?: boolean
  imageStyle?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  imageClass?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  previewIcon?: string
  zoomInDisabled?: boolean
  zoomOutDisabled?: boolean
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<ImagePassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
  src: string
  alt?: string
  width?: string
  height?: string
}

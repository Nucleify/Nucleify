import { ImagePassThroughOptions } from 'primevue/image'
import { PassThrough } from 'primevue/ts-helpers'
import { PassThroughOptions } from 'primevue/passthrough'

export interface ImageInterface {
  preview?: boolean
  imageClass?: string
  zoomInDisabled?: boolean
  zoomOutDisabled?: boolean
  pt?: PassThrough<ImagePassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
  src: string
  alt?: string
  width?: string
  height?: string
}

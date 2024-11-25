import { PassThrough } from 'primevue/ts-helpers'
import { ScrollTopPassThroughOptions } from 'primevue/scrolltop'
import { PassThroughOptions } from 'primevue/passthrough'

export interface ScrollTopInterface {
  target?: 'window' | 'parent'
  threshold?: number
  behavior?: string
  pt?: PassThrough<ScrollTopPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
}

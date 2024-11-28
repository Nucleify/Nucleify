import { PassThrough } from 'primevue/ts-helpers'
import { ScrollTopPassThroughOptions } from 'primevue/scrolltop'

export interface ScrollTopInterface {
  target?: 'window' | 'parent'
  threshold?: number
  icon?: string
  behavior?: string
  buttonProps?: object
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<ScrollTopPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}

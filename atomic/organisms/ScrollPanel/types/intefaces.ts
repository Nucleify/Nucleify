import { PassThrough } from 'primevue/ts-helpers'
import { ScrollPanelPassThroughOptions } from 'primevue'

export interface ScrollPanelInterface {
  step?: number
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<ScrollPanelPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}

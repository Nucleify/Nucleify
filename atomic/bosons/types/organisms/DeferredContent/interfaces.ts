import { PassThrough } from 'primevue/ts-helpers'
import { DeferredContentPassThroughOptions } from 'primevue'

export interface DeferredContentInterface {
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<DeferredContentPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}

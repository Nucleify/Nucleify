import { PassThrough } from 'primevue/ts-helpers'
import { FloatLabelPassThroughOptions } from 'primevue/floatlabel'

export interface FloatLabelInterface {
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<FloatLabelPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
  variant?: 'in' | 'over' | 'on'
}

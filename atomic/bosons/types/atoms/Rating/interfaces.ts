import { PassThroughOptions } from 'primevue/passthrough'
import { RatingPassThroughOptions } from 'primevue/rating'
import { PassThrough } from 'primevue/ts-helpers'

export interface RatingInterface {
  modelValue?: number
  name?: string
  disabled?: boolean
  readonly?: boolean
  stars?: number
  cancel?: boolean
  pt?: PassThrough<RatingPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
}

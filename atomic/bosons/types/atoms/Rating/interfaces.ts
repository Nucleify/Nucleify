import { PassThrough } from 'primevue/ts-helpers'
import { RatingPassThroughOptions } from 'primevue/rating'

import { AdTypeType } from 'atomic/bosons/types'

export interface RatingInterface {
  adType?: AdTypeType
  modelValue?: number
  defaultValue?: number
  name?: string
  invalid?: boolean
  disabled?: boolean
  readonly?: boolean
  stars?: number
  onIcon?: string
  offIcon?: string
  formControl?: Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<RatingPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}

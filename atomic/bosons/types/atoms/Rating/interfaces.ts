import { PassThrough } from 'primevue/ts-helpers'
import { RatingPassThroughOptions } from 'primevue/rating'
import { PassThroughOptions } from 'primevue/passthrough'

import { AdTypeType } from 'atomic/bosons/types'

export interface RatingInterface {
  adType?: AdTypeType
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

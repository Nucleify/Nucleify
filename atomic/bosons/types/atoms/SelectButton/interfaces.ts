import { PassThrough } from 'primevue/ts-helpers'
import { SelectButtonPassThroughOptions } from 'primevue/selectbutton'
import { PassThroughOptions } from 'primevue/passthrough'

import { AdTypeType } from 'atomic/bosons/types'

export interface SelectButtonInterface {
  adType?: AdTypeType
  modelValue?: number
  options?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  optionLabel?: string | void
  optionValue?: string | void
  optionDisabled?: string | void
  multiple?: boolean
  invalid?: boolean
  disabled?: boolean
  dataKey?: string
  allowEmpty?: boolean
  ariaLabelledby?: string
  pt?: PassThrough<SelectButtonPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
}

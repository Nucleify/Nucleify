import { PassThrough } from 'primevue/ts-helpers'
import { SelectButtonPassThroughOptions } from 'primevue/selectbutton'

import { AdTypeType, ElementSizeType } from 'atomic/bosons/types'

export interface SelectButtonInterface {
  adType?: AdTypeType
  modelValue?: number
  defaultValue?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  name?: string
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
  size?: ElementSizeType
  formControl?: Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<SelectButtonPassThroughOptions> // eslint-disable-line @typescript-eslint/no-explicit-any
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}

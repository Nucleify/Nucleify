import { PassThrough } from 'primevue/ts-helpers'
import { ChipsPassThroughOptions } from 'primevue/chips'
import { PassThroughOptions } from 'primevue/passthrough'

import { AdTypeType, ElementVariantType } from 'atomic/bosons/types'

export interface ChipsInterface {
  adType?: AdTypeType
  modelValue?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  max?: number
  addOnBlur?: boolean
  allowDuplicate?: boolean
  separator?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  inputId?: string
  inputClass?: string | object
  inputStyle?: object
  invalid?: boolean
  disabled?: boolean
  variant?: ElementVariantType
  placeholder?: string
  ariaLabelledby?: string
  ariaLabel?: string
  pt?: PassThrough<ChipsPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
}

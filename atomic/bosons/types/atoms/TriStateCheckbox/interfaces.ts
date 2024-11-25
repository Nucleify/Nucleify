import { PassThrough } from 'primevue/ts-helpers'
import { TriStateCheckboxPassThroughOptions } from 'primevue/tristatecheckbox'
import { PassThroughOptions } from 'primevue/passthrough'

import { AdTypeType, ElementVariantType } from 'atomic/bosons/types'

export interface TriStateCheckboxInterface {
  adType?: AdTypeType
  modelValue?: boolean
  invalid?: boolean
  disabled?: boolean
  variant?: ElementVariantType
  readonly?: boolean
  tabindex?: string
  inputId?: string
  inputClass?: object
  inputStyle?: string | object
  ariaLabelledby?: string
  ariaLabel?: string
  pt?: PassThrough<TriStateCheckboxPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
}

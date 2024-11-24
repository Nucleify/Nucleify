import { PassThrough } from 'primevue/ts-helpers'
import { RadioButtonPassThroughOptions } from 'primevue/radiobutton'
import { PassThroughOptions } from 'primevue/passthrough'

import { AdTypeType, ElementVariantType } from 'atomic/bosons/types'

export interface RadioButtonInterface {
  adType?: AdTypeType
  value?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  name?: string
  binary?: boolean
  invalid?: boolean
  disabled?: boolean
  variant?: ElementVariantType
  readonly?: boolean
  tabindex?: number
  inputId?: string
  inputStyle?: object
  inputClass?: string
  ariaLabelledby?: string
  ariaLabel?: string
  pt?: PassThrough<RadioButtonPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
}

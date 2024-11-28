import { PassThrough } from 'primevue/ts-helpers'
import { RadioButtonPassThroughOptions } from 'primevue/radiobutton'

import {
  AdTypeType,
  ElementSizeType,
  ElementVariantType,
} from 'atomic/bosons/types'

export interface RadioButtonInterface {
  adType?: AdTypeType
  value?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  defaultValue?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  name?: string
  binary?: boolean
  size?: ElementSizeType
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
  formControl?: Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<RadioButtonPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}

import { PassThrough } from 'primevue/ts-helpers'
import { CheckboxPassThroughOptions } from 'primevue/checkbox'
import { PassThroughOptions } from 'primevue/passthrough'

import { AdTypeType, ElementSizeType, ElementVariantType } from 'atomic'

export interface CheckboxInterface {
  adType?: AdTypeType
  value?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  modelValue?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  defaultValue?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  name?: string
  binary?: boolean
  indeterminate?: boolean
  size?: ElementSizeType
  invalid?: boolean
  disabled?: boolean
  variant?: ElementVariantType
  readonly?: boolean
  required?: boolean
  tabindex?: number
  trueValue?: any //eslint-disable-line @typescript-eslint/no-explicit-any
  falseValue?: any //eslint-disable-line @typescript-eslint/no-explicit-any
  inputId?: string
  inputClass?: object
  inputStyle?: string | object
  ariaLabelledby?: string
  ariaLabel?: string
  formControl?: Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
  dt?: any //eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<CheckboxPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
}

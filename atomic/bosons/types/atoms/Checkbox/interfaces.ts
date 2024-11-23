import { CheckboxPassThroughOptions } from 'primevue/checkbox'
import { PassThrough } from 'primevue/ts-helpers'
import { PassThroughOptions } from 'primevue/passthrough'

export interface CheckboxInterface {
  value?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  modelValue?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  name?: string
  binary?: boolean
  invalid?: boolean
  disabled?: boolean
  variant?: 'filled' | 'outlined'
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
  pt?: PassThrough<CheckboxPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
}

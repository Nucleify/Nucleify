import { PassThrough } from 'primevue/ts-helpers'
import { InputOtpPassThroughOptions } from 'primevue/inputotp'
import { PassThroughOptions } from 'primevue/passthrough'

export interface InputOtpInterface {
  modelValue?: boolean
  invalid?: boolean
  disabled?: boolean
  readonly?: boolean
  variant?: 'filled' | 'outlined'
  tabindex?: number
  length?: number
  mask?: boolean
  integerOnly?: boolean
  pt?: PassThrough<InputOtpPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
}

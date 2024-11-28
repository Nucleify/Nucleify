import { PassThrough } from 'primevue/ts-helpers'
import { InputOtpPassThroughOptions } from 'primevue/inputotp'

import { ElementSizeType, ElementVariantType } from 'atomic/bosons/types'

export interface InputOtpInterface {
  modelValue?: boolean
  defaultValue?: string | boolean
  name?: string
  size?: ElementSizeType
  invalid?: boolean
  disabled?: boolean
  readonly?: boolean
  variant?: ElementVariantType
  tabindex?: number
  length?: number
  mask?: boolean
  integerOnly?: boolean
  formControl?: Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<InputOtpPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}

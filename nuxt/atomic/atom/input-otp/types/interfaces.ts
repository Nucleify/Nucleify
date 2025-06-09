import type { AdTypeType, ElementSizeType, ElementVariantType } from 'atomic'

export interface InputOtpInterface {
  adType?: AdTypeType
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
  formControl?: Record<string, unknown>
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}

import { AdTypeType, ElementSizeType, ElementVariantType } from 'atomic'

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
  formControl?: Record<string, any> // eslint-disable-line
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
}

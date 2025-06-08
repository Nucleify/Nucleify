import type { AdTypeType, ElementSizeType, ElementVariantType } from 'atomic'

export interface CheckboxInterface {
  adType?: AdTypeType
  value?: unknown[]
  modelValue?: unknown[]
  defaultValue?: unknown[]
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
  trueValue?: unknown
  falseValue?: unknown
  inputId?: string
  inputClass?: object
  inputStyle?: string | object
  ariaLabelledby?: string
  ariaLabel?: string
  formControl?: Record<string, unknown>
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}

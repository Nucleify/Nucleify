import type { AdTypeType, ElementSizeType, ElementVariantType } from 'atomic'

export interface RadioButtonInterface {
  adType?: AdTypeType
  value?: unknown
  defaultValue?: unknown
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
  formControl?: Record<string, unknown>
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}

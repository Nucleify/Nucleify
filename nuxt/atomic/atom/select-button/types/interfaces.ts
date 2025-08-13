import type { AdTypeType, ElementSizeType } from 'atomic'

export interface SelectButtonInterface {
  adType?: AdTypeType
  modelValue?: number
  defaultValue?: unknown
  name?: string
  options?: unknown[]
  optionLabel?: string
  optionValue?: string
  optionDisabled?: string
  multiple?: boolean
  invalid?: boolean
  disabled?: boolean
  dataKey?: string
  allowEmpty?: boolean
  ariaLabelledby?: string
  size?: ElementSizeType
  formControl?: Record<string, unknown>
  pt?: object
  dt?: unknown
  ptOptions?: object
  unstyled?: boolean
}

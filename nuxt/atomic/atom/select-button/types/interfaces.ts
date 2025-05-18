import { AdTypeType, ElementSizeType } from 'atomic'

export interface SelectButtonInterface {
  adType?: AdTypeType
  modelValue?: number
  defaultValue?: any // eslint-disable-line
  name?: string
  options?: any[] // eslint-disable-line
  optionLabel?: string | void
  optionValue?: string | void
  optionDisabled?: string | void
  multiple?: boolean
  invalid?: boolean
  disabled?: boolean
  dataKey?: string
  allowEmpty?: boolean
  ariaLabelledby?: string
  size?: ElementSizeType
  formControl?: Record<string, any> // eslint-disable-line
  pt?: any // eslint-disable-line
  dt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
}

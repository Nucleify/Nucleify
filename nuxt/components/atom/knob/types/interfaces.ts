import { AdTypeType } from 'atomic'

export interface KnobInterface {
  adType?: AdTypeType
  modelValue?: number
  defaultValue?: any // eslint-disable-line
  name?: string
  size?: number
  invalid?: boolean
  disabled?: boolean
  readonly?: boolean
  step?: number
  min?: number
  max?: number
  valueColor?: string
  rangeColor?: string
  textColor?: string
  strokeWidth?: number
  showValue?: boolean
  valueTemplate?: string | void
  tabindex?: number
  ariaLabelledby?: string
  ariaLabel?: string
  formControl?: Record<string, any> // eslint-disable-line
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
}

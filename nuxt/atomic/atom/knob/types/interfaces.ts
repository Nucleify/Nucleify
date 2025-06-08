import type { AdTypeType } from 'atomic'

export interface KnobInterface {
  adType?: AdTypeType
  modelValue?: number
  defaultValue?: unknown
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
  valueTemplate?: string
  tabindex?: number
  ariaLabelledby?: string
  ariaLabel?: string
  formControl?: Record<string, unknown>
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}

import type { AdTypeType, ElementDirectionType } from 'atomic'

export interface SliderInterface {
  adType?: AdTypeType
  modelValue?: number | number[]
  defaultValue?: number | number[]
  min?: number
  max?: number
  orientation?: ElementDirectionType
  step?: number
  range?: boolean
  invalid?: boolean
  disabled?: boolean
  tabindex?: number
  ariaLabelledby?: string
  ariaLabel?: string
  formControl?: Record<string, unknown>
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}

import type { AdTypeType } from 'atomic'

export interface RatingInterface {
  adType?: AdTypeType
  modelValue?: number
  defaultValue?: number
  name?: string
  invalid?: boolean
  disabled?: boolean
  readonly?: boolean
  stars?: number
  onIcon?: string
  offIcon?: string
  formControl?: Record<string, unknown>
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}

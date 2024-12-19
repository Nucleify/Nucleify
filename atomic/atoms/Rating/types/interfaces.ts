import { AdTypeType } from 'atomic'

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
  formControl?: Record<string, any> // eslint-disable-line
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
}

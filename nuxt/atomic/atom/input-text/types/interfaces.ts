import { AdTypeType, ElementSizeType, ElementVariantType } from 'atomic'

export interface InputTextInterface {
  adType?: AdTypeType
  value?: string
  defaultValue?: string
  name?: string
  size?: ElementSizeType
  invalid?: boolean
  variant?: ElementVariantType
  fluid?: boolean
  formControl?: Record<string, any> // eslint-disable-line
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
  disabled?: boolean
  id?: string
  placeholder?: string
}

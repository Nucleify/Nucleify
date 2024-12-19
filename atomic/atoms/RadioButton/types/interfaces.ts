import { AdTypeType, ElementSizeType, ElementVariantType } from 'atomic'

export interface RadioButtonInterface {
  adType?: AdTypeType
  value?: any // eslint-disable-line
  defaultValue?: any // eslint-disable-line
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
  formControl?: Record<string, any> // eslint-disable-line
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
}

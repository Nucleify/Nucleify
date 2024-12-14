import { AdTypeType, ElementSizeType, ElementVariantType } from 'atomic'

export interface InputMaskInterface {
  adType?: AdTypeType
  value?: string
  defaultValue?: string
  slotChar?: string
  mask?: string
  id?: string
  placeholder?: string
  autoClear?: boolean
  unmask?: boolean
  readonly?: boolean
  invalid?: boolean
  name?: string
  size?: ElementSizeType
  variant?: ElementVariantType
  fluid?: boolean
  disabled?: boolean
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
}

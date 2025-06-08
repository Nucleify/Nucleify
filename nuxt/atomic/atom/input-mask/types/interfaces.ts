import type { AdTypeType, ElementSizeType, ElementVariantType } from 'atomic'

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
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}

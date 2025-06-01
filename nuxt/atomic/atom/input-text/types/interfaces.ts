import type { AdTypeType, ElementSizeType, ElementVariantType } from 'atomic'

export interface InputTextInterface {
  adType?: AdTypeType
  value?: string
  defaultValue?: string
  name?: string
  size?: ElementSizeType
  invalid?: boolean
  variant?: ElementVariantType
  fluid?: boolean
  formControl?: Record<string, unknown>
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
  disabled?: boolean
  id?: string
  placeholder?: string
}

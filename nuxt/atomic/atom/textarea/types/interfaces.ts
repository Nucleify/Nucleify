import type { ElementSizeType, ElementVariantType } from 'atomic'

export interface TextareaInterface {
  adType?: string
  value?: unknown[]
  modelValue?: string
  defaultValue?: string
  name?: string
  autoResize?: boolean
  size?: ElementSizeType
  invalid?: boolean
  variant?: ElementVariantType
  fluid?: boolean
  formControl?: Record<string, unknown>
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}

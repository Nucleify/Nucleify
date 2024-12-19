import { ElementSizeType, ElementVariantType } from 'atomic'

export interface TextareaInterface {
  adType?: string
  value?: any[] // eslint-disable-line
  modelValue?: string
  defaultValue?: string
  name?: string
  autoResize?: boolean
  size?: ElementSizeType
  invalid?: boolean
  variant?: ElementVariantType
  fluid?: boolean
  formControl?: Record<string, any> // eslint-disable-line
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
}

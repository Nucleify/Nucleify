import { PassThrough } from 'primevue/ts-helpers'
import { TextareaPassThroughOptions } from 'primevue/textarea'

import { ElementSizeType, ElementVariantType } from 'atomic'

export interface TextareaInterface {
  adType?: string
  value?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  modelValue?: string
  defaultValue?: string
  name?: string
  autoResize?: boolean
  size?: ElementSizeType
  invalid?: boolean
  variant?: ElementVariantType
  fluid?: boolean
  formControl?: Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<TextareaPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}

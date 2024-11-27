import { PassThrough } from 'primevue/ts-helpers'
import { InputTextPassThroughOptions } from 'primevue/inputtext'

import {
  AdTypeType,
  ElementSizeType,
  ElementVariantType,
} from 'atomic/bosons/types'

export interface InputTextInterface {
  adType?: AdTypeType
  value?: string
  defaultValue?: string
  name?: string
  size?: ElementSizeType
  invalid?: boolean
  variant?: ElementVariantType
  fluid?: boolean
  formControl?: Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<InputTextPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
  disabled?: boolean
  id?: string
  placeholder?: string
}

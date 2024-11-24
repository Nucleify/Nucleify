import { PassThrough } from 'primevue/ts-helpers'
import { InputTextPassThroughOptions } from 'primevue/inputtext'
import { PassThroughOptions } from 'primevue/passthrough'

import {
  AdTypeType,
  ElementSizeType,
  ElementVariantType,
} from 'atomic/bosons/types'

export interface InputTextInterface {
  adType?: AdTypeType
  value?: string
  size?: ElementSizeType
  invalid?: boolean
  variant?: ElementVariantType
  disabled?: boolean
  unstyled?: boolean
  pt?: PassThrough<InputTextPassThroughOptions>
  ptOptions?: PassThroughOptions
  id?: string
  placeholder?: string
}

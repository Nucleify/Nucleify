import { PassThrough } from 'primevue/ts-helpers'
import { TextareaPassThroughOptions } from 'primevue/textarea'
import { PassThroughOptions } from 'primevue/passthrough'

import { ElementVariantType } from 'atomic/bosons/types'

export interface TextareaInterface {
  adType?: string
  value?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  modelValue?: string
  autoResize?: boolean
  invalid?: boolean
  variant?: ElementVariantType
  pt?: PassThrough<TextareaPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
}

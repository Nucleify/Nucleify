import { Nullable, PassThrough } from 'primevue/ts-helpers'
import { TextareaPassThroughOptions } from 'primevue/textarea'
import { PassThroughOptions } from 'primevue/passthrough'

export interface TextareaInterface {
  value?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  modelValue?: Nullable<string>
  autoResize?: boolean
  invalid?: boolean
  variant?: 'filled' | 'outlined'
  pt?: PassThrough<TextareaPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
  type?: string
}

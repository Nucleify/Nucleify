import { InputTextPassThroughOptions } from 'primevue/inputtext'
import { PassThrough } from 'primevue/ts-helpers'
import { PassThroughOptions } from 'primevue/passthrough'

export interface InputTextInterface {
  value?: string
  size?: 'small' | 'large'
  invalid?: boolean
  variant?: 'filled' | 'outlined'
  disabled?: boolean
  unstyled?: boolean
  pt?: PassThrough<InputTextPassThroughOptions>
  ptOptions?: PassThroughOptions
  id?: string
  placeholder?: string
  type?: string
}

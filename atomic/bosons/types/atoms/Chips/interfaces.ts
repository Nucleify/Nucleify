import { ChipsPassThroughOptions } from 'primevue/chips'
import { PassThrough } from 'primevue/ts-helpers'
import { PassThroughOptions } from 'primevue/passthrough'

export interface ChipsInterface {
  modelValue?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  max?: number
  addOnBlur?: boolean
  allowDuplicate?: boolean
  separator?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  inputId?: string
  inputClass?: string | object
  inputStyle?: object
  invalid?: boolean
  disabled?: boolean
  variant?: 'filled' | 'outlined'
  placeholder?: string
  ariaLabelledby?: string
  ariaLabel?: string
  pt?: PassThrough<ChipsPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
}

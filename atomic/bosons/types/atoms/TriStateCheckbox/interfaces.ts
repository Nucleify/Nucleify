import { PassThrough } from 'primevue/ts-helpers'
import { TriStateCheckboxPassThroughOptions } from 'primevue/tristatecheckbox'
import { PassThroughOptions } from 'primevue/passthrough'

export interface TriStateCheckboxInterface {
  modelValue?: boolean
  invalid?: boolean
  disabled?: boolean
  variant?: 'filled' | 'outlined'
  readonly?: boolean
  tabindex?: string
  inputId?: string
  inputClass?: object
  inputStyle?: string | object
  ariaLabelledby?: string
  ariaLabel?: string
  pt?: PassThrough<TriStateCheckboxPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
}

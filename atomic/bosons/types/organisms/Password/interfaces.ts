import { HTMLAttributes, InputHTMLAttributes } from 'vue'
import { PassThrough } from 'primevue/ts-helpers'
import { PasswordPassThroughOptions } from 'primevue/password'
import { PassThroughOptions } from 'primevue/passthrough'

import {
  ElementAppendTo,
  ElementVariantType,
  ObjectNameType,
} from 'atomic/bosons/types'

export interface PasswordInterface {
  value?: string
  modelValue?: string
  promptLabel?: string
  mediumRegex?: string | RegExp
  strongRegex?: string | RegExp
  weakLabel?: string
  mediumLabel?: string
  strongLabel?: string
  feedback?: boolean
  appendTo?: ElementAppendTo
  toggleMask?: boolean
  invalid?: boolean
  disabled?: boolean
  variant?: ElementVariantType
  placeholder?: string
  required?: boolean
  inputId?: string
  inputStyle?: object
  inputClass?: string | object
  inputProps?: InputHTMLAttributes
  panelId?: string
  panelClass?: string | object
  panelStyle?: object
  panelProps?: HTMLAttributes
  ariaLabelledby?: string
  ariaLabel?: string
  pt?: PassThrough<PasswordPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
  id?: string
  passwordsMatch?: boolean
  emptyPassword?: boolean
  emptyConfirmPassword?: boolean
  type?: ObjectNameType
}

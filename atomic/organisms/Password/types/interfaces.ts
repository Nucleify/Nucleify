import { HTMLAttributes, InputHTMLAttributes } from 'vue'
import { PassThrough } from 'primevue/ts-helpers'
import { PasswordPassThroughOptions } from 'primevue/password'

import {
  ElementAppendTo,
  ElementSizeType,
  ElementVariantType,
  ObjectNameType,
} from 'atomic'

export interface PasswordInterface {
  value?: string
  modelValue?: string
  defaultValue?: string
  name?: string
  promptLabel?: string
  mediumRegex?: string | RegExp
  strongRegex?: string | RegExp
  weakLabel?: string
  mediumLabel?: string
  strongLabel?: string
  feedback?: boolean
  appendTo?: ElementAppendTo
  toggleMask?: boolean
  maskIcon?: string
  unmaskIcon?: string
  size?: ElementSizeType
  invalid?: boolean
  disabled?: boolean
  variant?: ElementVariantType
  placeholder?: string
  required?: boolean
  fluid?: boolean
  autofocus?: boolean
  inputId?: string
  inputStyle?: object
  inputClass?: string | object
  inputProps?: InputHTMLAttributes
  panelId?: string
  panelClass?: string | object
  panelStyle?: object
  panelProps?: HTMLAttributes
  overlayId?: string
  overlayClass?: string | object
  overlayStyle?: object
  overlayProps?: HTMLAttributes
  ariaLabelledby?: string
  ariaLabel?: string
  formControl?: Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<PasswordPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
  id?: string
  passwordsMatch?: boolean
  emptyPassword?: boolean
  emptyConfirmPassword?: boolean
  type?: ObjectNameType
}

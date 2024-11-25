import { ButtonHTMLAttributes, InputHTMLAttributes } from 'vue'
import { PassThrough } from 'primevue/ts-helpers'
import {
  InputNumberPassThroughOptions,
  RoundingMode,
} from 'primevue/inputnumber'
import { PassThroughOptions } from 'primevue/passthrough'

import { ElementDirectionType, ElementVariantType } from 'atomic/bosons/types'

export interface InputNumberInterface {
  modelValue?: number
  format?: boolean
  showButtons?: boolean
  buttonLayout?: ElementDirectionType
  incrementButtonClass?: string
  decrementButtonClass?: string
  locale?: string
  localMatcher?: 'best fit' | 'lookup'
  mode?: 'decimal' | 'currency'
  prefix?: string
  suffix?: string
  currency?: string
  currencyDisplay?: string
  useGrouping?: boolean
  minFractionDigits?: number
  maxFractionDigits?: number
  roundingMode?: RoundingMode
  min?: number
  max?: number
  step?: number
  allowEmpty?: boolean
  highlightOnFocus?: boolean
  invalid?: boolean
  disabled?: boolean
  variant?: ElementVariantType
  readonly?: boolean
  placeholder?: string
  inputId?: string
  inputClass?: string | object
  inputStyle?: object
  inputProps?: InputHTMLAttributes
  incrementButtonProps?: ButtonHTMLAttributes
  decrementButtonProps?: ButtonHTMLAttributes
  ariaLabelledby?: string
  ariaLabel?: string
  pt?: PassThrough<InputNumberPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
}

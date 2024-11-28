import { PassThrough } from 'primevue/ts-helpers'
import {
  InputNumberPassThroughOptions,
  RoundingMode,
} from 'primevue/inputnumber'

import {
  ElementDirectionType,
  ElementSizeType,
  ElementVariantType,
} from 'atomic/bosons/types'

export interface InputNumberInterface {
  modelValue?: number
  defaultValue?: number
  name?: string
  format?: boolean
  showButtons?: boolean
  buttonLayout?: ElementDirectionType | 'stacked'
  incrementButtonClass?: string
  decrementButtonClass?: string
  incrementIcon?: string
  decrementIcon?: string
  locale?: string
  localMatcher?: 'lookup' | 'best fit'
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
  size?: ElementSizeType
  invalid?: boolean
  disabled?: boolean
  variant?: ElementVariantType
  readonly?: boolean
  placeholder?: string
  fluid?: boolean
  inputId?: string
  inputClass?: string | object
  inputStyle?: object
  ariaLabelledby?: string
  ariaLabel?: string
  formControl?: Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<InputNumberPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}

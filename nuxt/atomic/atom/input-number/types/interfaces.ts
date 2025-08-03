import type {
  AdTypeType,
  ElementDirectionType,
  ElementSizeType,
  ElementVariantType,
} from 'atomic'

import type { RoundingMode } from 'primevue/inputnumber'

export interface InputNumberInterface {
  adType?: AdTypeType
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
  formControl?: Record<string, unknown>
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}

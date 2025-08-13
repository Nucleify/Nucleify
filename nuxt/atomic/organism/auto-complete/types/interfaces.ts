import type {
  ElementAppendTo,
  ElementSizeType,
  ElementVariantType,
} from 'atomic'

import type { VirtualScrollerProps } from 'primevue/virtualscroller'

export interface AutoCompleteInterface {
  modelValue?: unknown
  defaultValue?: unknown
  name?: string
  suggestions?: unknown[]
  optionLabel?: string
  optionDisabled?: string
  optionGroupLabel?: string
  optionGroupChildren?: string
  scrollHeight?: string
  dropdown?: boolean
  dropdownMode?: 'blank' | 'current'
  multiple?: boolean
  placeholder?: string
  loading?: boolean
  size?: ElementSizeType
  invalid?: boolean
  disabled?: boolean
  variant?: ElementVariantType
  dataKey?: string
  minLength?: number
  delay?: number
  appendTo?: ElementAppendTo
  forceSelection?: boolean
  completeOnFocus?: boolean
  inputId?: string
  inputStyle?: object
  inputClass?: string | object
  panelStyle?: object
  panelClass?: string | object
  overlayStyle?: object
  overlayClass?: string | object
  dropdownIcon?: string
  dropdownClass?: string | object
  loader?: string
  removeTokenIcon?: string
  chipIcon?: string
  virtualScrollerOptions?: VirtualScrollerProps
  autoOptionFocus?: boolean
  selectOnFocus?: boolean
  focusOnHover?: boolean
  searchLocale?: string
  searchMessage?: string
  selectionMessage?: string
  emptySelectionMessage?: string
  emptySearchMessage?: string
  showEmptyMessage?: boolean
  tabindex?: string | number
  fluid?: boolean
  ariaLabel?: string
  ariaLabelledby?: string
  formControl?: Record<string, unknown>
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}

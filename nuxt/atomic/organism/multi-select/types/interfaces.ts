import type {
  ElementAppendTo,
  ElementSizeType,
  ElementVariantType,
} from 'atomic'

export interface MultiSelectInterface {
  modelValue?: unknown
  defaultValue?: unknown
  name?: string
  options?: unknown[]
  optionLabel?: string
  optionDisabled?: string
  optionGroupLabel?: string
  optionGroupChildren?: string
  scrollHeight?: string
  placeholder?: string
  size?: ElementSizeType
  invalid?: boolean
  disabled?: boolean
  variant?: ElementVariantType
  fluid?: boolean
  inputId?: string
  overlayStyle?: object
  overlayClass?: object
  dataKey?: string
  showClear?: boolean
  clearIcon?: string
  resetFilterOnClear?: boolean
  filterLocale?: string
  filterMatchMode?: 'startsWith' | 'contains' | 'endsWith'
  filterFields?: string[]
  appendTo?: ElementAppendTo
  display?: 'comma' | 'chip'
  selectedItemsLabel?: string
  maxSelectedLabels?: number
  selectionLimit?: number
  showToggleAll?: boolean
  loading?: boolean
  checkboxIcon?: string
  dropdownIcon?: string
  filterIcon?: string
  loadingIcon?: string
  removeTokenIcon?: string
  chipIcon?: string
  selectAll?: boolean
  resetFilterOnHide?: boolean
  virtualScrollerOptions?: object
  autoOptionFocus?: boolean
  autoFilterFocus?: boolean
  focusOnHover?: boolean
  highlightOnSelect?: boolean
  filterMessage?: string
  selectionMessage?: string
  emptySelectionMessage?: string
  emptyFilterMessage?: string
  emptyMessage?: string
  tabindex?: string | number
  ariaLabel?: string
  ariaLabelledby?: string
  formControl?: Record<string, unknown>
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}

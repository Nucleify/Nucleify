import { ElementAppendTo, ElementSizeType, ElementVariantType } from 'atomic'

export interface MultiSelectInterface {
  modelValue?: any // eslint-disable-line
  defaultValue?: any // eslint-disable-line
  name?: string
  options?: any[] // eslint-disable-line
  optionLabel?: string | void
  optionDisabled?: string | void
  optionGroupLabel?: string | void
  optionGroupChildren?: string | void
  scrollHeight?: string
  placeholder?: string
  size?: ElementSizeType
  invalid?: boolean
  disabled?: boolean
  variant?: ElementVariantType
  fluid?: boolean
  inputId?: string
  overlayStyle?: any // eslint-disable-line
  overlayClass?: any // eslint-disable-line
  dataKey?: string
  showClear?: boolean
  clearIcon?: string
  resetFilterOnClear?: string
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
  virtualScrollerOptions?: any // eslint-disable-line
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
  formControl?: Record<string, any> // eslint-disable-line
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
}

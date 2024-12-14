import { PassThrough } from 'primevue/ts-helpers'
import { MultiSelectPassThroughOptions } from 'primevue'

import { ElementAppendTo, ElementSizeType, ElementVariantType } from 'atomic'

export interface MultiSelectInterface {
  modelValue?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  defaultValue?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  name?: string
  options?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
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
  overlayStyle?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  overlayClass?: any // eslint-disable-line @typescript-eslint/no-explicit-any
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
  virtualScrollerOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
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
  formControl?: Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<MultiSelectPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}

import type {
  ElementAppendTo,
  ElementSizeType,
  ElementVariantType,
} from 'atomic'

import type { VirtualScrollerProps } from 'primevue/virtualscroller'

export interface SelectInterface {
  modelValue?: unknown
  defaultValue?: unknown
  name?: string
  option?: unknown[]
  optionLabel?: string
  optionValue?: string
  optionDisabled?: string
  optionGroupChildren?: string
  scrollHeight?: string
  filter?: boolean
  filterPlaceholder?: string
  filterLocale?: string
  filterMatchMode?: 'endsWith' | 'startsWith' | 'contains'
  filterFields?: string[]
  editable?: boolean
  placeholder?: string
  size?: ElementSizeType
  invalid?: boolean
  disabled?: boolean
  variant?: ElementVariantType
  dataKey?: string
  showClear?: boolean
  fluid?: boolean
  labelId?: string
  labelStyle?: object
  labelClass?: object
  overlayStyle?: object
  overlayClass?: object
  appendTo?: ElementAppendTo
  loading?: boolean
  clearIcon?: string
  dropdownIcon?: string
  loadingIcon?: string
  resetFilterOnHide?: boolean
  resetFilterOnClear?: boolean
  virtualScrollerOptions?: VirtualScrollerProps
  autoOptionFocus?: boolean
  autoFilterFocus?: boolean
  selectOnFocus?: boolean
  focusOnHover?: boolean
  highlightOnSelect?: boolean
  checkmark?: boolean
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

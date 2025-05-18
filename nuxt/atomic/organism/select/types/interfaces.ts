import { VirtualScrollerProps } from 'primevue/virtualscroller'

import { ElementAppendTo, ElementSizeType, ElementVariantType } from 'atomic'

export interface SelectInterface {
  modelValue?: any // eslint-disable-line
  defaultValue?: any // eslint-disable-line
  name?: string
  option?: any[] // eslint-disable-line
  optionLabel?: string | void
  optionValue?: string | void
  optionDisabled?: string | void
  optionGroupChildren?: string | void
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
  labelStyle?: string
  labelClass?: string | object
  overlayStyle?: object
  overlayClass?: string | object
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
  formControl?: Record<string, any> // eslint-disable-line
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
}

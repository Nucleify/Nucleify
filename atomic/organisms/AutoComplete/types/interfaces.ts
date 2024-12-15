import { VirtualScrollerProps } from 'primevue/virtualscroller'

import { ElementAppendTo, ElementSizeType, ElementVariantType } from 'atomic'

export interface AutoCompleteInterface {
  modelValue?: any // eslint-disable-line
  defaultValue?: any // eslint-disable-line
  name?: string
  suggestions?: any[] // eslint-disable-line
  optionLabel?: string | void
  optionDisabled?: string | void
  optionGroupLabel?: string | void
  optionGroupChildren?: string | void
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
  dropdownIcon?: string | object
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
  formControl?: Record<string, any> // eslint-disable-line
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
}

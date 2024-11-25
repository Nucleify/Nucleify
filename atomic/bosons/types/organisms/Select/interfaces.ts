import { HTMLAttributes, InputHTMLAttributes } from 'vue'
import { HintedString, PassThrough } from 'primevue/ts-helpers'
import { VirtualScrollerProps } from 'primevue/virtualscroller'
import { SelectPassThroughOptions } from 'primevue/select'
import { PassThroughOptions } from 'primevue/passthrough'

import { ElementAppendTo, ElementVariantType } from 'atomic/bosons/types'

export interface SelectInterface {
  modelValue?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  option?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  optionLabel?: string | void
  optionValue?: string | void
  optionDisabled?: string | void
  optionGroupChildren?: string | void
  scrollHeight?: string
  filter?: boolean
  filterPlaceholder?: string
  filterLocale?: string
  filterMatchMode?: HintedString<'endsWith' | 'startsWith' | 'contains'>
  filterFields?: string[]
  editable?: boolean
  placeholder?: string
  invalid?: boolean
  disabled?: boolean
  variant?: ElementVariantType
  dataKey?: string
  showClear?: boolean
  inputId?: string
  inputStyle?: object
  inputClass?: string | object
  inputProps?: HTMLAttributes | InputHTMLAttributes
  panelStyle?: object
  panelClass?: string | object
  panelProps?: HTMLAttributes
  filterInputProps?: InputHTMLAttributes
  appendTo?: ElementAppendTo
  loading?: boolean
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
  pt?: PassThrough<SelectPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
}

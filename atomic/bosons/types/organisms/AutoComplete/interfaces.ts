import { PassThrough } from 'primevue/ts-helpers'
import { AutoCompletePassThroughOptions } from 'primevue/autocomplete'
import { PassThroughOptions } from 'primevue/passthrough'

import { HTMLAttributes, InputHTMLAttributes } from 'vue'
import { VirtualScrollerProps } from 'primevue/virtualscroller'
import { ElementAppendTo, ElementVariantType } from 'atomic/bosons/types'

export interface AutoCompleteInterface {
  modelValue?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  suggestions?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
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
  inputProps?: InputHTMLAttributes
  panelStyle?: object
  panelClass?: string | object
  panelProps?: HTMLAttributes
  dropdownClass?: string | object
  virtualScrollerOptions?: VirtualScrollerProps
  autoOptionFocus?: boolean
  selectOnFocus?: boolean
  focusOnHover?: boolean
  searchLocale?: string
  searchMessage?: string
  selectionMessage?: string
  emptySelectionMessage?: string
  emptySearchMessage?: string
  tabindex?: string | number
  ariaLabel?: string
  ariaLabelledby?: string
  pt?: PassThrough<AutoCompletePassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
}

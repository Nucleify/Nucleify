import { HTMLAttributes, InputHTMLAttributes } from 'vue'
import { PassThrough } from 'primevue/ts-helpers'
import { PassThroughOptions } from 'primevue/passthrough'
import {
  DatePickerPassThroughOptions,
  DatePickerResponsiveOptions,
} from 'primevue/datepicker'

import {
  DatePickerModelValueType,
  DatePickerVariant,
  DateSelectionModeType,
  ElementAppendTo,
  HourFormatType,
  IconDisplayType,
  ViewType,
} from 'atomic/bosons/types'

export interface DatePickerInterface {
  modelValue?: DatePickerModelValueType
  selectionMode?: DateSelectionModeType
  dateFormat?: string
  inline?: boolean
  showOtherMonths?: boolean
  selectOtherMonths?: boolean
  showIcon?: boolean
  iconDisplay?: IconDisplayType
  numberOfMonths?: number
  responsiveOptions?: DatePickerResponsiveOptions[]
  breakpoint?: string
  view?: ViewType
  touchUI?: boolean
  minDate?: Date
  maxDate?: Date
  disabledDates?: Date[]
  disabledDays?: number[]
  maxDateCount?: number
  autoZIndex?: boolean
  baseZIndex?: number
  showButtonBar?: boolean
  shortYearCutoff?: string
  showTime?: boolean
  timeOnly?: boolean
  hourFormat?: HourFormatType
  stepHour?: number
  stepMinute?: number
  stepSecond?: number
  showSeconds?: boolean
  hideOnDateTimeSelect?: boolean
  hideOnRangeSelection?: boolean
  timeSeparator?: string
  showWeek?: boolean
  manualInput?: boolean
  invalid?: boolean
  disabled?: boolean
  variant?: DatePickerVariant
  readonly?: boolean
  placeholder?: string
  appendTo?: ElementAppendTo
  id?: string
  inputId?: string
  inputStyle?: object
  inputClass?: string | object
  inputProps?: InputHTMLAttributes
  panelStyle?: object
  panelClass?: string | object
  panelProps?: HTMLAttributes
  name?: string
  ariaLabelledby?: string
  ariaLabel?: string
  pt?: PassThrough<DatePickerPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
}

import { HTMLAttributes, InputHTMLAttributes } from 'vue'
import { HintedString, PassThrough } from 'primevue/ts-helpers'
import { PassThroughOptions } from 'primevue/passthrough'
import {
  CalendarPassThroughOptions,
  CalendarProps,
  CalendarResponsiveOptions,
} from 'primevue/calendar'

import {
  CalendarModelValueType,
  CalendarVariant,
  DateSelectionModeType,
  HourFormatType,
  IconDisplayType,
  ViewType,
} from './types'

export interface CalendarInterface extends CalendarProps {
  modelValue?: CalendarModelValueType
  selectionMode?: DateSelectionModeType
  dateFormat?: string
  inline?: boolean
  showOtherMonths?: boolean
  selectOtherMonths?: boolean
  showIcon?: boolean
  iconDisplay?: IconDisplayType
  numberOfMonths?: number
  responsiveOptions?: CalendarResponsiveOptions[]
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
  variant?: CalendarVariant
  readonly?: boolean
  placeholder?: string
  appendTo?: HTMLElement | HintedString<'body' | 'self'>
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
  pt?: PassThrough<CalendarPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
}

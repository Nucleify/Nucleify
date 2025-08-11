import type {
  DatePickerModelValueType,
  DatePickerVariant,
  DateSelectionModeType,
  ElementAppendTo,
  ElementSizeType,
  HourFormatType,
  IconDisplayType,
  ViewType,
} from 'atomic'

import type { DatePickerResponsiveOptions } from 'primevue/datepicker'

export interface DatePickerInterface {
  modelValue?: DatePickerModelValueType
  defaultValue?: Date | Date[] | (null | Date)[]
  name?: string
  selectionMode?: DateSelectionModeType
  dateFormat?: string
  inline?: boolean
  showOtherMonths?: boolean
  selectOtherMonths?: boolean
  showIcon?: boolean
  iconDisplay?: IconDisplayType
  icon?: string
  prevIcon?: string
  nextIcon?: string
  incrementIcon?: string
  decrementIcon?: string
  numberOfMonths?: number
  responsiveOptions?: DatePickerResponsiveOptions[]
  breakpoint?: string
  view?: ViewType
  minDate?: Date
  maxDate?: Date
  disabledDates?: Date[]
  disabledDays?: number[]
  maxDateCount?: number
  showOnFocus?: boolean
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
  size?: ElementSizeType
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
  panelStyle?: object
  panelClass?: string | object
  todayButtonProps?: object
  clearButtonProps?: object
  navigatorButtonProps?: object
  timepickerButtonProps?: object
  fluid?: boolean
  ariaLabelledby?: string
  ariaLabel?: string
  formControl?: Record<string, unknown>
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}

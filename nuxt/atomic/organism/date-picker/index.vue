<template>
  <DatePicker
    :id="props.id"
    :model-value="props.modelValue"
    :default-value="props.defaultValue"
    :name="props.name"
    :selection-mode="props.selectionMode"
    :date-format="props.dateFormat"
    :inline="props.inline"
    :show-other-months="props.showOtherMonths"
    :select-other-months="props.selectOtherMonths"
    :show-icon="props.showIcon"
    :icon-display="props.iconDisplay"
    :icon="props.icon"
    :prev-icon="props.prevIcon"
    :next-icon="props.nextIcon"
    :increment-icon="props.incrementIcon"
    :decrement-icon="props.decrementIcon"
    :number-of-months="props.numberOfMonths"
    :responsive-options="props.responsiveOptions"
    :breakpoint="props.breakpoint"
    :view="props.view"
    :min-date="props.minDate"
    :max-date="props.maxDate"
    :disabled-dates="props.disabledDates"
    :disabled-days="props.disabledDays"
    :max-date-count="props.maxDateCount"
    :show-on-focus="props.showOnFocus || true"
    :auto-zindex="props.autoZIndex"
    :base-zindex="props.baseZIndex"
    :show-button-bar="props.showButtonBar"
    :short-year-cutoff="props.shortYearCutoff"
    :show-time="props.showTime"
    :time-only="props.timeOnly"
    :hour-format="props.hourFormat"
    :step-hour="props.stepHour"
    :step-minute="props.stepMinute"
    :step-second="props.stepSecond"
    :show-seconds="props.showSeconds"
    :hide-on-datetime-select="props.hideOnDateTimeSelect"
    :hide-on-range-selection="props.hideOnRangeSelection"
    :time-separator="props.timeSeparator"
    :show-week="props.showWeek"
    :manual-input="props.manualInput"
    :size="props.size"
    :invalid="props.invalid"
    :disabled="props.disabled"
    :variant="props.variant"
    :readonly="props.readonly"
    :placeholder="props.placeholder"
    :append-to="props.appendTo"
    :input-id="props.inputId"
    :input-style="props.inputStyle"
    :input-class="props.inputClass"
    :panel-style="props.panelStyle"
    :panel-class="props.panelClass"
    :today-button-props="props.todayButtonProps"
    :clear-button-props="props.clearButtonProps"
    :navigator-button-props="props.navigatorButtonProps"
    :timepicker-button-props="props.timepickerButtonProps"
    :fluid="props.fluid"
    :aria-labelledby="props.ariaLabelledby"
    :aria-label="props.ariaLabel"
    :form-control="props.formControl"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
    @update:model-value="onUpdateModelValue"
  />
</template>

<script setup lang="ts">
import type { DatePickerInterface, DatePickerModelValueType } from 'atomic'
import { formatDate } from 'atomic'

const props = defineProps<DatePickerInterface>()

const emit = defineEmits(['update:modelValue'])

function onUpdateModelValue(value: DatePickerModelValueType) {
  if (value instanceof Date) {
    const formattedValue = formatDate(value)
    emit('update:modelValue', formattedValue)
  } else {
    emit('update:modelValue', value)
  }
}
</script>

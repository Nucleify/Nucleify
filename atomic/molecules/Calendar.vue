<template>
  <Calendar
    :model-value="props.modelValue"
    @update:model-value="onUpdateModelValue"
    :selection-mode="props.selectionMode"
    :date-format="props.dateFormat"
    :inline="props.inline"
    :show-other-months="props.showOtherMonths"
    :select-other-months="props.selectOtherMonths"
    :show-icon="props.showIcon"
    :icon-display="props.iconDisplay"
    :number-of-months="props.numberOfMonths"
    :responsive-options="props.responsiveOptions"
    :breakpoint="props.breakpoint"
    :view="props.view"
    :touch-ui="props.touchUI"
    :min-date="props.minDate"
    :max-date="props.maxDate"
    :disabled-dates="props.disabledDates"
    :disabled-days="props.disabledDays"
    :max-date-count="props.maxDateCount"
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
    :invalid="props.invalid"
    :disabled="props.disabled"
    :variant="props.variant"
    :readonly="props.readonly"
    :placeholder="props.placeholder"
    :append-to="props.appendTo"
    :id="props.id"
    :input-id="props.inputId"
    :input-style="props.inputStyle"
    :input-class="props.inputClass"
    :input-props="props.inputProps"
    :panel-style="props.panelStyle"
    :panel-class="props.panelClass"
    :panel-props="props.panelProps"
    :name="props.name"
    :aria-labelledby="props.ariaLabelledby"
    :aria-label="props.ariaLabel"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>

<script setup lang="ts">
import { CalendarInterface, CalendarModelValueType } from 'atomic/bosons/types'
import { formatDate } from 'atomic/bosons/utils'

const props = defineProps<CalendarInterface>()

const emit = defineEmits(['update:modelValue'])

function onUpdateModelValue(value: CalendarModelValueType) {
  if (value instanceof Date) {
    const formattedValue = formatDate(value)
    emit('update:modelValue', formattedValue)
  } else {
    emit('update:modelValue', value)
  }
}
</script>

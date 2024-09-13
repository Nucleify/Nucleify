<template>
    <Calendar
        :modelValue="modelValue"
        @update:modelValue="onUpdateModelValue"
        :selection-mode="selectionMode"
        :date-format="dateFormat"
        :inline="inline"
        :show-other-months="showOtherMonths"
        :select-other-months="selectOtherMonths"
        :show-icon="showIcon"
        :icon-display="iconDisplay"
        :number-of-months="numberOfMonths"
        :responsive-options="responsiveOptions"
        :breakpoint="breakpoint"
        :view="view"
        :touch-ui="touchUI"
        :min-date="minDate"
        :max-date="maxDate"
        :disabled-dates="disabledDates"
        :disabled-days="disabledDays"
        :max-date-count="maxDateCount"
        :auto-zindex="autoZIndex"
        :base-zindex="baseZIndex"
        :show-button-bar="showButtonBar"
        :short-year-cutoff="shortYearCutoff"
        :show-time="showTime"
        :time-only="timeOnly"
        :hour-format="hourFormat"
        :step-hour="stepHour"
        :step-minute="stepMinute"
        :step-second="stepSecond"
        :show-seconds="showSeconds"
        :hide-on-datetime-select="hideOnDateTimeSelect"
        :hide-on-range-selection="hideOnRangeSelection"
        :time-separator="timeSeparator"
        :show-week="showWeek"
        :manual-input="manualInput"
        :invalid="invalid"
        :disabled="disabled"
        :variant="variant"
        :readonly="readonly"
        :placeholder="placeholder"
        :append-to="appendTo"
        :id="id"
        :input-id="inputId"
        :input-style="inputStyle"
        :input-class="inputClass"
        :input-props="inputProps"
        :panel-style="panelStyle"
        :panel-class="panelClass"
        :panel-props="panelProps"
        :name="name"
        :aria-labelledby="ariaLabelledby"
        :aria-label="ariaLabel"
        :pt="pt"
        :pt-options="ptOptions"
        :unstyled="unstyled"
    />
</template>

<script setup lang="ts">
import { CalendarInterface, CalendarModelValueType } from 'atomic/bosons/types'
import { formatDate } from 'atomic/bosons/utils'

defineProps<CalendarInterface>()

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

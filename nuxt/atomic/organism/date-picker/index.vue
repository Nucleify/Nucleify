<template>
  <DatePicker
    v-bind="transformProps(props)"
    :show-on-focus="props.showOnFocus || true"
    :class="$style['ad-datepicker']"
    @update:model-value="onUpdateModelValue"
  />
</template>

<script setup lang="ts">
import type { DatePickerInterface, DatePickerModelValueType } from 'atomic'
import { formatDate, transformProps } from 'atomic'

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

<style lang="scss" module>
@import 'index';
</style>
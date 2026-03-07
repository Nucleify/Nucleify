<template>
  <DatePicker
    v-bind="transformProps(props)"
    :show-on-focus="props.showOnFocus || true"
    :class="$style['ad-datepicker']"
    :pt="{
      pcInputText: {
        root: {
          class: $style['ad-inputtext'],
          'ad-type': props.adType,
        } 
      },
    }"
    @update:model-value="onUpdateModelValue"
  />
</template>

<script setup lang="ts">
import { formatDate, transformProps } from 'nucleify'

import type { DatePickerInterface, DatePickerModelValueType } from '.'

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
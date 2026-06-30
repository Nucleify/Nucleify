<template>
  <DatePicker
    v-bind="transformProps(props, ['modelValue'])"
    :model-value="parsedModelValue"
    :show-on-focus="props.showOnFocus || true"
    :fluid="props.fluid ?? true"
    :panel-class="resolvedPanelClass"
    :class="$style['ad-datepicker']"
    :pt="datePickerPt"
    @update:model-value="onUpdateModelValue"
  >
    <slot />
  </DatePicker>
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue'

import { formatDate, transformProps } from 'nucleify'

import type { DatePickerInterface, DatePickerModelValueType } from '.'
import { parseDateValue } from './utils/format_date'

const props = defineProps<DatePickerInterface>()

const emit = defineEmits(['update:modelValue'])

const style = useCssModule()

const resolvedPanelClass = computed(() => props.panelClass ?? props.adType)

const parsedModelValue = computed(() => parseDateValue(props.modelValue))

const datePickerPt = computed(() => {
  const panelType = resolvedPanelClass.value

  return {
    ...(props.adType ? { root: { 'ad-type': props.adType } } : {}),
    pcInputText: {
      root: {
        class: style['ad-inputtext'],
        ...(props.adType ? { 'ad-type': props.adType } : {}),
      },
    },
    ...(panelType
      ? {
          panel: {
            class: panelType,
            'ad-type': panelType,
          },
        }
      : {}),
  }
})

function onUpdateModelValue(value: DatePickerModelValueType) {
  if (value instanceof Date) {
    const formattedValue = props.showTime
      ? value.toISOString()
      : formatDate(value)
    emit('update:modelValue', formattedValue)
  } else {
    emit('update:modelValue', value)
  }
}
</script>

<style lang="scss" module>
@import 'index';
</style>

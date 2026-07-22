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

import { transformProps } from '../../boson/transform_props'

import type { DatePickerInterface, DatePickerModelValueType } from '.'
import { formatDate, parseDateValue } from './utils/format_date'

const props = defineProps<DatePickerInterface>()

const emit = defineEmits(['update:modelValue'])

const style = useCssModule()

const resolvedPanelClass = computed(() => props.panelClass ?? props.nuiType)

const parsedModelValue = computed(() => parseDateValue(props.modelValue))

const datePickerPt = computed(() => {
  const panelType = resolvedPanelClass.value

  return {
    ...(props.nuiType ? { root: { 'nui-type': props.nuiType } } : {}),
    pcInputText: {
      root: {
        class: style['ad-inputtext'],
        ...(props.nuiType ? { 'nui-type': props.nuiType } : {}),
      },
    },
    ...(panelType
      ? {
          panel: {
            class: panelType,
            'nui-type': panelType,
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

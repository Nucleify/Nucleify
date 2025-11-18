<template>
  <Select
    v-bind="transformProps(props)"
    :class="$style['ad-select']"
    :pt="{
      label: $style['ad-select-label'],
      dropdown: $style['ad-select-dropdown'],
      overlay: {
        class: $style['ad-select-overlay'],
        'ad-type': props.adType,
      },
      listContainer: $style['ad-select-list-container'],
      list: $style['ad-select-list'],
      option: $style['ad-select-option'],
    }"
    @update:model-value="onUpdateModelValue"
  />
</template>

<script setup lang="ts">
import type { SelectInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<SelectInterface>()
const emit = defineEmits(['update:modelValue'])

function onUpdateModelValue(value: unknown) {
  emit('update:modelValue', value)
}
</script>

<style lang="scss" module>
@import 'index';
</style>
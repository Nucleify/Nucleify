<template>
  <SelectButton
    v-bind="transformProps(props)"
    :pt="{
      pcToggleButton: {
        root: $style['ad-togglebutton'],
      }
    }"
    @update:model-value="updateValue"
  >
    <slot />
  </SelectButton>
</template>

<script setup lang="ts">
import type { SelectButtonInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<SelectButtonInterface>()

const emit = defineEmits(['update:modelValue'])

function updateValue(value: unknown): void {
  emit('update:modelValue', value)
}
</script>

<style lang="scss" module>
@import 'index';
</style>

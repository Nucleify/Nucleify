<template>
  <ColorPicker
    v-bind="transformProps(props)"
    @update:model-value="onUpdateModelValue"
  />
</template>

<script setup lang="ts">
import type { ColorPickerInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<ColorPickerInterface>()
const emit = defineEmits(['update:modelValue'])

function onUpdateModelValue(value: string) {
  emit('update:modelValue', value)
}
</script>

<template>
  <Select
    v-bind="transformProps(props)"
    @update:model-value="onUpdateModelValue"
  />
</template>

<script setup lang="ts">
import type { SelectInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<SelectInterface>()
const emit = defineEmits(['update:modelValue'])

function onUpdateModelValue(value: unknown) {
  emit('update:modelValue', value)
}
</script>

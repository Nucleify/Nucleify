<template>
  <Textarea
    v-bind="transformProps(props)"
    @update:model-value="updateValue"
  />
</template>

<script setup lang="ts">
import { Textarea } from 'primevue' // Import for Storybook

import type { TextareaInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<TextareaInterface>()

const emit = defineEmits(['update:modelValue'])

const updateValue = (value: string) => {
  emit('update:modelValue', value)
}
</script>

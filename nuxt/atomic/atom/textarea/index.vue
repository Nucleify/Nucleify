<template>
  <Textarea
    v-bind="transformProps(props, excludedProps)"
    @update:model-value="updateValue"
  />
</template>

<script setup lang="ts">
import { Textarea } from 'primevue' // Import for Storybook

import type { TextareaInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<TextareaInterface>()

const emit = defineEmits(['update:modelValue'])

const excludedProps: string[] = []

const updateValue = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <Checkbox 
    v-bind="transformProps(props)" 
    @update:modelValue="updateValue"
  />
</template>

<script setup lang="ts">
import { Checkbox } from 'primevue' // Import for Storybook

import type { CheckNucBoxInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<CheckNucBoxInterface>()

const emit = defineEmits(['update:modelValue'])

const updateValue = (value: boolean) => {
  emit('update:modelValue', value)
}
</script>

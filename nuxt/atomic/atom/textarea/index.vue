<template>
  <Textarea
    v-bind="transformProps(props)"
    :class="[$style['ad-textarea']]"
    @update:model-value="updateValue"
  >
    <slot />
  </Textarea>
</template>

<script setup lang="ts">
import { Textarea } from 'primevue' // Import for Storybook

import type { TextareaInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<TextareaInterface>()

const emit = defineEmits(['update:modelValue'])

const updateValue = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<style lang="scss" module>
@import 'index';
</style>
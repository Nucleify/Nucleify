<template>
  <Textarea
    :ad-type="props.adType"
    :model-value="props.modelValue"
    :default-value="props.defaultValue"
    :name="props.name"
    :auto-resize="props.autoResize"
    :size="props.size"
    :invalid="props.invalid"
    :variant="props.variant"
    :fluid="props.fluid"
    :form-control="props.formControl"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
    @update:model-value="updateValue"
  />
</template>

<script setup lang="ts">
import type { TextareaInterface } from 'atomic'

import Textarea from 'primevue/textarea' // Import for Storybook

const props = defineProps<TextareaInterface>()

const emit = defineEmits(['update:modelValue'])

const updateValue = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <FieldShell :label="label" :description="description" :error="error">
    <nui-select
      fluid
      :options.prop="options"
      :value.prop="modelValue"
      :placeholder="placeholder"
      @nui-change="onChange"
    />
  </FieldShell>
</template>

<script setup lang="ts">
import { nuiValueFromEvent } from '../../utils/nui_host'
import FieldShell from './FieldShell.vue'

export type FieldSelectOption = { label: string; value: string }

withDefaults(
  defineProps<{
    label?: string
    description?: string
    error?: string
    modelValue: string
    options: FieldSelectOption[]
    placeholder?: string
  }>(),
  {
    label: '',
    description: '',
    error: '',
    placeholder: '',
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function onChange(event: Event) {
  const next = nuiValueFromEvent(event)
  if (next !== null) emit('update:modelValue', next)
}
</script>

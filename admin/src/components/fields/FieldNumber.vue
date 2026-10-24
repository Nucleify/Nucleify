<template>
  <FieldShell :label="label" :description="description" :error="error">
    <nui-input-text
      type="number"
      fluid
      :value.prop="String(modelValue ?? '')"
      :disabled="disabled"
      @input="onInput"
    />
  </FieldShell>
</template>

<script setup lang="ts">
import { nuiValueFromEvent } from '../../utils/nui_host'
import FieldShell from './FieldShell.vue'

withDefaults(
  defineProps<{
    label?: string
    description?: string
    error?: string
    modelValue?: number | null
    disabled?: boolean
  }>(),
  {
    label: '',
    description: '',
    error: '',
    modelValue: null,
    disabled: false,
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: number | null]
}>()

function onInput(event: Event) {
  const raw = nuiValueFromEvent(event)
  if (raw === null || raw === '') {
    emit('update:modelValue', null)
    return
  }
  const n = Number(raw)
  emit('update:modelValue', Number.isFinite(n) ? n : null)
}
</script>

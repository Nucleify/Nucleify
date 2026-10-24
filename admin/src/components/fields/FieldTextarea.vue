<template>
  <FieldShell :label="label" :description="description" :error="error">
    <nui-textarea
      ref="host"
      fluid
      :rows="rows"
      :placeholder="placeholder"
      :value.prop="displayValue"
      @input="onInput"
    />
  </FieldShell>
</template>

<script setup lang="ts">
import { nuiHostValue, nuiValueFromEvent } from '../../utils/nui_host'
import FieldShell from './FieldShell.vue'

const props = withDefaults(
  defineProps<{
    label?: string
    description?: string
    error?: string
    rows?: number
    placeholder?: string
    modelValue?: string
    /** @deprecated use modelValue */
    value?: string
  }>(),
  {
    label: '',
    description: '',
    error: '',
    rows: 6,
    placeholder: '',
    modelValue: undefined,
    value: undefined,
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const host = ref<{ value?: unknown } | null>(null)

const displayValue = computed(
  () => props.modelValue ?? props.value ?? ''
)

watch(displayValue, (next) => {
  if (host.value && typeof host.value === 'object' && host.value.value !== next) {
    ;(host.value as { value: string }).value = next
  }
})

function onInput(event: Event) {
  const next = nuiValueFromEvent(event)
  if (next !== null) emit('update:modelValue', next)
}

defineExpose({
  get value() {
    return nuiHostValue(host.value) || displayValue.value
  },
  set value(next: string) {
    if (host.value && typeof host.value === 'object') {
      ;(host.value as { value: string }).value = next
    }
    emit('update:modelValue', next)
  },
})
</script>

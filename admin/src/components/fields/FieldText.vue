<template>
  <FieldShell :label="label" :description="description" :error="error">
    <nui-input-text
      ref="host"
      :type="type"
      fluid
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :value.prop="modelValue"
      :disabled="disabled"
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
    type?: string
    placeholder?: string
    autocomplete?: string
    modelValue?: string
    /** @deprecated use modelValue */
    value?: string
    disabled?: boolean
  }>(),
  {
    label: '',
    description: '',
    error: '',
    type: 'text',
    placeholder: '',
    autocomplete: undefined,
    modelValue: undefined,
    value: undefined,
    disabled: false,
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

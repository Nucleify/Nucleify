<template>
  <FieldShell :label="label" :description="description" :error="localError || error">
    <nui-textarea
      fluid
      :rows="rows"
      :value.prop="text"
      @input="onInput"
    />
  </FieldShell>
</template>

<script setup lang="ts">
import { nuiValueFromEvent } from '../../utils/nui_host'
import FieldShell from './FieldShell.vue'

const props = withDefaults(
  defineProps<{
    label?: string
    description?: string
    error?: string
    modelValue?: unknown
    rows?: number
  }>(),
  {
    label: '',
    description: '',
    error: '',
    modelValue: undefined,
    rows: 8,
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: unknown]
}>()

const localError = ref('')
const text = ref('')

watch(
  () => props.modelValue,
  (value) => {
    try {
      text.value = value === undefined ? '' : JSON.stringify(value, null, 2)
      localError.value = ''
    } catch {
      text.value = ''
    }
  },
  { immediate: true, deep: true }
)

function onInput(event: Event) {
  const next = nuiValueFromEvent(event) ?? ''
  text.value = next
  if (!next.trim()) {
    localError.value = ''
    emit('update:modelValue', null)
    return
  }
  try {
    emit('update:modelValue', JSON.parse(next))
    localError.value = ''
  } catch {
    localError.value = 'Invalid JSON'
  }
}
</script>

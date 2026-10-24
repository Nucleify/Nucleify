<template>
  <FieldShell :label="label" :description="description" :error="error">
    <nui-input-text
      ref="host"
      :type="type"
      fluid
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :value.prop="value"
    />
  </FieldShell>
</template>

<script setup lang="ts">
import FieldShell from './FieldShell.vue'

withDefaults(
  defineProps<{
    label?: string
    description?: string
    error?: string
    type?: string
    placeholder?: string
    autocomplete?: string
    value?: string
  }>(),
  {
    label: '',
    description: '',
    error: '',
    type: 'text',
    placeholder: '',
    autocomplete: undefined,
    value: undefined,
  }
)

const host = ref<{ value?: unknown } | null>(null)

defineExpose({
  get value() {
    return typeof host.value?.value === 'string' ? host.value.value : ''
  },
  set value(next: string) {
    if (host.value && typeof host.value === 'object') {
      ;(host.value as { value: string }).value = next
    }
  },
})
</script>

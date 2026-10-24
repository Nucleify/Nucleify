<template>
  <FieldShell :label="label" :description="description" :error="error">
    <nui-textarea ref="host" fluid :rows="rows" :placeholder="placeholder" />
  </FieldShell>
</template>

<script setup lang="ts">
import FieldShell from './FieldShell.vue'

withDefaults(
  defineProps<{
    label?: string
    description?: string
    error?: string
    rows?: number
    placeholder?: string
  }>(),
  {
    label: '',
    description: '',
    error: '',
    rows: 6,
    placeholder: '',
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

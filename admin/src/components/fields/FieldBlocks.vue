<template>
  <LayoutEditor
    :label="label"
    :description="description"
    :error="error"
    :model-value="modelValue"
    :allowed-types="allowedTypes"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
import LayoutEditor from '../cms/LayoutEditor.vue'

withDefaults(
  defineProps<{
    label?: string
    description?: string
    error?: string
    modelValue?: {
      id: string
      type: string
      order: number
      props: Record<string, unknown>
    }[]
    allowedTypes?: string[]
    /** @deprecated labels come from widget registry */
    typeLabels?: Record<string, string>
  }>(),
  {
    label: '',
    description: '',
    error: '',
    modelValue: () => [],
    allowedTypes: () => [],
    typeLabels: () => ({}),
  }
)

const emit = defineEmits<{
  'update:modelValue': [
    value: {
      id: string
      type: string
      order: number
      props: Record<string, unknown>
    }[],
  ]
}>()
</script>

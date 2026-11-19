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

<style lang="scss">
.admin-blocks {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.admin-blocks__row {
  padding: 1rem;
  border: 1px solid var(--admin-border);
  background: var(--admin-surface);
}
.admin-blocks__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}
</style>

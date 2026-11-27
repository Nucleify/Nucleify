<template>
  <label class="admin-field-checkbox">
    <nui-checkbox
      :checked.prop="checked"
      :aria-label="ariaLabel || label"
      @change="onChange"
    />
    <span>{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    checked: boolean
    ariaLabel?: string
  }>(),
  {
    ariaLabel: '',
  }
)

const emit = defineEmits<{
  'update:checked': [checked: boolean]
}>()

function onChange(event: Event) {
  const detail = (event as CustomEvent<{ checked?: boolean }>).detail
  if (detail && typeof detail.checked === 'boolean') {
    emit('update:checked', detail.checked)
    return
  }
  const host = event.currentTarget as { checked?: boolean } | null
  emit('update:checked', Boolean(host?.checked))
}
</script>

<style lang="scss">
.admin-field-checkbox {
  display: flex;
  gap: 0.4rem;
  align-items: center;
  font-size: 0.875rem;
  cursor: pointer;
}
</style>

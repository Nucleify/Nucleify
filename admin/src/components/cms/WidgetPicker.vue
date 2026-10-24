<template>
  <div class="admin-widget-picker">
    <p class="admin-form__label">Add section</p>
    <div class="admin-widget-picker__grid">
      <button
        v-for="widget in widgets"
        :key="widget.type"
        type="button"
        class="admin-widget-picker__item"
        @click="emit('pick', widget.type)"
      >
        <strong>{{ widget.label }}</strong>
        <span class="admin-muted">{{ widget.type }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { listWidgets } from '../../../../shared_modules/nuc_admin/cms/registry'

const props = defineProps<{
  allowedTypes?: string[]
}>()

const emit = defineEmits<{
  pick: [type: string]
}>()

const widgets = computed(() => {
  const all = listWidgets()
  if (!props.allowedTypes?.length) return all
  const allow = new Set(props.allowedTypes)
  return all.filter((w) => allow.has(w.type))
})
</script>

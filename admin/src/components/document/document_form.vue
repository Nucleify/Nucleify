<template>
  <div class="admin-document-grid">
    <div class="admin-document-main">
      <SchemaFormRenderer
        :fields="fields"
        :model-value="modelValue"
        position="main"
        @update:model-value="emit('update:modelValue', $event as any)"
      />
    </div>
    <DocumentMetaSidebar>
      <SchemaFormRenderer
        :fields="fields"
        :model-value="modelValue"
        position="sidebar"
        @update:model-value="emit('update:modelValue', $event as any)"
      />
      <slot name="sidebar" />
    </DocumentMetaSidebar>
  </div>
</template>

<script setup lang="ts">
import type { FieldConfig } from '@shared_modules'
import type { DocumentFormModel } from '@admin'


defineProps<{
  fields: FieldConfig[]
  modelValue: DocumentFormModel
}>()

const emit = defineEmits<{
  'update:modelValue': [value: DocumentFormModel]
}>()
</script>

<style lang="scss">
@media (max-width: 900px) {
  .admin-document-grid {
    grid-template-columns: 1fr;
  }

  .admin-document-sidebar {
    position: static;
  }
}

.admin-document-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 16rem;
  gap: 1.25rem;
  align-items: start;
}
.admin-document-main {
  min-width: 0;
}
</style>

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

import { SchemaFormRenderer } from '@admin'
import { DocumentMetaSidebar } from '@admin'

defineProps<{
  fields: FieldConfig[]
  modelValue: DocumentFormModel
}>()

const emit = defineEmits<{
  'update:modelValue': [value: DocumentFormModel]
}>()
</script>

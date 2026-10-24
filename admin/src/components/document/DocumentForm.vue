<template>
  <div class="admin-document-grid">
    <div class="admin-document-main">
      <SchemaFormRenderer
        :fields="fields"
        :model-value="modelValue"
        position="main"
        @update:model-value="emit('update:modelValue', $event)"
      />
    </div>
    <DocumentMetaSidebar>
      <SchemaFormRenderer
        :fields="fields"
        :model-value="modelValue"
        position="sidebar"
        @update:model-value="emit('update:modelValue', $event)"
      />
      <slot name="sidebar" />
    </DocumentMetaSidebar>
  </div>
</template>

<script setup lang="ts">
import type { FieldConfig } from '../../../../shared_modules/nuc_admin/cms/fields/types'

import SchemaFormRenderer from '../cms/SchemaFormRenderer.vue'
import DocumentMetaSidebar from './DocumentMetaSidebar.vue'

defineProps<{
  fields: FieldConfig[]
  modelValue: Record<string, unknown>
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, unknown>]
}>()
</script>

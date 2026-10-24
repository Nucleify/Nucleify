<template>
  <FieldShell :label="label" :description="description" :error="error">
    <div class="admin-array">
      <div
        v-for="(row, index) in rows"
        :key="index"
        class="admin-array__row"
      >
        <SchemaFormRenderer
          :fields="fields"
          :model-value="row"
          position="all"
          @update:model-value="updateRow(index, $event)"
        />
        <nui-button
          type="button"
          variant="outlined"
          label="Remove"
          @click="removeAt(index)"
        />
      </div>
      <nui-button
        type="button"
        variant="filled"
        label="Add row"
        @click="addRow"
      />
    </div>
  </FieldShell>
</template>

<script setup lang="ts">
import type { FieldConfig } from '../../../../shared_modules/nuc_admin/cms/fields/types'

import SchemaFormRenderer from '../cms/SchemaFormRenderer.vue'
import FieldShell from './FieldShell.vue'

const props = withDefaults(
  defineProps<{
    label?: string
    description?: string
    error?: string
    modelValue?: Record<string, unknown>[]
    fields: FieldConfig[]
  }>(),
  {
    label: '',
    description: '',
    error: '',
    modelValue: () => [],
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, unknown>[]]
}>()

const rows = computed(() =>
  Array.isArray(props.modelValue) ? props.modelValue : []
)

function emitRows(next: Record<string, unknown>[]) {
  emit('update:modelValue', next)
}

function addRow() {
  emitRows([...rows.value, {}])
}

function removeAt(index: number) {
  const next = [...rows.value]
  next.splice(index, 1)
  emitRows(next)
}

function updateRow(index: number, value: Record<string, unknown>) {
  const next = [...rows.value]
  next[index] = value
  emitRows(next)
}
</script>

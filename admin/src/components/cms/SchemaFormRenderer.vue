<template>
  <div class="admin-schema-form">
    <template v-for="field in visibleFields" :key="fieldKey(field)">
      <FieldGroup
        v-if="field.type === 'group' && 'name' in field"
        :label="field.label || field.name"
        :description="field.admin?.description"
      >
        <SchemaFormRenderer
          :fields="field.fields"
          :model-value="groupValue(field.name)"
          position="all"
          @update:model-value="setGroup(field.name, $event)"
        />
      </FieldGroup>

      <div v-else-if="field.type === 'row'" class="admin-schema-row">
        <SchemaFormRenderer
          :fields="field.fields"
          :model-value="modelValue"
          position="all"
          @update:model-value="emit('update:modelValue', $event)"
        />
      </div>

      <div v-else-if="field.type === 'tabs'" class="admin-schema-tabs">
        <div class="admin-actions" style="margin-bottom: 0.75rem">
          <nui-button
            v-for="(tab, i) in field.tabs"
            :key="tab.label"
            type="button"
            :variant="activeTab === i ? 'filled' : 'outlined'"
            :label="tab.label"
            @click="activeTab = i"
          />
        </div>
        <SchemaFormRenderer
          v-if="field.tabs[activeTab]"
          :fields="field.tabs[activeTab].fields"
          :model-value="modelValue"
          position="all"
          @update:model-value="emit('update:modelValue', $event)"
        />
      </div>

      <LayoutEditor
        v-else-if="field.type === 'blocks' && 'name' in field"
        :label="field.label || field.name"
        :description="field.admin?.description"
        :model-value="blocksValue(field.name)"
        :allowed-types="field.blocks?.length ? field.blocks : widgetTypes"
        @update:model-value="setField(field.name, $event)"
      />

      <FieldArray
        v-else-if="field.type === 'array' && 'name' in field"
        :label="field.label || field.name"
        :description="field.admin?.description"
        :fields="field.fields"
        :model-value="arrayValue(field.name)"
        @update:model-value="setField(field.name, $event)"
      />

      <FieldText
        v-else-if="(field.type === 'text' || field.type === 'email' || field.type === 'date') && 'name' in field"
        :label="field.label || field.name"
        :description="field.admin?.description"
        :type="field.type === 'email' ? 'email' : 'text'"
        :model-value="stringValue(field.name)"
        :disabled="Boolean(field.admin?.readOnly)"
        @update:model-value="setField(field.name, $event)"
      />

      <FieldTextarea
        v-else-if="field.type === 'textarea' && 'name' in field"
        :label="field.label || field.name"
        :description="field.admin?.description"
        :model-value="stringValue(field.name)"
        @update:model-value="setField(field.name, $event)"
      />

      <FieldSelect
        v-else-if="field.type === 'select' && 'name' in field"
        :label="field.label || field.name"
        :description="field.admin?.description"
        :model-value="stringValue(field.name)"
        :options="field.options ?? []"
        @update:model-value="setField(field.name, $event)"
      />

      <FieldCheckbox
        v-else-if="field.type === 'checkbox' && 'name' in field"
        :label="field.label || field.name"
        :checked="Boolean(modelValue[field.name])"
        @update:checked="setField(field.name, $event)"
      />

      <FieldNumber
        v-else-if="field.type === 'number' && 'name' in field"
        :label="field.label || field.name"
        :description="field.admin?.description"
        :model-value="numberValue(field.name)"
        :disabled="Boolean(field.admin?.readOnly)"
        @update:model-value="setField(field.name, $event)"
      />

      <FieldJson
        v-else-if="field.type === 'json' && 'name' in field"
        :label="field.label || field.name"
        :description="field.admin?.description"
        :model-value="modelValue[field.name]"
        @update:model-value="setField(field.name, $event)"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { FieldConfig } from '../../../../shared_modules/nuc_admin/cms/fields/types'
import { listWidgets } from '../../../../shared_modules/nuc_admin/cms/registry'

import FieldArray from '../fields/FieldArray.vue'
import FieldCheckbox from '../fields/FieldCheckbox.vue'
import FieldGroup from '../fields/FieldGroup.vue'
import FieldJson from '../fields/FieldJson.vue'
import FieldNumber from '../fields/FieldNumber.vue'
import FieldSelect from '../fields/FieldSelect.vue'
import FieldText from '../fields/FieldText.vue'
import FieldTextarea from '../fields/FieldTextarea.vue'
import LayoutEditor from './LayoutEditor.vue'

const props = withDefaults(
  defineProps<{
    fields: FieldConfig[]
    modelValue: Record<string, unknown>
    position?: 'main' | 'sidebar' | 'all'
  }>(),
  {
    position: 'all',
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, unknown>]
}>()

const activeTab = ref(0)

const widgetTypes = listWidgets().map((w) => w.type)

const visibleFields = computed(() =>
  props.fields.filter((field) => {
    if (field.admin?.disabled || field.admin?.hidden) return false
    if (props.position === 'all') return true
    const pos = field.admin?.position ?? 'main'
    if (field.type === 'tabs' || field.type === 'row') {
      return props.position === 'main'
    }
    return pos === props.position
  })
)

function fieldKey(field: FieldConfig): string {
  if ('name' in field && field.name) return field.name
  return `${field.type}-${field.label ?? 'anon'}`
}

function stringValue(name: string): string {
  const v = props.modelValue[name]
  return typeof v === 'string' ? v : v == null ? '' : String(v)
}

function numberValue(name: string): number | null {
  const v = props.modelValue[name]
  return typeof v === 'number' ? v : null
}

function groupValue(name: string): Record<string, unknown> {
  const v = props.modelValue[name]
  return v && typeof v === 'object' && !Array.isArray(v)
    ? (v as Record<string, unknown>)
    : {}
}

function blocksValue(name: string) {
  const v = props.modelValue[name]
  return Array.isArray(v) ? v : []
}

function arrayValue(name: string): Record<string, unknown>[] {
  const v = props.modelValue[name]
  if (!Array.isArray(v)) return []
  return v.map((row) =>
    row && typeof row === 'object' && !Array.isArray(row)
      ? (row as Record<string, unknown>)
      : {}
  )
}

function setField(name: string, value: unknown) {
  emit('update:modelValue', { ...props.modelValue, [name]: value })
}

function setGroup(name: string, value: Record<string, unknown>) {
  setField(name, value)
}
</script>

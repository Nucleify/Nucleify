<template>
  <FieldShell :label="label" :description="description" :error="error">
    <div class="admin-layout-editor">
      <div
        v-for="(section, index) in sections"
        :key="section.id"
        class="admin-layout-editor__row"
        :class="{ 'is-dragging': dragIndex === index }"
        draggable="true"
        @dragstart="onDragStart(index, $event)"
        @dragover.prevent="onDragOver(index)"
        @drop.prevent="onDrop(index)"
        @dragend="dragIndex = null"
      >
        <div class="admin-layout-editor__handle" title="Drag to reorder">⋮⋮</div>
        <div class="admin-layout-editor__body">
          <div class="admin-layout-editor__meta">
            <strong>{{ labelFor(section.type) }}</strong>
            <span class="admin-muted" style="font-family: var(--admin-mono); font-size: 0.7rem">
              {{ section.id }} · {{ section.type }}
            </span>
            <div class="admin-actions">
              <nui-button
                type="button"
                variant="outlined"
                label="Remove"
                @click="removeAt(index)"
              />
            </div>
          </div>
          <SchemaFormRenderer
            v-if="propsFields(section.type).length"
            :fields="propsFields(section.type)"
            :model-value="section.props"
            position="all"
            @update:model-value="setProps(index, $event)"
          />
          <FieldJson
            v-else
            :model-value="section.props"
            label="Props"
            :rows="5"
            @update:model-value="setPropsRaw(index, $event)"
          />
        </div>
      </div>

      <WidgetPicker :allowed-types="allowedTypes" @pick="addSection" />
    </div>
  </FieldShell>
</template>

<script setup lang="ts">
import { getWidget } from '../../../../shared_modules/nuc_admin/cms/registry'

import { fieldsFromPropsSchema } from '../../utils/widget_props_fields'
import FieldJson from '../fields/FieldJson.vue'
import FieldShell from '../fields/FieldShell.vue'
import SchemaFormRenderer from './SchemaFormRenderer.vue'
import WidgetPicker from './WidgetPicker.vue'

type Section = {
  id: string
  type: string
  order: number
  props: Record<string, unknown>
}

const props = withDefaults(
  defineProps<{
    label?: string
    description?: string
    error?: string
    modelValue?: Section[]
    allowedTypes?: string[]
  }>(),
  {
    label: '',
    description: '',
    error: '',
    modelValue: () => [],
    allowedTypes: () => [],
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: Section[]]
}>()

const dragIndex = ref<number | null>(null)

const sections = computed(() =>
  [...(props.modelValue ?? [])].sort((a, b) => a.order - b.order)
)

function labelFor(type: string): string {
  return getWidget(type)?.label || type
}

function propsFields(type: string) {
  const schema = getWidget(type)?.propsSchema
  return schema ? fieldsFromPropsSchema(schema) : []
}

function emitOrdered(next: Section[]) {
  emit(
    'update:modelValue',
    next.map((s, i) => ({ ...s, order: i }))
  )
}

function removeAt(index: number) {
  const list = [...sections.value]
  list.splice(index, 1)
  emitOrdered(list)
}

function setProps(index: number, value: Record<string, unknown>) {
  const list = [...sections.value]
  const row = list[index]
  if (!row) return
  list[index] = { ...row, props: value }
  emitOrdered(list)
}

function setPropsRaw(index: number, value: unknown) {
  const next =
    value && typeof value === 'object' && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {}
  setProps(index, next)
}

function addSection(type: string) {
  const id = `sec_${Date.now().toString(36)}`
  emitOrdered([
    ...sections.value,
    { id, type, order: sections.value.length, props: {} },
  ])
}

function onDragStart(index: number, event: DragEvent) {
  dragIndex.value = index
  event.dataTransfer?.setData('text/plain', String(index))
  if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move'
}

function onDragOver(index: number) {
  if (dragIndex.value === null || dragIndex.value === index) return
}

function onDrop(index: number) {
  if (dragIndex.value === null || dragIndex.value === index) {
    dragIndex.value = null
    return
  }
  const list = [...sections.value]
  const [row] = list.splice(dragIndex.value, 1)
  if (!row) return
  list.splice(index, 0, row)
  dragIndex.value = null
  emitOrdered(list)
}
</script>

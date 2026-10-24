<template>
  <FieldShell :label="label" :description="description" :error="error">
    <div class="admin-blocks">
      <div
        v-for="(section, index) in sections"
        :key="section.id"
        class="admin-blocks__row"
      >
        <div class="admin-blocks__meta">
          <span class="admin-muted" style="font-family: var(--admin-mono); font-size: 0.7rem">
            {{ section.id }}
          </span>
          <div class="admin-actions">
            <nui-button
              type="button"
              variant="outlined"
              label="Up"
              :disabled="index === 0"
              @click="move(index, -1)"
            />
            <nui-button
              type="button"
              variant="outlined"
              label="Down"
              :disabled="index === sections.length - 1"
              @click="move(index, 1)"
            />
            <nui-button
              type="button"
              variant="outlined"
              label="Remove"
              @click="removeAt(index)"
            />
          </div>
        </div>
        <FieldSelect
          :model-value="section.type"
          label="Type"
          :options="typeOptions"
          @update:model-value="setType(index, $event)"
        />
        <FieldJson
          :model-value="section.props"
          label="Props"
          :rows="6"
          @update:model-value="setProps(index, $event)"
        />
      </div>
      <div class="admin-actions" style="margin-top: 0.75rem">
        <FieldSelect
          v-model="pickerType"
          label="Add section"
          :options="typeOptions"
          placeholder="Choose type"
        />
        <nui-button
          type="button"
          variant="filled"
          label="Add"
          :disabled="!pickerType"
          @click="addSection"
        />
      </div>
    </div>
  </FieldShell>
</template>

<script setup lang="ts">
import FieldJson from './FieldJson.vue'
import FieldSelect from './FieldSelect.vue'
import FieldShell from './FieldShell.vue'

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
  'update:modelValue': [value: Section[]]
}>()

const pickerType = ref('')

const sections = computed(() =>
  [...(props.modelValue ?? [])].sort((a, b) => a.order - b.order)
)

const typeOptions = computed(() =>
  (props.allowedTypes ?? []).map((value) => ({
    value,
    label: props.typeLabels?.[value] || value,
  }))
)

function emitOrdered(next: Section[]) {
  emit(
    'update:modelValue',
    next.map((s, i) => ({ ...s, order: i }))
  )
}

function move(index: number, delta: number) {
  const list = [...sections.value]
  const target = index + delta
  if (target < 0 || target >= list.length) return
  const [row] = list.splice(index, 1)
  list.splice(target, 0, row!)
  emitOrdered(list)
}

function removeAt(index: number) {
  const list = [...sections.value]
  list.splice(index, 1)
  emitOrdered(list)
}

function setType(index: number, type: string) {
  const list = [...sections.value]
  const row = list[index]
  if (!row) return
  list[index] = { ...row, type }
  emitOrdered(list)
}

function setProps(index: number, value: unknown) {
  const list = [...sections.value]
  const row = list[index]
  if (!row) return
  const nextProps =
    value && typeof value === 'object' && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {}
  list[index] = { ...row, props: nextProps }
  emitOrdered(list)
}

function addSection() {
  if (!pickerType.value) return
  const id = `sec_${Date.now().toString(36)}`
  emitOrdered([
    ...sections.value,
    { id, type: pickerType.value, order: sections.value.length, props: {} },
  ])
  pickerType.value = ''
}
</script>

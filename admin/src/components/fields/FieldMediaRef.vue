<template>
  <FieldShell :label="label" :description="description" :error="error">
    <FieldSelect
      :model-value="modelValue || ''"
      :options="options"
      placeholder="Select media"
      @update:model-value="emit('update:modelValue', $event)"
    />
    <p v-if="modelValue" class="admin-form__hint" style="margin-top: 0.35rem">
      id: {{ modelValue }}
    </p>
  </FieldShell>
</template>

<script setup lang="ts">
import { adminApiGet } from '../../composables/use_admin_api'
import FieldSelect from './FieldSelect.vue'
import FieldShell from './FieldShell.vue'

withDefaults(
  defineProps<{
    label?: string
    description?: string
    error?: string
    modelValue?: string
  }>(),
  {
    label: '',
    description: '',
    error: '',
    modelValue: '',
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

type MediaRow = { id: string; filename: string; alt?: string }

const options = ref<{ label: string; value: string }[]>([])

onMounted(async () => {
  try {
    const rows = (await adminApiGet<MediaRow[]>('/api/admin/media')) ?? []
    options.value = rows.map((row) => ({
      value: row.id,
      label: row.alt ? `${row.filename} (${row.alt})` : row.filename,
    }))
  } catch {
    options.value = []
  }
})
</script>

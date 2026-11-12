<template>
  <FieldShell :label="label" :description="description" :error="error">
    <div class="admin-media-ref">
      <FieldSelect
        :model-value="modelValue || ''"
        :options="options"
        placeholder="Select media"
        @update:model-value="emit('update:modelValue', $event)"
      />
      <div v-if="selected" class="admin-media-ref__preview">
        <img
          v-if="selected.mime?.startsWith('image/') && selected.publicUrl"
          :src="selected.publicUrl"
          :alt="selected.alt || selected.filename"
          style="max-width: 160px; max-height: 100px; border-radius: 6px"
        />
        <p class="admin-muted" style="margin: 0.35rem 0 0; font-size: 0.75rem">
          {{ selected.filename }}
          <template v-if="selected.publicUrl">
            ·
            <a :href="selected.publicUrl" target="_blank" rel="noopener">
              Open
            </a>
          </template>
        </p>
        <FieldText
          :model-value="selected.alt || ''"
          label="Alt"
          @update:model-value="patchAlt"
        />
      </div>
    </div>
  </FieldShell>
</template>

<script setup lang="ts">
import { adminApiGet, adminApiSend } from '@admin'
import { FieldSelect } from '@admin'
import { FieldShell } from '@admin'
import { FieldText } from '@admin'

const props = withDefaults(
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

type MediaRow = {
  id: string
  filename: string
  alt?: string
  mime?: string
  storage_path?: string
  public_url?: string
}

const rows = ref<MediaRow[]>([])
const options = computed(() =>
  rows.value.map((row) => ({
    value: row.id,
    label: row.alt ? `${row.filename} (${row.alt})` : row.filename,
  }))
)

const selected = computed(() => {
  const row = rows.value.find((r) => r.id === props.modelValue)
  if (!row) return null
  const publicUrl =
    row.public_url ||
    (row.storage_path
      ? `/storage/v1/object/public/cms-media/${row.storage_path}`
      : '')
  return { ...row, publicUrl }
})

async function patchAlt(alt: string) {
  if (!props.modelValue) return
  try {
    await adminApiSend(`/api/admin/media/${props.modelValue}`, 'PATCH', { alt })
    const row = rows.value.find((r) => r.id === props.modelValue)
    if (row) row.alt = alt
  } catch {
    // ignore
  }
}

onMounted(async () => {
  try {
    rows.value = (await adminApiGet<MediaRow[]>('/api/admin/media')) ?? []
  } catch {
    rows.value = []
  }
})
</script>

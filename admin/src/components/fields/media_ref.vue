<template>
  <FieldShell :label="label" :description="description" :error="error">
    <div class="admin-media-ref">
      <div v-if="previewSrc" class="admin-media-ref__frame">
        <img
          :src="previewSrc"
          :alt="previewAlt"
          class="admin-media-ref__img"
        />
      </div>
      <div v-else class="admin-media-ref__empty">
        No image selected
      </div>

      <div class="admin-actions admin-media-ref__actions">
        <nui-button
          type="button"
          variant="outlined"
          :label="modelValue ? 'Change media' : 'Choose media'"
          @click="pickerOpen = true"
        />
        <nui-button
          v-if="modelValue"
          type="button"
          variant="outlined"
          label="Clear"
          @click="clear"
        />
      </div>

      <p
        v-if="metaLabel"
        class="admin-muted admin-media-ref__meta"
      >
        <span>{{ metaLabel }}</span>
        <a
          v-if="previewSrc"
          :href="previewSrc"
          target="_blank"
          rel="noopener"
        >
          · Open
        </a>
      </p>

      <FieldText
        v-if="selected"
        :model-value="selected.alt || ''"
        label="Alt"
        @update:model-value="patchAlt"
      />

      <MediaPickerModal
        :open="pickerOpen"
        :model-value="modelValue"
        @close="pickerOpen = false"
        @select="onSelect"
      />
    </div>
  </FieldShell>
</template>

<script setup lang="ts">
import { apiGet, apiSend } from '../../composables/use_api'
import {
  isMediaId,
  isMediaUrl,
  mediaPublicUrl,
} from '../../utils/media_url'

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

const config = useRuntimeConfig()
const supabaseUrl = computed(() =>
  String((config.public as { supabaseUrl?: string }).supabaseUrl || '')
)

const rows = ref<MediaRow[]>([])
const pickerOpen = ref(false)

const isExternalUrl = computed(
  () => Boolean(props.modelValue) && isMediaUrl(props.modelValue)
)

const selected = computed(() => {
  if (!props.modelValue || isExternalUrl.value) return null
  const row = rows.value.find((r) => r.id === props.modelValue)
  if (!row) return null
  return { ...row, publicUrl: mediaPublicUrl(row, supabaseUrl.value) }
})

const previewSrc = computed(() => {
  if (!props.modelValue) return ''
  if (isExternalUrl.value) return props.modelValue.trim()
  return selected.value?.publicUrl || ''
})

const previewAlt = computed(
  () => selected.value?.alt || selected.value?.filename || 'Selected image'
)

const metaLabel = computed(() => {
  if (selected.value?.filename) return selected.value.filename
  if (isExternalUrl.value) return 'External URL'
  return ''
})

function onSelect(id: string) {
  emit('update:modelValue', id)
  pickerOpen.value = false
  void refreshRows()
}

function clear() {
  emit('update:modelValue', '')
}

async function patchAlt(alt: string) {
  if (!props.modelValue || !isMediaId(props.modelValue)) return
  try {
    await apiSend(`/api/admin/media/${props.modelValue}`, 'PATCH', { alt })
    const row = rows.value.find((r) => r.id === props.modelValue)
    if (row) row.alt = alt
  } catch {
    // ignore
  }
}

async function refreshRows() {
  try {
    rows.value = (await apiGet<MediaRow[]>('/api/admin/media')) ?? []
  } catch {
    rows.value = []
  }
}

onMounted(() => {
  void refreshRows()
})

watch(
  () => props.modelValue,
  async () => {
    if (!props.modelValue || isMediaUrl(props.modelValue)) return
    if (rows.value.some((r) => r.id === props.modelValue)) return
    await refreshRows()
  }
)
</script>

<template>
  <nui-dialog
    v-if="open"
    visible
    header="Choose media"
    width="42rem"
    dismissable-mask
    @hide="emit('close')"
  >
    <div class="admin-media-picker__tabs" role="tablist">
      <button
        type="button"
        class="admin-media-picker__tab"
        role="tab"
        :aria-selected="tab === 'library'"
        :class="{ 'is-active': tab === 'library' }"
        @click="tab = 'library'"
      >
        Media
      </button>
      <button
        type="button"
        class="admin-media-picker__tab"
        role="tab"
        :aria-selected="tab === 'upload'"
        :class="{ 'is-active': tab === 'upload' }"
        @click="tab = 'upload'"
      >
        Upload
      </button>
    </div>

    <template v-if="tab === 'library'">
      <FieldText
        :model-value="query"
        label="Search"
        placeholder="Filename or alt"
        @update:model-value="query = $event"
      />
      <p v-if="loadError" class="admin-form__error">{{ loadError }}</p>
      <p v-else-if="!filtered.length" class="admin-muted" style="margin: 0.75rem 0 0">
        No media yet. Switch to Upload to add a file.
      </p>
      <div v-else class="admin-media-grid" style="margin-top: 0.75rem">
        <button
          v-for="row in filtered"
          :key="row.id"
          type="button"
          class="admin-media-card"
          :class="{ 'is-selected': row.id === modelValue }"
          @click="emit('select', row.id)"
        >
          <div class="admin-media-card__thumb">
            <img
              v-if="row.mime?.startsWith('image/') && thumb(row)"
              :src="thumb(row)"
              :alt="row.alt || row.filename"
            />
            <span v-else>{{ row.mime || 'file' }}</span>
          </div>
          <p class="admin-media-card__name">{{ row.filename }}</p>
        </button>
      </div>
    </template>

    <div v-else class="admin-media-picker__upload">
      <label
        class="admin-media-picker__dropzone"
        :class="{
          'is-dragover': dragOver,
          'has-preview': Boolean(previewUrl),
        }"
        @dragover.prevent="dragOver = true"
        @dragleave.prevent="dragOver = false"
        @drop.prevent="onDrop"
      >
        <input
          ref="fileInput"
          type="file"
          accept="image/*,.png,.jpg,.jpeg,.webp,.gif,.svg"
          class="admin-media-picker__file"
          @change="onFileInput"
        />
        <img
          v-if="previewUrl"
          :src="previewUrl"
          :alt="pendingFile?.name || 'Preview'"
          class="admin-media-picker__preview"
        />
        <span v-else-if="pendingFile" class="admin-media-picker__filename">
          {{ pendingFile.name }}
        </span>
        <span v-else>Drop an image here, or click to browse</span>
      </label>
      <p
        v-if="pendingFile && previewUrl"
        class="admin-muted admin-media-picker__filename-note"
      >
        {{ pendingFile.name }}
      </p>
      <FieldText
        :model-value="alt"
        label="Alt text"
        placeholder="Optional"
        @update:model-value="alt = $event"
      />
      <p v-if="uploadError" class="admin-form__error">{{ uploadError }}</p>
    </div>

    <div slot="footer" class="admin-actions">
      <nui-button
        type="button"
        variant="outlined"
        label="Close"
        @click="emit('close')"
      />
      <nui-button
        v-if="tab === 'upload'"
        type="button"
        variant="filled"
        :label="uploading ? 'Uploading…' : 'Upload & select'"
        :disabled="uploading || !pendingFile"
        @click="upload"
      />
    </div>
  </nui-dialog>
</template>

<script setup lang="ts">
import { adminApiGet, adminApiSend } from '../../composables/use_admin_api'
import { useFilePreview } from '../../composables/use_file_preview'
import { mediaPublicUrl } from '../../utils/media_url'

type MediaRow = {
  id: string
  filename: string
  alt?: string
  mime?: string
  storage_path?: string
  public_url?: string
}

const props = defineProps<{
  open: boolean
  modelValue?: string
}>()

const emit = defineEmits<{
  close: []
  select: [id: string]
}>()

const config = useRuntimeConfig()
const supabaseUrl = computed(() =>
  String((config.public as { supabaseUrl?: string }).supabaseUrl || '')
)

const rows = ref<MediaRow[]>([])
const query = ref('')
const tab = ref<'library' | 'upload'>('library')
const loadError = ref('')
const uploadError = ref('')
const uploading = ref(false)
const { pendingFile, previewUrl, setPending, clearPreview } = useFilePreview()
const alt = ref('')
const dragOver = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return rows.value
  return rows.value.filter(
    (r) =>
      r.filename.toLowerCase().includes(q) ||
      String(r.alt || '')
        .toLowerCase()
        .includes(q)
  )
})

function thumb(row: MediaRow) {
  return mediaPublicUrl(row, supabaseUrl.value)
}

function readAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

function onFileInput(event: Event) {
  const input = event.target as HTMLInputElement
  uploadError.value = ''
  setPending(input.files?.[0] ?? null)
}

function onDrop(event: DragEvent) {
  dragOver.value = false
  const file = event.dataTransfer?.files?.[0] ?? null
  if (!file) return
  uploadError.value = ''
  setPending(file)
}

async function loadLibrary() {
  loadError.value = ''
  try {
    rows.value = (await adminApiGet<MediaRow[]>('/api/admin/media')) ?? []
  } catch (e) {
    rows.value = []
    loadError.value =
      e instanceof Error ? e.message : 'Failed to load media'
  }
}

async function upload() {
  if (!pendingFile.value) return
  uploading.value = true
  uploadError.value = ''
  try {
    const contentBase64 = await readAsBase64(pendingFile.value)
    const created = await adminApiSend<MediaRow>('/api/admin/media', 'POST', {
      filename: pendingFile.value.name,
      mime: pendingFile.value.type || 'application/octet-stream',
      size: pendingFile.value.size,
      alt: alt.value,
      contentBase64,
    })
    setPending(null)
    alt.value = ''
    if (fileInput.value) fileInput.value.value = ''
    if (created?.id) {
      emit('select', created.id)
      return
    }
    await loadLibrary()
    tab.value = 'library'
  } catch (e) {
    uploadError.value =
      e instanceof Error ? e.message : 'Upload failed'
  } finally {
    uploading.value = false
  }
}

watch(
  () => props.open,
  async (open) => {
    if (!open) {
      clearPreview()
      return
    }
    tab.value = 'library'
    query.value = ''
    uploadError.value = ''
    setPending(null)
    alt.value = ''
    await loadLibrary()
  }
)
</script>

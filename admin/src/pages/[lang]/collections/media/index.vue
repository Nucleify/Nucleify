<template>
  <div>
    <div class="admin-page-header">
      <div>
        <h1>Media</h1>
        <p>Upload library — reference assets by id in page props.</p>
      </div>
    </div>

    <p v-if="error" class="admin-form__error">{{ error }}</p>
    <p v-if="ok" style="color: #86efac">{{ ok }}</p>

    <div
      class="admin-panel admin-dropzone"
      :class="{ 'is-dragover': dragOver }"
      @dragover.prevent="dragOver = true"
      @dragleave.prevent="dragOver = false"
      @drop.prevent="onDrop"
    >
      <p class="admin-muted" style="margin: 0 0 0.75rem">
        Drop a file here or choose one.
      </p>
      <input ref="fileInput" type="file" @change="onFileInput" />
      <FieldText v-model="alt" label="Alt text" placeholder="Optional alt" />
      <nui-button
        variant="filled"
        :label="uploading ? 'Uploading…' : 'Upload'"
        :disabled.prop="uploading || !pendingFile"
        @click="upload"
      />
    </div>

    <p v-if="loading" class="admin-muted">Loading…</p>
    <CollectionList
      v-else
      :columns="columns"
      :rows="rows"
      empty-label="No media yet."
    />
    <div v-if="rows.length" class="admin-actions" style="margin-top: 1rem">
      <nui-button
        v-for="row in rows"
        :key="String(row.id)"
        type="button"
        variant="outlined"
        :label="`Delete ${row.filename}`"
        @click="remove(String(row.id))"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CollectionList from '../../../../components/collection/CollectionList.vue'
import FieldText from '../../../../components/fields/FieldText.vue'
import { adminApiGet, adminApiSend } from '../../../../composables/use_admin_api'

useHead({ title: 'Media' })

type MediaRow = {
  id: string
  filename: string
  mime: string
  size: number
  storage_path: string
  alt: string
}

const rows = ref<Record<string, unknown>[]>([])
const loading = ref(true)
const uploading = ref(false)
const dragOver = ref(false)
const error = ref('')
const ok = ref('')
const alt = ref('')
const pendingFile = ref<File | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const columns = [
  { key: 'filename', label: 'File' },
  { key: 'mime', label: 'Mime', muted: true },
  { key: 'size', label: 'Size', muted: true },
  { key: 'alt', label: 'Alt', muted: true },
  { key: 'id', label: 'Id', muted: true },
]

function setPending(file: File | null) {
  pendingFile.value = file
}

function onFileInput(event: Event) {
  const input = event.target as HTMLInputElement
  setPending(input.files?.[0] ?? null)
}

function onDrop(event: DragEvent) {
  dragOver.value = false
  setPending(event.dataTransfer?.files?.[0] ?? null)
}

function readAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    const data = (await adminApiGet<MediaRow[]>('/api/admin/media')) ?? []
    rows.value = data.map((row) => ({
      ...row,
      size: `${row.size} B`,
    }))
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load media'
  } finally {
    loading.value = false
  }
}

async function upload() {
  if (!pendingFile.value) return
  uploading.value = true
  error.value = ''
  ok.value = ''
  try {
    const contentBase64 = await readAsBase64(pendingFile.value)
    await adminApiSend('/api/admin/media', 'POST', {
      filename: pendingFile.value.name,
      mime: pendingFile.value.type || 'application/octet-stream',
      size: pendingFile.value.size,
      alt: alt.value,
      contentBase64,
    })
    ok.value = 'Uploaded.'
    pendingFile.value = null
    alt.value = ''
    if (fileInput.value) fileInput.value.value = ''
    await load()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Upload failed'
  } finally {
    uploading.value = false
  }
}

async function remove(id: string) {
  if (!confirm('Delete this media item?')) return
  error.value = ''
  try {
    await adminApiSend(`/api/admin/media/${id}`, 'DELETE')
    await load()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Delete failed'
  }
}

onMounted(() => {
  void load()
})
</script>

<style scoped>
.admin-dropzone {
  padding: 1.25rem;
  margin-bottom: 1rem;
  border-style: dashed;
}

.admin-dropzone.is-dragover {
  border-color: var(--admin-text);
}

.admin-dropzone input[type='file'] {
  margin-bottom: 0.75rem;
}
</style>

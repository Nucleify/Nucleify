<template>
  <div>
    <AdminPageHeader
      title="Media"
      description="Upload library — reference assets by id in page props."
      :primary="primary"
      :more="more"
    />

    <p v-if="error" class="admin-form__error">{{ error }}</p>

    <div class="admin-list-toolbar">
      <div class="admin-filter-chips">
        <button
          v-for="chip in folders"
          :key="chip"
          type="button"
          class="admin-filter-chip"
          :class="{ 'is-active': activeFolder === chip }"
          @click="activeFolder = chip"
        >
          {{ chip }}
        </button>
      </div>
      <div class="admin-filter-chips" role="group" aria-label="View">
        <button
          type="button"
          class="admin-filter-chip admin-filter-chip--icon"
          :class="{ 'is-active': view === 'grid' }"
          aria-label="Grid view"
          :aria-pressed="view === 'grid'"
          @click="view = 'grid'"
        >
          <nui-icon icon="mdi:view-grid-outline" width="1.1em" height="1.1em" />
        </button>
        <button
          type="button"
          class="admin-filter-chip admin-filter-chip--icon"
          :class="{ 'is-active': view === 'list' }"
          aria-label="List view"
          :aria-pressed="view === 'list'"
          @click="view = 'list'"
        >
          <nui-icon icon="mdi:view-list-outline" width="1.1em" height="1.1em" />
        </button>
      </div>
    </div>

    <AdminSkeleton v-if="loading" height="12rem" />
    <template v-else-if="view === 'grid'">
      <div v-if="selected.length" class="admin-bulk-bar">
        <span class="admin-muted">{{ selected.length }} selected</span>
        <nui-button
          v-for="action in bulkActions"
          :key="action.id"
          type="button"
          size="small"
          :variant="action.variant || 'outlined'"
          :label="action.label"
          @click="action.onClick"
        />
        <nui-button
          type="button"
          size="small"
          variant="outlined"
          label="Clear"
          @click="selected = []"
        />
      </div>
      <div v-if="!visibleRows.length">
        <AdminEmpty title="No media yet." description="Upload your first asset." />
      </div>
      <div v-else class="admin-media-grid">
        <div
          v-for="row in visibleRows"
          :key="String(row.id)"
          class="admin-media-card"
          :class="{ 'is-selected': selected.includes(String(row.id)) }"
          @click="toggleSelect(String(row.id))"
        >
          <div class="admin-media-card__thumb">
            <img
              v-if="String(row.mime || '').startsWith('image/') && thumb(row)"
              :src="thumb(row)"
              :alt="String(row.alt || row.filename)"
            />
            <span v-else>{{ row.mime || 'file' }}</span>
          </div>
          <p class="admin-media-card__name">{{ row.filename }}</p>
          <p class="admin-media-card__meta">{{ row.size }}</p>
          <AdminRowActions :actions="rowActions(row)" />
        </div>
      </div>
    </template>
    <CollectionList
      v-else
      :columns="columns"
      :rows="visibleRows"
      :selectable="true"
      :selected="selected"
      :bulk-actions="bulkActions"
      :row-actions-for="rowActions"
      searchable
      storage-key="media"
      empty-label="No media yet."
      @update:selected="selected = $event"
    />

    <nui-dialog
      v-if="showUploadDialog"
      visible
      header="Upload media"
      width="36rem"
      dismissable-mask
      @hide="closeUploadDialog"
    >
      <div class="admin-form admin-media-upload">
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
          <span v-else>Drop a file here, or click to browse</span>
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
          placeholder="Optional alt"
          @update:model-value="alt = $event"
        />
        <FieldText
          :model-value="folder"
          label="Folder"
          placeholder="optional/folder"
          @update:model-value="folder = $event"
        />
      </div>
      <div slot="footer" class="admin-actions">
        <nui-button
          type="button"
          variant="outlined"
          label="Cancel"
          @click="closeUploadDialog"
        />
        <nui-button
          type="button"
          variant="filled"
          :label="uploading ? 'Uploading…' : 'Upload'"
          :disabled="uploading || !pendingFile"
          @click="upload"
        />
      </div>
    </nui-dialog>

    <Teleport to="body">
      <div v-if="detail" class="admin-drawer" role="dialog" aria-modal="true">
        <div class="admin-drawer__head">
          <h2 style="margin: 0; font-size: 1rem">{{ detail.filename }}</h2>
          <nui-button
            type="button"
            variant="outlined"
            label="Close"
            @click="detail = null"
          />
        </div>
        <div class="admin-drawer__body">
          <FieldText
            :model-value="String(detail.alt || '')"
            label="Alt"
            @update:model-value="patchDetail('alt', $event)"
          />
          <FieldText
            :model-value="String(detail.folder || '')"
            label="Folder"
            @update:model-value="patchDetail('folder', $event)"
          />
          <p class="admin-muted" style="font-size: 0.75rem">
            id: {{ detail.id }}
          </p>
          <div class="admin-actions">
            <nui-button
              type="button"
              variant="outlined"
              label="Copy URL"
              @click="copyUrl(detail)"
            />
            <nui-button
              type="button"
              variant="outlined"
              label="Copy ID"
              @click="copyId(String(detail.id))"
            />
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { AdminAction } from '@admin'
import { adminApiGet, adminApiSend } from '@admin'
import { useAdminToast } from '@admin'
import { useFilePreview } from '../../../../composables/use_file_preview'

useHead({ title: 'Media' })

type MediaRow = {
  id: string
  filename: string
  mime: string
  size: number
  storage_path: string
  alt: string
  folder?: string
  public_url?: string
  deleted_at?: string | null
}

const toast = useAdminToast()
const rows = ref<Record<string, unknown>[]>([])
const loading = ref(true)
const uploading = ref(false)
const dragOver = ref(false)
const error = ref('')
const alt = ref('')
const folder = ref('')
const showUploadDialog = ref(false)
const { pendingFile, previewUrl, setPending, clearPreview } = useFilePreview()
const fileInput = ref<HTMLInputElement | null>(null)
const view = ref<'grid' | 'list'>('grid')
const selected = ref<string[]>([])
const showTrash = ref(false)
const activeFolder = ref('All')
const detail = ref<Record<string, unknown> | null>(null)

const columns = [
  { key: 'filename', label: 'File' },
  { key: 'mime', label: 'Mime', muted: true },
  { key: 'size', label: 'Size', muted: true },
  { key: 'alt', label: 'Alt', muted: true },
  { key: 'folder', label: 'Folder', muted: true },
  { key: 'id', label: 'Id', muted: true },
]

const folders = computed(() => {
  const set = new Set<string>(['All'])
  for (const row of rows.value) {
    set.add(String(row.folder || 'uncategorized'))
  }
  return [...set]
})

const visibleRows = computed(() => {
  let list = rows.value
  if (!showTrash.value) {
    list = list.filter((r) => !r.deleted_at)
  } else {
    list = list.filter((r) => r.deleted_at)
  }
  if (activeFolder.value !== 'All') {
    const folderName =
      activeFolder.value === 'uncategorized' ? '' : activeFolder.value
    list = list.filter(
      (r) => String(r.folder || '') === folderName ||
        (activeFolder.value === 'uncategorized' && !r.folder)
    )
  }
  return list
})

const primary = computed((): AdminAction[] => [
  {
    id: 'upload',
    label: 'Upload media',
    onClick: () => {
      showUploadDialog.value = true
    },
  },
])

function closeUploadDialog() {
  showUploadDialog.value = false
  if (uploading.value) return
  setPending(null)
  clearPreview()
  alt.value = ''
  if (fileInput.value) fileInput.value.value = ''
}

const more = computed((): AdminAction[] => [
  {
    id: 'trash-view',
    label: showTrash.value ? 'Hide trash' : 'View trash',
    onClick: () => {
      showTrash.value = !showTrash.value
    },
  },
  {
    id: 'select-all',
    label: 'Select all',
    onClick: () => {
      selected.value = visibleRows.value.map((r) => String(r.id))
    },
  },
  {
    id: 'refresh',
    label: 'Refresh',
    onClick: () => load(),
  },
])

const bulkActions = computed((): AdminAction[] => [
  {
    id: 'trash',
    label: 'Bulk trash',
    danger: true,
    onClick: () => bulkTrash(),
  },
])

function thumb(row: Record<string, unknown>) {
  return (
    String(row.public_url || '') ||
    (row.storage_path
      ? `/storage/v1/object/public/cms-media/${row.storage_path}`
      : '')
  )
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
      folder: row.folder || '',
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
  try {
    const contentBase64 = await readAsBase64(pendingFile.value)
    await adminApiSend('/api/admin/media', 'POST', {
      filename: pendingFile.value.name,
      mime: pendingFile.value.type || 'application/octet-stream',
      size: pendingFile.value.size,
      alt: alt.value,
      folder: folder.value || undefined,
      contentBase64,
    })
    toast.success('Uploaded.')
    setPending(null)
    clearPreview()
    alt.value = ''
    if (fileInput.value) fileInput.value.value = ''
    showUploadDialog.value = false
    await load()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Upload failed'
    toast.error(error.value)
  } finally {
    uploading.value = false
  }
}

function toggleSelect(id: string) {
  if (selected.value.includes(id)) {
    selected.value = selected.value.filter((x) => x !== id)
  } else {
    selected.value = [...selected.value, id]
  }
}

async function bulkTrash() {
  for (const id of selected.value) {
    await adminApiSend(`/api/admin/media/${id}`, 'DELETE').catch(() => null)
  }
  selected.value = []
  toast.success('Trashed.')
  await load()
}

async function copyUrl(row: Record<string, unknown>) {
  const url = thumb(row)
  await navigator.clipboard.writeText(url)
  toast.success('URL copied.')
}

async function copyId(id: string) {
  await navigator.clipboard.writeText(id)
  toast.success('ID copied.')
}

async function patchDetail(key: string, value: string) {
  if (!detail.value) return
  detail.value = { ...detail.value, [key]: value }
  await adminApiSend(`/api/admin/media/${detail.value.id}`, 'PATCH', {
    [key]: value,
  })
  await load()
}

function rowActions(row: Record<string, unknown>): AdminAction[] {
  const id = String(row.id)
  return [
    {
      id: 'edit',
      label: 'Edit meta',
      onClick: () => {
        detail.value = { ...row }
      },
    },
    {
      id: 'url',
      label: 'Copy URL',
      onClick: () => copyUrl(row),
    },
    {
      id: 'id',
      label: 'Copy ID',
      onClick: () => copyId(id),
    },
    {
      id: 'trash',
      label: 'Trash',
      danger: true,
      onClick: async () => {
        await adminApiSend(`/api/admin/media/${id}`, 'DELETE')
        await load()
      },
    },
  ]
}

onMounted(() => {
  void load()
})
</script>

<style lang="scss">
.admin-media-upload {
  display: flex;
  flex-direction: column;
  gap: var(--admin-space-3);
}
.admin-dropzone {
  display: flex;
  flex-direction: column;
  gap: var(--admin-space-3);
  padding: 1.25rem;
  margin-bottom: 1rem;
  border-style: dashed;
}
.admin-dropzone.is-dragover {
  border-color: var(--admin-text);
}
.admin-dropzone input[type='file'] {
  margin: 0;
}
</style>

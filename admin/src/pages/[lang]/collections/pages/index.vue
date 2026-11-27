<template>
  <div>
    <AdminPageHeader
      title="Pages"
      description="JSON page documents with ordered sections."
      :primary="primary"
      :more="more"
    />

    <p v-if="error" class="admin-form__error">{{ error }}</p>
    <AdminSkeleton v-if="!hydrated" height="12rem" />
    <CollectionList
      v-else
      :columns="columns"
      :rows="rows"
      :link-for-row="linkForRow"
      :status-filters="statusFilters"
      :selectable="true"
      :bulk-actions="bulkActions"
      :row-actions-for="rowActionsFor"
      searchable
      storage-key="pages"
      empty-label="No pages yet."
      empty-description="Create your first page to start editing sections."
      @update:selected="selected = $event"
      @update:status="onStatus"
    >
      <template #empty>
        <nui-button
          size="small"
          variant="filled"
          label="Create page"
          @click="navigateTo(`/${lang}/collections/pages/new`)"
        />
      </template>
    </CollectionList>
  </div>
</template>

<script setup lang="ts">
import type { AdminAction } from '@admin'
import { adminApiGet, adminApiSend } from '@admin'
import { useAdminToast } from '@admin'

useHead({ title: 'Pages' })

type PageRow = {
  id: string
  slug: string
  locale: string
  title: string
  status: string
  updated_at?: string
}

const route = useRoute()
const config = useRuntimeConfig()
const toast = useAdminToast()
const lang = computed(() => String(route.params.lang || 'en'))

const rows = ref<Record<string, unknown>[]>([])
const hydrated = ref(false)
const error = ref('')
const selected = ref<string[]>([])
const statusFilter = ref('all')

const columns = [
  { key: 'title', label: 'Title', link: true, sortable: true },
  { key: 'slug', label: 'Slug', muted: true, sortable: true },
  { key: 'locale', label: 'Locale', muted: true },
  { key: 'status', label: 'Status', badge: true },
  { key: 'updated_at', label: 'Updated', muted: true, sortable: true },
]

const statusFilters = [
  { label: 'All', value: 'all' },
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
  { label: 'Scheduled', value: 'scheduled' },
  { label: 'Trash', value: 'trash' },
]

const primary = computed((): AdminAction[] => [
  {
    id: 'new',
    label: 'Create page',
    onClick: () => navigateTo(`/${lang.value}/collections/pages/new`),
  },
])

const more = computed((): AdminAction[] => [
  {
    id: 'refresh',
    label: 'Refresh',
    onClick: () => load(),
  },
  {
    id: 'import',
    label: 'Import JSON…',
    onClick: () => toast.info('Paste JSON into a new page document for now.'),
  },
])

function linkForRow(row: Record<string, unknown>): string {
  return `/${lang.value}/collections/pages/${row.id}`
}

async function onStatus(value: string) {
  const prev = statusFilter.value
  statusFilter.value = value
  selected.value = []
  // Trash lives in a separate query; other chips filter the loaded rows client-side.
  if (value === 'trash' || prev === 'trash') await load()
}

async function load() {
  error.value = ''
  try {
    const qs =
      statusFilter.value === 'trash' ? '?status=trash' : ''
    const data =
      (await adminApiGet<PageRow[]>(`/api/admin/collections/pages${qs}`)) ?? []
    rows.value = data.map((row) => ({
      ...row,
      updated_at: row.updated_at
        ? new Date(row.updated_at).toLocaleString()
        : '—',
    }))
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load pages'
  } finally {
    hydrated.value = true
  }
}

const bulkActions = computed((): AdminAction[] => [
  {
    id: 'publish',
    label: 'Publish',
    onClick: () => bulk('publish'),
  },
  {
    id: 'trash',
    label: 'Trash',
    danger: true,
    onClick: () => bulk('trash'),
  },
  {
    id: 'restore',
    label: 'Restore',
    onClick: () => bulk('restore'),
  },
])

async function bulk(action: string) {
  if (!selected.value.length) return
  await adminApiSend('/api/admin/collections/pages/bulk', 'POST', {
    ids: selected.value,
    action,
  })
  selected.value = []
  toast.success(`Bulk ${action} done.`)
  await load()
}

function rowActionsFor(row: Record<string, unknown>): AdminAction[] {
  const id = String(row.id)
  const slug = String(row.slug || '')
  const locale = String(row.locale || 'en')
  const webOrigin =
    String((config.public as { webOrigin?: string }).webOrigin || '').replace(
      /\/$/,
      ''
    ) || 'http://localhost:3000'
  return [
    {
      id: 'edit',
      label: 'Edit',
      onClick: () => navigateTo(`/${lang.value}/collections/pages/${id}`),
    },
    {
      id: 'preview',
      label: 'Preview',
      onClick: async () => {
        const result = await adminApiSend<{ path: string }>(
          `/api/admin/collections/pages/${id}/preview-token`,
          'POST'
        )
        if (result?.path) {
          window.open(
            `${webOrigin}${result.path}`,
            '_blank',
            'noopener,noreferrer'
          )
        }
      },
    },
    {
      id: 'copy-slug',
      label: 'Copy slug',
      onClick: async () => {
        await navigator.clipboard.writeText(slug)
        toast.success('Slug copied.')
      },
    },
    {
      id: 'live',
      label: 'Open live',
      onClick: () =>
        window.open(
          `${webOrigin}/${locale}/${slug}`,
          '_blank',
          'noopener,noreferrer'
        ),
    },
    {
      id: 'trash',
      label: row.status === 'trash' ? 'Restore' : 'Trash',
      danger: row.status !== 'trash',
      onClick: async () => {
        await adminApiSend('/api/admin/collections/pages/bulk', 'POST', {
          ids: [id],
          action: row.status === 'trash' ? 'restore' : 'trash',
        })
        await load()
      },
    },
  ]
}

onMounted(() => {
  void load()
})
</script>

<template>
  <div>
    <AdminPageHeader
      title="Posts"
      description="Blog posts with rich body blocks."
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
      storage-key="posts"
      empty-label="No posts yet."
      empty-description="Create your first post."
      @search="onSearch"
      @update:selected="selected = $event"
      @update:status="onStatus"
    />
  </div>
</template>

<script setup lang="ts">
import type { AdminAction } from '@admin'
import { adminApiGet, adminApiSend } from '@admin'
import { useAdminToast } from '@admin'

useHead({ title: 'Posts' })

const route = useRoute()
const config = useRuntimeConfig()
const toast = useAdminToast()
const lang = computed(() => String(route.params.lang || 'en'))

const rows = ref<Record<string, unknown>[]>([])
const hydrated = ref(false)
const error = ref('')
const query = ref('')
const selected = ref<string[]>([])
const statusFilter = ref('all')

const columns = [
  { key: 'title', label: 'Title', link: true, sortable: true },
  { key: 'slug', label: 'Slug', muted: true },
  { key: 'locale', label: 'Locale', muted: true },
  { key: 'status', label: 'Status', badge: true },
  { key: 'updated_at', label: 'Updated', muted: true },
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
    label: 'Create post',
    onClick: () => navigateTo(`/${lang.value}/collections/posts/new`),
  },
])

const more = computed((): AdminAction[] => [
  { id: 'refresh', label: 'Refresh', onClick: () => load() },
  {
    id: 'import',
    label: 'Import JSON…',
    onClick: () => toast.info('Create a draft and paste JSON in Advanced.'),
  },
])

function linkForRow(row: Record<string, unknown>): string {
  return `/${lang.value}/collections/posts/${row.id}`
}

async function onStatus(value: string) {
  const prev = statusFilter.value
  statusFilter.value = value
  selected.value = []
  if (value === 'trash' || prev === 'trash') await load()
}

async function load() {
  error.value = ''
  try {
    if (query.value.trim()) {
      const data =
        (await adminApiGet<Record<string, unknown>[]>(
          `/api/admin/search?q=${encodeURIComponent(query.value.trim())}`
        )) ?? []
      rows.value = data
        .filter((row) => row.collection_slug === 'posts')
        .map((row) => ({
          ...row,
          updated_at: row.updated_at
            ? new Date(String(row.updated_at)).toLocaleString()
            : '—',
        }))
    } else {
      const qs = statusFilter.value === 'trash' ? '?status=trash' : ''
      const data =
        (await adminApiGet<Record<string, unknown>[]>(
          `/api/admin/collections/posts${qs}`
        )) ?? []
      rows.value = data.map((row) => ({
        ...row,
        updated_at: row.updated_at
          ? new Date(String(row.updated_at)).toLocaleString()
          : '—',
      }))
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load posts'
  } finally {
    hydrated.value = true
  }
}

let searchTimer: ReturnType<typeof setTimeout> | null = null
function onSearch(value: string) {
  query.value = value
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => void load(), 300)
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
])

async function bulk(action: 'publish' | 'trash') {
  if (!selected.value.length) return
  await adminApiSend('/api/admin/collections/posts/bulk', 'POST', {
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
      onClick: () => navigateTo(`/${lang.value}/collections/posts/${id}`),
    },
    {
      id: 'copy',
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
          `${webOrigin}/${locale}/blog/${slug}`,
          '_blank',
          'noopener,noreferrer'
        ),
    },
    {
      id: 'trash',
      label: 'Trash',
      danger: true,
      onClick: async () => {
        await adminApiSend('/api/admin/collections/posts/bulk', 'POST', {
          ids: [id],
          action: 'trash',
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

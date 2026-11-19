<template>
  <div>
    <AdminPageHeader
      title="Contact inbox"
      description="Submissions from the public contact form."
      :primary="primary"
      :more="more"
    />
    <div class="admin-filter-chips" style="margin-bottom: 0.75rem">
      <button
        v-for="chip in statusFilters"
        :key="chip.value"
        type="button"
        class="admin-filter-chip"
        :class="{ 'is-active': status === chip.value }"
        @click="status = chip.value"
      >
        {{ chip.label }}
      </button>
    </div>
    <p v-if="error" class="admin-form__error">{{ error }}</p>
    <AdminSkeleton v-if="loading" height="10rem" />
    <CollectionList
      v-else
      :columns="columns"
      :rows="filtered"
      :row-actions-for="rowActions"
      searchable
      storage-key="contact"
      empty-label="No submissions yet."
    />
  </div>
</template>

<script setup lang="ts">
import type { AdminAction } from '@admin'
import { adminApiGet, adminApiSend } from '@admin'
import { useAdminToast } from '@admin'

useHead({ title: 'Contact inbox' })

const toast = useAdminToast()
const rows = ref<Record<string, unknown>[]>([])
const loading = ref(true)
const error = ref('')
const status = ref('all')

const statusFilters = [
  { label: 'All', value: 'all' },
  { label: 'New', value: 'new' },
  { label: 'Read', value: 'read' },
  { label: 'Archived', value: 'archived' },
]

const columns = [
  { key: 'email', label: 'Email' },
  { key: 'name', label: 'Name', muted: true },
  { key: 'type', label: 'Type', muted: true },
  { key: 'status', label: 'Status', badge: true },
  { key: 'message', label: 'Message', muted: true },
  { key: 'created_at', label: 'When', muted: true },
]

const filtered = computed(() => {
  if (status.value === 'all') return rows.value
  return rows.value.filter(
    (row) => String(row.status || '').toLowerCase() === status.value
  )
})

const primary = computed((): AdminAction[] => [
  {
    id: 'mark-all',
    label: 'Mark all read',
    disabled: !filtered.value.length,
    onClick: async () => {
      for (const row of filtered.value) {
        await adminApiSend(`/api/admin/contact/${row.id}`, 'PATCH', {
          status: 'read',
        })
      }
      toast.success('Marked read.')
      await load()
    },
  },
])

const more = computed((): AdminAction[] => [
  { id: 'refresh', label: 'Refresh', onClick: () => load() },
  {
    id: 'archive-all',
    label: 'Archive visible',
    onClick: async () => {
      for (const row of filtered.value) {
        await adminApiSend(`/api/admin/contact/${row.id}`, 'PATCH', {
          status: 'archived',
        })
      }
      await load()
    },
  },
])

async function load() {
  loading.value = true
  error.value = ''
  try {
    const data =
      (await adminApiGet<Record<string, unknown>[]>('/api/admin/contact')) ?? []
    rows.value = data.map((row) => ({
      ...row,
      created_at: row.created_at
        ? new Date(String(row.created_at)).toLocaleString()
        : '—',
      message: String(row.message || '').slice(0, 80),
    }))
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load inbox'
  } finally {
    loading.value = false
  }
}

function rowActions(row: Record<string, unknown>): AdminAction[] {
  const id = String(row.id)
  return [
    {
      id: 'read',
      label: 'Mark read',
      onClick: async () => {
        await adminApiSend(`/api/admin/contact/${id}`, 'PATCH', {
          status: 'read',
        })
        await load()
      },
    },
    {
      id: 'archive',
      label: 'Archive',
      onClick: async () => {
        await adminApiSend(`/api/admin/contact/${id}`, 'PATCH', {
          status: 'archived',
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

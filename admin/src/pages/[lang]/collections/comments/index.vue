<template>
  <div>
    <AdminPageHeader
      title="Comments"
      description="Moderate blog comments."
      :primary="primary"
      :more="more"
    />
    <div class="admin-filter-chips" role="group" aria-label="Filter comments">
      <button
        v-for="chip in statusFilters"
        :key="chip.value"
        type="button"
        class="admin-filter-chip"
        :class="{ 'is-active': status === chip.value }"
        @click="setStatus(chip.value)"
      >
        <nui-icon :icon="chip.icon" width="1.05em" height="1.05em" />
        <span>{{ chip.label }}</span>
      </button>
    </div>
    <p v-if="error" class="admin-form__error">{{ error }}</p>
    <AdminSkeleton v-if="loading" height="10rem" />
    <CollectionList
      v-else
      :columns="columns"
      :rows="rows"
      :row-actions-for="rowActions"
      searchable
      storage-key="comments"
      empty-label="No comments yet."
    />
  </div>
</template>

<script setup lang="ts">
import type { AdminAction } from '@admin'
import { adminApiGet, adminApiSend } from '@admin'
import { useAdminToast } from '@admin'

useHead({ title: 'Comments' })

const toast = useAdminToast()
const rows = ref<Record<string, unknown>[]>([])
const loading = ref(true)
const error = ref('')
const status = ref('pending')

const statusFilters = [
  { label: 'Pending', value: 'pending', icon: 'mdi:clock-outline' },
  { label: 'Approved', value: 'approved', icon: 'mdi:check-circle-outline' },
  { label: 'Spam', value: 'spam', icon: 'mdi:alert-octagon-outline' },
  { label: 'All', value: 'all', icon: 'mdi:forum-outline' },
]

const columns = [
  { key: 'author_name', label: 'Author' },
  { key: 'author_email', label: 'Email', muted: true },
  { key: 'body', label: 'Body', muted: true },
  { key: 'status', label: 'Status', badge: true },
  { key: 'created_at', label: 'When', muted: true },
]

const primary = computed((): AdminAction[] => [
  {
    id: 'approve-all',
    label: 'Approve visible',
    disabled: !rows.value.length,
    onClick: async () => {
      for (const row of rows.value) {
        await setStatusRow(String(row.id), 'approved')
      }
      toast.success('Approved visible comments.')
    },
  },
])

const more = computed((): AdminAction[] => [
  { id: 'refresh', label: 'Refresh', onClick: () => load() },
  {
    id: 'spam-all',
    label: 'Mark visible as spam',
    danger: true,
    onClick: async () => {
      for (const row of rows.value) {
        await setStatusRow(String(row.id), 'spam')
      }
    },
  },
])

function setStatus(value: string) {
  status.value = value
  void load()
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    const qs =
      status.value === 'all' ? '' : `?status=${encodeURIComponent(status.value)}`
    const data =
      (await adminApiGet<Record<string, unknown>[]>(
        `/api/admin/comments${qs}`
      )) ?? []
    rows.value = data.map((row) => ({
      ...row,
      body: String(row.body || '').slice(0, 100),
      created_at: row.created_at
        ? new Date(String(row.created_at)).toLocaleString()
        : '—',
    }))
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load comments'
  } finally {
    loading.value = false
  }
}

async function setStatusRow(id: string, next: string) {
  await adminApiSend(`/api/admin/comments/${id}`, 'PATCH', { status: next })
}

function rowActions(row: Record<string, unknown>): AdminAction[] {
  const id = String(row.id)
  return [
    {
      id: 'approve',
      label: 'Approve',
      onClick: async () => {
        await setStatusRow(id, 'approved')
        await load()
      },
    },
    {
      id: 'spam',
      label: 'Spam',
      danger: true,
      onClick: async () => {
        await setStatusRow(id, 'spam')
        await load()
      },
    },
    {
      id: 'archive',
      label: 'Archive',
      onClick: async () => {
        await setStatusRow(id, 'archived')
        await load()
      },
    },
  ]
}

onMounted(() => {
  void load()
})
</script>

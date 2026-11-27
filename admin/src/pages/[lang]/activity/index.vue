<template>
  <div>
    <AdminPageHeader
      title="Activity"
      description="Recent CMS actions — publishes, saves, and trash."
      :more="more"
    />
    <div class="admin-filter-chips" role="group" aria-label="Filter activity">
      <button
        v-for="chip in activityFilters"
        :key="chip.value"
        type="button"
        class="admin-filter-chip"
        :class="{ 'is-active': activityFilter === chip.value }"
        @click="setFilter(chip.value)"
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
      searchable
      storage-key="activity"
      empty-label="No activity yet."
    />
  </div>
</template>

<script setup lang="ts">
import type { AdminAction } from '@admin'
import { adminApiGet } from '@admin'

useHead({ title: 'Activity' })

type ActivityRow = {
  id: string
  action: string
  entity_type: string
  entity_id: string | null
  created_at: string
}

const rows = ref<Record<string, unknown>[]>([])
const loading = ref(true)
const error = ref('')
const activityFilter = ref('all')
const activityFilters = [
  { label: 'all', value: 'all', icon: 'mdi:history' },
  { label: 'publish', value: 'publish', icon: 'mdi:publish' },
  { label: 'save', value: 'save', icon: 'mdi:content-save-outline' },
  { label: 'trash', value: 'trash', icon: 'mdi:trash-can-outline' },
]

const columns = [
  { key: 'action', label: 'Action' },
  { key: 'entity_type', label: 'Entity', muted: true },
  { key: 'entity_id', label: 'ID', muted: true },
  { key: 'created_at', label: 'When', muted: true },
]

const more = computed((): AdminAction[] => [
  { id: 'refresh', label: 'Refresh', onClick: () => load() },
])

function formatTime(value?: string) {
  if (!value) return '—'
  try {
    return new Date(value).toLocaleString()
  } catch {
    return value
  }
}

function setFilter(chip: string) {
  activityFilter.value = chip
  void load()
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    const filter = activityFilter.value
    const qs =
      filter && filter !== 'all'
        ? `?filter=${encodeURIComponent(filter)}`
        : ''
    const data =
      (await adminApiGet<ActivityRow[]>(`/api/admin/activity${qs}`)) ?? []
    rows.value = data.map((row) => ({
      ...row,
      entity_id: row.entity_id || '—',
      created_at: formatTime(row.created_at),
    }))
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load activity'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  void load()
})
</script>

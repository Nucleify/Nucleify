<template>
  <div>
    <AdminPageHeader
      title="Dashboard"
      description="Recent drafts, scheduled publishes, and inbox."
      :primary="primary"
      :secondary="secondary"
      :more="more"
    />

    <p v-if="error" class="admin-form__error">{{ error }}</p>
    <AdminSkeleton v-if="loading" height="16rem" />

    <div v-else class="admin-dashboard-grid">
      <AdminPanel title="Drafts" class="admin-dashboard-card">
        <AdminEmpty v-if="!data.drafts.length" title="No drafts." />
        <ul v-else>
          <li v-for="row in data.drafts" :key="row.id">
            <NuxtLink
              :to="`/${lang}/collections/${row.collection_slug}/${row.id}`"
            >
              {{ row.title || row.slug }}
            </NuxtLink>
            <span class="admin-muted"> · {{ row.collection_slug }}</span>
          </li>
        </ul>
      </AdminPanel>

      <AdminPanel title="Scheduled" class="admin-dashboard-card">
        <AdminEmpty v-if="!data.scheduled.length" title="Nothing scheduled." />
        <ul v-else>
          <li v-for="row in data.scheduled" :key="row.id">
            <NuxtLink
              :to="`/${lang}/collections/${row.collection_slug}/${row.id}`"
            >
              {{ row.title || row.slug }}
            </NuxtLink>
            <span class="admin-muted"> · {{ formatTime(row.published_at) }}</span>
          </li>
        </ul>
      </AdminPanel>

      <AdminPanel title="Contact inbox" class="admin-dashboard-card">
        <AdminEmpty v-if="!data.contactNew.length" title="Inbox clear." />
        <ul v-else>
          <li v-for="row in data.contactNew" :key="row.id">
            <NuxtLink :to="`/${lang}/collections/contact`">
              {{ row.email || row.name || 'Submission' }}
            </NuxtLink>
            <span class="admin-muted"> · {{ row.type }}</span>
          </li>
        </ul>
      </AdminPanel>

      <AdminPanel title="Activity" class="admin-dashboard-card">
        <div class="admin-filter-chips" style="margin-bottom: 0.75rem">
          <button
            v-for="chip in activityFilters"
            :key="chip"
            type="button"
            class="admin-filter-chip"
            :class="{ 'is-active': activityFilter === chip }"
            @click="activityFilter = chip"
          >
            {{ chip }}
          </button>
        </div>
        <AdminEmpty v-if="!filteredActivity.length" title="No activity yet." />
        <ul v-else>
          <li
            v-for="row in filteredActivity"
            :key="row.id"
            class="admin-muted"
            style="font-size: 0.85rem"
          >
            {{ row.action }} · {{ formatTime(row.created_at) }}
          </li>
        </ul>
      </AdminPanel>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AdminAction } from '@admin'
import { adminApiGet, adminApiSend } from '@admin'
import { useAdminToast } from '@admin'

useHead({ title: 'Dashboard' })

const route = useRoute()
const toast = useAdminToast()
const lang = computed(() => String(route.params.lang || 'en'))

type Dash = {
  drafts: {
    id: string
    title: string
    slug: string
    collection_slug: string
  }[]
  scheduled: {
    id: string
    title: string
    slug: string
    collection_slug: string
    published_at?: string
  }[]
  activity: { id: string; action: string; created_at: string }[]
  contactNew: { id: string; name: string; email: string; type: string }[]
}

const data = ref<Dash>({
  drafts: [],
  scheduled: [],
  activity: [],
  contactNew: [],
})
const loading = ref(true)
const error = ref('')
const activityFilter = ref('all')
const activityFilters = ['all', 'publish', 'save', 'trash']

const filteredActivity = computed(() => {
  if (activityFilter.value === 'all') return data.value.activity
  return data.value.activity.filter((row) =>
    String(row.action || '')
      .toLowerCase()
      .includes(activityFilter.value)
  )
})

const primary = computed((): AdminAction[] => [
  {
    id: 'page',
    label: 'New page',
    onClick: () => navigateTo(`/${lang.value}/collections/pages/new`),
  },
])

const secondary = computed((): AdminAction[] => [
  {
    id: 'post',
    label: 'New post',
    variant: 'outlined',
    onClick: () => navigateTo(`/${lang.value}/collections/posts/new`),
  },
  {
    id: 'promote',
    label: 'Promote scheduled',
    variant: 'outlined',
    onClick: () => promoteScheduled(),
  },
  {
    id: 'refresh',
    label: 'Refresh',
    variant: 'outlined',
    onClick: () => load(),
  },
])

const more = computed((): AdminAction[] => [
  {
    id: 'trash',
    label: 'Open pages trash',
    onClick: () => navigateTo(`/${lang.value}/collections/pages`),
  },
  {
    id: 'comments',
    label: 'Pending comments',
    onClick: () => navigateTo(`/${lang.value}/collections/comments`),
  },
  {
    id: 'contact',
    label: 'Contact inbox',
    onClick: () => navigateTo(`/${lang.value}/collections/contact`),
  },
])

function formatTime(value?: string) {
  if (!value) return '—'
  try {
    return new Date(value).toLocaleString()
  } catch {
    return value
  }
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    data.value =
      (await adminApiGet<Dash>('/api/admin/dashboard')) ?? data.value
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load dashboard'
  } finally {
    loading.value = false
  }
}

async function promoteScheduled() {
  try {
    const result = await adminApiSend<{ promoted: number }>(
      '/api/admin/cms/promote-scheduled',
      'POST'
    )
    toast.success(`Promoted ${result?.promoted ?? 0} scheduled document(s).`)
    await load()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Promote failed'
    toast.error(error.value)
  }
}

onMounted(() => {
  void load()
})
</script>

<style lang="scss">
.admin-dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1rem;
}
.admin-dashboard-card {
  padding: 1rem 1.25rem;
}
.admin-dashboard-card h2 {
  margin: 0 0 0.75rem;
  font-size: 1rem;
}
.admin-dashboard-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.admin-dashboard-card li {
  margin: 0.35rem 0;
}
</style>

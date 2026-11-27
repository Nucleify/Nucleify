<template>
  <div>
    <AdminPageHeader
      title="Dashboard"
      description="Content health, recent activity, and publishing queue."
      :primary="primary"
      :secondary="secondary"
      :more="more"
    />

    <p v-if="error" class="admin-form__error">{{ error }}</p>
    <AdminSkeleton v-if="loading" height="20rem" />

    <template v-else>
      <div class="admin-dashboard-stats">
        <NuxtLink
          v-for="stat in statCards"
          :key="stat.id"
          :to="stat.to"
          class="admin-dashboard-stat"
        >
          <span class="admin-dashboard-stat__label">{{ stat.label }}</span>
          <span class="admin-dashboard-stat__value">{{ stat.value }}</span>
          <span v-if="stat.hint" class="admin-dashboard-stat__hint admin-muted">
            {{ stat.hint }}
          </span>
        </NuxtLink>
      </div>

      <div class="admin-dashboard-charts">
        <AdminPanel title="Activity · 14 days" class="admin-dashboard-card">
          <AdminChart
            type="line"
            :data="activityChartData"
            :options="lineChartOptions"
            :height="240"
          />
        </AdminPanel>
        <AdminPanel title="Documents by status" class="admin-dashboard-card">
          <AdminChart
            type="doughnut"
            :data="statusChartData"
            :options="doughnutChartOptions"
            :height="240"
          />
        </AdminPanel>
      </div>

      <div class="admin-dashboard-grid">
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
          <AdminEmpty
            v-if="!data.scheduled.length"
            title="Nothing scheduled."
          />
          <ul v-else>
            <li v-for="row in data.scheduled" :key="row.id">
              <NuxtLink
                :to="`/${lang}/collections/${row.collection_slug}/${row.id}`"
              >
                {{ row.title || row.slug }}
              </NuxtLink>
              <span class="admin-muted">
                · {{ formatTime(row.published_at) }}
              </span>
            </li>
          </ul>
        </AdminPanel>
      </div>
    </template>
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
  stats: {
    drafts: number
    published: number
    scheduled: number
    trash: number
    contactNew: number
    commentsPending: number
    media: number
    activity7d: number
  }
  charts: {
    activityByDay: { day: string; count: number }[]
    statusBreakdown: { label: string; count: number }[]
  }
}

const emptyStats: Dash['stats'] = {
  drafts: 0,
  published: 0,
  scheduled: 0,
  trash: 0,
  contactNew: 0,
  commentsPending: 0,
  media: 0,
  activity7d: 0,
}

const data = ref<Dash>({
  drafts: [],
  scheduled: [],
  stats: { ...emptyStats },
  charts: { activityByDay: [], statusBreakdown: [] },
})
const loading = ref(true)
const error = ref('')

const GRID = 'rgba(255, 255, 255, 0.06)'
const TICK = '#8a8a8a'
const ACCENT = '#f0f0f0'
const ACCENT_FILL = 'rgba(240, 240, 240, 0.14)'
const STATUS_COLORS = [
  'rgba(134, 239, 172, 0.75)',
  'rgba(147, 197, 253, 0.75)',
  'rgba(253, 230, 138, 0.75)',
  'rgba(252, 165, 165, 0.75)',
]
const STATUS_BORDERS = ['#86efac', '#93c5fd', '#fde68a', '#fca5a5']

const statCards = computed(() => {
  const s = data.value.stats
  const base = `/${lang.value}`
  return [
    {
      id: 'published',
      label: 'Published',
      value: s.published,
      hint: 'Live documents',
      to: `${base}/collections/pages`,
    },
    {
      id: 'drafts',
      label: 'Drafts',
      value: s.drafts,
      hint: 'In progress',
      to: `${base}/collections/pages`,
    },
    {
      id: 'scheduled',
      label: 'Scheduled',
      value: s.scheduled,
      hint: 'Queued to publish',
      to: `${base}/collections/pages`,
    },
    {
      id: 'inbox',
      label: 'Inbox',
      value: s.contactNew,
      hint: 'New contact',
      to: `${base}/collections/contact`,
    },
    {
      id: 'comments',
      label: 'Comments',
      value: s.commentsPending,
      hint: 'Awaiting review',
      to: `${base}/collections/comments`,
    },
    {
      id: 'media',
      label: 'Media',
      value: s.media,
      hint: 'Library assets',
      to: `${base}/collections/media`,
    },
    {
      id: 'activity',
      label: 'Activity',
      value: s.activity7d,
      hint: 'Last 7 days',
      to: `${base}/activity`,
    },
    {
      id: 'trash',
      label: 'Trash',
      value: s.trash,
      hint: 'Soft-deleted',
      to: `${base}/collections/pages`,
    },
  ]
})

const activityChartData = computed(() => {
  const rows = data.value.charts.activityByDay
  return {
    labels: rows.map((r) => {
      const d = new Date(`${r.day}T00:00:00Z`)
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      })
    }),
    datasets: [
      {
        label: 'Actions',
        data: rows.map((r) => r.count),
        borderColor: ACCENT,
        backgroundColor: ACCENT_FILL,
        fill: true,
        tension: 0.35,
        borderWidth: 2,
        pointBackgroundColor: ACCENT,
        pointBorderColor: '#0a0a0a',
        pointRadius: 3,
      },
    ],
  }
})

const statusChartData = computed(() => {
  const rows = data.value.charts.statusBreakdown
  return {
    labels: rows.map((r) => r.label),
    datasets: [
      {
        label: 'Documents',
        data: rows.map((r) => r.count),
        backgroundColor: STATUS_COLORS,
        borderColor: STATUS_BORDERS,
        borderWidth: 1,
      },
    ],
  }
})

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      grid: { color: GRID },
      ticks: { color: TICK, maxRotation: 0 },
    },
    y: {
      beginAtZero: true,
      ticks: { color: TICK, precision: 0 },
      grid: { color: GRID },
    },
  },
}

const doughnutChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: { color: '#e4e4e7', boxWidth: 12, padding: 16 },
    },
  },
}

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
  {
    id: 'activity',
    label: 'Activity',
    onClick: () => navigateTo(`/${lang.value}/activity`),
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
    const next = await adminApiGet<Dash>('/api/admin/dashboard')
    if (next) {
      data.value = {
        drafts: next.drafts ?? [],
        scheduled: next.scheduled ?? [],
        stats: { ...emptyStats, ...(next.stats ?? {}) },
        charts: {
          activityByDay: next.charts?.activityByDay ?? [],
          statusBreakdown: next.charts?.statusBreakdown ?? [],
        },
      }
    }
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
.admin-dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(9.5rem, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
}
.admin-dashboard-stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.9rem 1rem;
  background: var(--admin-surface);
  border: 1px solid var(--admin-border);
  color: inherit;
  transition:
    background 0.12s ease,
    border-color 0.12s ease;
}
.admin-dashboard-stat:hover {
  background: var(--admin-surface-2);
  border-color: color-mix(in srgb, var(--admin-text) 25%, var(--admin-border));
}
.admin-dashboard-stat__label {
  font-family: var(--admin-mono);
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--admin-muted);
}
.admin-dashboard-stat__value {
  font-size: 1.65rem;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
}
.admin-dashboard-stat__hint {
  font-size: 0.75rem;
}
.admin-dashboard-charts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}
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

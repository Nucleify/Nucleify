<template>
  <div>
    <div class="admin-page-header">
      <div>
        <h1>Dashboard</h1>
        <p>Recent drafts, scheduled publishes, and inbox.</p>
      </div>
      <nui-button
        variant="outlined"
        label="Promote scheduled"
        @click="promoteScheduled"
      />
    </div>

    <p v-if="error" class="admin-form__error">{{ error }}</p>
    <p v-if="ok" style="color: #86efac">{{ ok }}</p>
    <p v-if="loading" class="admin-muted">Loading…</p>

    <div v-else class="admin-dashboard-grid" style="display: grid; gap: 1rem">
      <section class="admin-panel" style="padding: 1rem 1.25rem">
        <h2 style="margin: 0 0 0.75rem; font-size: 1rem">Drafts</h2>
        <p v-if="!data.drafts.length" class="admin-muted">No drafts.</p>
        <ul v-else style="list-style: none; padding: 0; margin: 0">
          <li v-for="row in data.drafts" :key="row.id" style="margin: 0.35rem 0">
            <NuxtLink
              :to="`/${lang}/collections/${row.collection_slug}/${row.id}`"
            >
              {{ row.title || row.slug }}
            </NuxtLink>
            <span class="admin-muted"> · {{ row.collection_slug }}</span>
          </li>
        </ul>
      </section>

      <section class="admin-panel" style="padding: 1rem 1.25rem">
        <h2 style="margin: 0 0 0.75rem; font-size: 1rem">Scheduled</h2>
        <p v-if="!data.scheduled.length" class="admin-muted">Nothing scheduled.</p>
        <ul v-else style="list-style: none; padding: 0; margin: 0">
          <li
            v-for="row in data.scheduled"
            :key="row.id"
            style="margin: 0.35rem 0"
          >
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
      </section>

      <section class="admin-panel" style="padding: 1rem 1.25rem">
        <h2 style="margin: 0 0 0.75rem; font-size: 1rem">Contact inbox</h2>
        <p v-if="!data.contactNew.length" class="admin-muted">Inbox clear.</p>
        <ul v-else style="list-style: none; padding: 0; margin: 0">
          <li
            v-for="row in data.contactNew"
            :key="row.id"
            style="margin: 0.35rem 0"
          >
            <NuxtLink :to="`/${lang}/collections/contact`">
              {{ row.email || row.name || 'Submission' }}
            </NuxtLink>
            <span class="admin-muted"> · {{ row.type }}</span>
          </li>
        </ul>
      </section>

      <section class="admin-panel" style="padding: 1rem 1.25rem">
        <h2 style="margin: 0 0 0.75rem; font-size: 1rem">Activity</h2>
        <p v-if="!data.activity.length" class="admin-muted">No activity yet.</p>
        <ul v-else style="list-style: none; padding: 0; margin: 0">
          <li
            v-for="row in data.activity"
            :key="row.id"
            class="admin-muted"
            style="margin: 0.35rem 0; font-size: 0.85rem"
          >
            {{ row.action }} · {{ formatTime(row.created_at) }}
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { adminApiGet, adminApiSend } from '@admin'

useHead({ title: 'Dashboard' })

const route = useRoute()
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
const ok = ref('')

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
  ok.value = ''
  try {
    const result = await adminApiSend<{ promoted: number }>(
      '/api/admin/cms/promote-scheduled',
      'POST'
    )
    ok.value = `Promoted ${result?.promoted ?? 0} scheduled document(s).`
    await load()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Promote failed'
  }
}

onMounted(() => {
  void load()
})
</script>

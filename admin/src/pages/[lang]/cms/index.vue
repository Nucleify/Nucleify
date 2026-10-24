<template>
  <div>
    <div class="admin-page-header">
      <div>
        <h1>CMS</h1>
        <p>Markdown content entries (draft / published).</p>
      </div>
      <nui-button variant="filled" label="New entry" @click="showCreate = !showCreate" />
    </div>

    <p v-if="error" class="admin-form__error">{{ error }}</p>

    <div v-if="showCreate" class="admin-panel" style="padding: 1.25rem; margin-bottom: 1rem">
      <form class="admin-form" @submit.prevent="onCreate">
        <div class="admin-form__field">
          <label class="admin-form__label">Slug</label>
          <nui-input-text ref="slugInput" type="text" fluid placeholder="home-hero" />
        </div>
        <div class="admin-form__field">
          <label class="admin-form__label">Locale</label>
          <nui-input-text ref="localeInput" type="text" fluid placeholder="en" />
        </div>
        <div class="admin-form__field">
          <label class="admin-form__label">Title</label>
          <nui-input-text ref="titleInput" type="text" fluid placeholder="Title" />
        </div>
        <nui-button type="submit" variant="filled" :label="creating ? 'Creating…' : 'Create'" />
      </form>
    </div>

    <p v-if="loading" class="admin-muted">Loading…</p>
    <div v-else class="admin-panel">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Slug</th>
            <th>Locale</th>
            <th>Title</th>
            <th>Status</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in entries" :key="`${entry.slug}:${entry.locale}`">
            <td>
              <NuxtLink :to="`/${lang}/cms/${entry.slug}?locale=${entry.locale}`">
                {{ entry.slug }}
              </NuxtLink>
            </td>
            <td class="admin-muted">{{ entry.locale }}</td>
            <td>{{ entry.title || '—' }}</td>
            <td>
              <span
                class="admin-badge"
                :class="entry.status === 'published' ? 'admin-badge--ok' : 'admin-badge--warn'"
              >
                {{ entry.status }}
              </span>
            </td>
            <td class="admin-muted">{{ formatDate(entry.updated_at) }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="!entries.length" class="admin-empty">No entries yet.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { adminApiGet, adminApiSend } from '../../../composables/use_admin_api'
import { nuiHostValue } from '../../../utils/nui_host'

useHead({ title: 'CMS' })

type EntryRow = {
  id: string
  slug: string
  locale: string
  title: string
  status: string
  updated_at: string
}

const route = useRoute()
const lang = computed(() => String(route.params.lang || 'en'))

const entries = ref<EntryRow[]>([])
const loading = ref(true)
const creating = ref(false)
const showCreate = ref(false)
const error = ref('')

const slugInput = ref<{ value?: unknown } | null>(null)
const localeInput = ref<{ value?: unknown } | null>(null)
const titleInput = ref<{ value?: unknown } | null>(null)

function formatDate(value: string): string {
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
    entries.value = (await adminApiGet<EntryRow[]>('/api/admin/cms')) ?? []
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load CMS'
  } finally {
    loading.value = false
  }
}

async function onCreate() {
  creating.value = true
  error.value = ''
  try {
    const slug = nuiHostValue(slugInput.value)
    const locale = nuiHostValue(localeInput.value) || 'en'
    const created = await adminApiSend<EntryRow>('/api/admin/cms', 'POST', {
      slug,
      locale,
      title: nuiHostValue(titleInput.value),
      body: '',
      status: 'draft',
    })
    showCreate.value = false
    await navigateTo(`/${lang.value}/cms/${created.slug}?locale=${created.locale}`)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Create failed'
  } finally {
    creating.value = false
  }
}

onMounted(() => {
  void load()
})
</script>

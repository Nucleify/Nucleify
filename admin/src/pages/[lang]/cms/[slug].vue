<template>
  <div>
    <DocumentHeader
      :title="entry?.title || slug"
      :meta="`${slug} · ${locale}`"
      :draft-disabled="saving || loading || !entry"
      :publish-disabled="saving || loading || !entry"
      :draft-label="saving && status === 'draft' ? 'Saving…' : 'Save draft'"
      :publish-label="saving && status === 'published' ? 'Publishing…' : 'Publish'"
      @save-draft="onSave('draft')"
      @publish="onSave('published')"
    >
      <nui-button
        type="button"
        variant="outlined"
        label="Delete"
        :disabled="deleting || loading || !entry"
        @click="onDelete"
      />
      <NuxtLink :to="`/${lang}/cms`" class="admin-muted">← CMS</NuxtLink>
    </DocumentHeader>

    <p v-if="error" class="admin-form__error">{{ error }}</p>
    <p v-if="ok" style="color: #86efac">{{ ok }}</p>
    <p v-if="loading" class="admin-muted">Loading…</p>

    <form v-else-if="entry" class="admin-form" style="max-width: 48rem" @submit.prevent="onSave(status)">
      <div class="admin-form__field">
        <label class="admin-form__label">Title</label>
        <nui-input-text ref="titleInput" type="text" fluid />
      </div>
      <div class="admin-form__field">
        <label class="admin-form__label">Status</label>
        <select v-model="status" class="admin-status-select">
          <option value="draft">draft</option>
          <option value="published">published</option>
        </select>
      </div>
      <div class="admin-form__field">
        <label class="admin-form__label">Body (markdown)</label>
        <nui-textarea ref="bodyInput" fluid rows="16" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import DocumentHeader from '../../../components/document/DocumentHeader.vue'
import { adminApiGet, adminApiSend } from '../../../composables/use_admin_api'
import { nuiHostValue } from '../../../utils/nui_host'

useHead({ title: 'CMS entry' })

type Entry = {
  id: string
  slug: string
  locale: string
  title: string
  body: string
  status: string
}

const route = useRoute()
const lang = computed(() => String(route.params.lang || 'en'))
const slug = computed(() => String(route.params.slug || ''))
const locale = computed(() => String(route.query.locale || 'en'))

const entry = ref<Entry | null>(null)
const status = ref('draft')
const loading = ref(true)
const saving = ref(false)
const deleting = ref(false)
const error = ref('')
const ok = ref('')

const titleInput = ref<{ value?: unknown } | null>(null)
const bodyInput = ref<{ value?: unknown } | null>(null)

function applyHostValue(host: { value?: unknown } | null | undefined, value: string) {
  if (host && typeof host === 'object') {
    ;(host as { value: string }).value = value
  }
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    entry.value = await adminApiGet<Entry>(
      `/api/admin/cms/${encodeURIComponent(slug.value)}?locale=${encodeURIComponent(locale.value)}`
    )
    status.value = entry.value.status || 'draft'
    await nextTick()
    applyHostValue(titleInput.value, entry.value.title || '')
    applyHostValue(bodyInput.value, entry.value.body || '')
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load entry'
  } finally {
    loading.value = false
  }
}

async function onSave(nextStatus: string) {
  saving.value = true
  error.value = ''
  ok.value = ''
  status.value = nextStatus
  try {
    entry.value = await adminApiSend<Entry>(
      `/api/admin/cms/${encodeURIComponent(slug.value)}?locale=${encodeURIComponent(locale.value)}`,
      'PATCH',
      {
        title: nuiHostValue(titleInput.value),
        body: nuiHostValue(bodyInput.value),
        status: nextStatus,
      }
    )
    ok.value = nextStatus === 'published' ? 'Published.' : 'Draft saved.'
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Save failed'
  } finally {
    saving.value = false
  }
}

async function onDelete() {
  if (!confirm(`Delete ${slug.value} (${locale.value})?`)) return
  deleting.value = true
  error.value = ''
  try {
    await adminApiSend(
      `/api/admin/cms/${encodeURIComponent(slug.value)}?locale=${encodeURIComponent(locale.value)}`,
      'DELETE'
    )
    await navigateTo(`/${lang.value}/cms`)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Delete failed'
  } finally {
    deleting.value = false
  }
}

onMounted(() => {
  void load()
})
</script>

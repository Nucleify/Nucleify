<template>
  <div>
    <DocumentHeader
      :title="headerTitle"
      :meta="headerMeta"
      :preview-disabled="saving || loading || !canPreview"
      :draft-disabled="saving || loading"
      :publish-disabled="saving || loading"
      :unpublish-disabled="saving || loading"
      :show-unpublish="model.status === 'published'"
      :draft-label="saving ? 'Saving…' : dirty ? 'Save draft*' : 'Save draft'"
      :publish-label="saving ? 'Publishing…' : 'Publish'"
      @preview="onPreview"
      @save-draft="onDraft"
      @publish="onPublish"
      @unpublish="onUnpublish"
    >
      <nui-button
        v-if="documentId"
        type="button"
        variant="outlined"
        label="Trash"
        :disabled.prop="saving"
        @click="onDelete"
      />
      <NuxtLink :to="`/${lang}/collections/pages`" class="admin-muted">
        ← Pages
      </NuxtLink>
    </DocumentHeader>

    <p v-if="conflict" class="admin-form__error">
      Someone else edited this page. Reload before saving again.
    </p>
    <p v-if="error" class="admin-form__error">{{ error }}</p>
    <p v-if="ok" style="color: #86efac">{{ ok }}</p>
    <p v-if="loading" class="admin-muted">Loading…</p>

    <DocumentForm
      v-else-if="fields.length"
      :model-value="model"
      :fields="fields"
      @update:model-value="onModel"
    />

    <div v-if="documentId && !loading" class="admin-panel" style="margin-top: 1.5rem">
      <h2 style="margin: 0 0 0.75rem; font-size: 1rem">Revisions</h2>
      <div class="admin-actions" style="margin-bottom: 0.75rem">
        <nui-button
          type="button"
          variant="outlined"
          label="Save revision"
          :disabled.prop="saving"
          @click="saveRevision"
        />
      </div>
      <p v-if="!revisions.length" class="admin-muted">No revisions yet.</p>
      <ul v-else style="list-style: none; padding: 0; margin: 0">
        <li
          v-for="rev in revisions"
          :key="rev.id"
          style="
            display: flex;
            justify-content: space-between;
            gap: 1rem;
            padding: 0.5rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          "
        >
          <span class="admin-muted" style="font-size: 0.85rem">
            {{ rev.note || 'Revision' }} · {{ formatTime(rev.created_at) }}
          </span>
          <nui-button
            type="button"
            variant="outlined"
            label="Restore"
            @click="restoreRevision(rev.id)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DocumentForm } from '@admin'
import { DocumentHeader } from '@admin'
import { useDocumentForm } from '@admin'
import { adminApiGet, adminApiSend } from '@admin'

useHead({ title: 'Page' })

const route = useRoute()
const config = useRuntimeConfig()
const lang = computed(() => String(route.params.lang || 'en'))
const idParam = computed(() => String(route.params.id || ''))
const isNew = computed(() => idParam.value === 'new')

const {
  config: collectionConfig,
  model,
  documentId,
  loading,
  saving,
  dirty,
  conflict,
  error,
  ok,
  load,
  resetCreate,
  save,
  publish,
  unpublish,
  preview,
  remove,
  markDirty,
} = useDocumentForm('pages')

const fields = computed(() => collectionConfig.value?.fields ?? [])
const canPreview = computed(() => Boolean(documentId.value || model.value.slug))
const revisions = ref<
  { id: string; note: string; created_at: string }[]
>([])

const headerTitle = computed(
  () => String(model.value.title || (isNew.value ? 'New page' : 'Page'))
)
const headerMeta = computed(() => {
  const slug = String(model.value.slug || '—')
  const locale = String(model.value.locale || 'en')
  const status = String(model.value.status || 'draft')
  return `${slug} · ${locale} · ${status}`
})

function onModel(next: typeof model.value) {
  model.value = next
  markDirty()
}

async function refreshRevisions() {
  if (!documentId.value) {
    revisions.value = []
    return
  }
  try {
    revisions.value =
      (await adminApiGet(`/api/admin/collections/pages/${documentId.value}/revisions`)) ??
      []
  } catch {
    revisions.value = []
  }
}

async function onDraft() {
  const doc = await save('draft')
  if (doc && isNew.value) {
    await navigateTo(`/${lang.value}/collections/pages/${doc.id}`, {
      replace: true,
    })
  }
  await refreshRevisions()
}

async function onPublish() {
  const doc = documentId.value ? await publish() : await save('published')
  if (doc && isNew.value) {
    await navigateTo(`/${lang.value}/collections/pages/${doc.id}`, {
      replace: true,
    })
  }
  await refreshRevisions()
}

async function onUnpublish() {
  await unpublish()
}

async function onPreview() {
  const result = await preview()
  if (!result?.path) return
  const webOrigin =
    String((config.public as { webOrigin?: string }).webOrigin || '').replace(
      /\/$/,
      ''
    ) || 'http://localhost:3000'
  window.open(`${webOrigin}${result.path}`, '_blank', 'noopener,noreferrer')
}

async function onDelete() {
  if (!confirm('Move this page to trash?')) return
  const deleted = await remove(false)
  if (deleted) await navigateTo(`/${lang.value}/collections/pages`)
}

async function saveRevision() {
  if (!documentId.value) return
  await save(undefined, { silent: true })
  await adminApiSend(
    `/api/admin/collections/pages/${documentId.value}/revisions`,
    'POST',
    { note: 'Manual revision' }
  )
  await refreshRevisions()
}

async function restoreRevision(revisionId: string) {
  if (!documentId.value) return
  if (!confirm('Restore this revision? Current content will be overwritten.')) {
    return
  }
  await adminApiSend(
    `/api/admin/collections/pages/${documentId.value}/revisions/${revisionId}/restore`,
    'POST'
  )
  await load(documentId.value)
  await refreshRevisions()
}

function formatTime(value: string) {
  try {
    return new Date(value).toLocaleString()
  } catch {
    return value
  }
}

onMounted(async () => {
  if (isNew.value) resetCreate()
  else {
    await load(idParam.value)
    await refreshRevisions()
  }
})
</script>

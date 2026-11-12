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
      <NuxtLink :to="`/${lang}/collections/posts`" class="admin-muted">
        ← Posts
      </NuxtLink>
    </DocumentHeader>

    <p v-if="conflict" class="admin-form__error">
      Someone else edited this post. Reload before saving again.
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
  </div>
</template>

<script setup lang="ts">
import { DocumentForm } from '@admin'
import { DocumentHeader } from '@admin'
import { useDocumentForm } from '@admin'

useHead({ title: 'Post' })

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
} = useDocumentForm('posts')

const fields = computed(() => collectionConfig.value?.fields ?? [])
const canPreview = computed(() => Boolean(documentId.value || model.value.slug))

const headerTitle = computed(
  () => String(model.value.title || (isNew.value ? 'New post' : 'Post'))
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

async function onDraft() {
  const doc = await save('draft')
  if (doc && isNew.value) {
    await navigateTo(`/${lang.value}/collections/posts/${doc.id}`, {
      replace: true,
    })
  }
}

async function onPublish() {
  const doc = documentId.value ? await publish() : await save('published')
  if (doc && isNew.value) {
    await navigateTo(`/${lang.value}/collections/posts/${doc.id}`, {
      replace: true,
    })
  }
}

async function onUnpublish() {
  await unpublish()
}

async function onPreview() {
  const result = await preview()
  if (!result?.path) return
  // Preview route for posts uses same token path under /preview
  const webOrigin =
    String((config.public as { webOrigin?: string }).webOrigin || '').replace(
      /\/$/,
      ''
    ) || 'http://localhost:3000'
  window.open(`${webOrigin}${result.path}`, '_blank', 'noopener,noreferrer')
}

async function onDelete() {
  if (!confirm('Move this post to trash?')) return
  const deleted = await remove(false)
  if (deleted) await navigateTo(`/${lang.value}/collections/posts`)
}

onMounted(() => {
  if (isNew.value) resetCreate()
  else void load(idParam.value)
})
</script>

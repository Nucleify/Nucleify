<template>
  <div>
    <DocumentHeader
      :title="headerTitle"
      :meta="headerMeta"
      :status="String(model.status || 'draft')"
      :dirty="dirty"
      :crumbs="crumbs"
      :preview-disabled="saving || loading || !canPreview"
      :draft-disabled="saving || loading"
      :publish-disabled="saving || loading"
      :unpublish-disabled="saving || loading"
      :show-unpublish="model.status === 'published'"
      :draft-label="saving ? 'Saving…' : dirty ? 'Save draft*' : 'Save draft'"
      :publish-label="saving ? 'Publishing…' : 'Publish'"
      :more="moreActions"
      @preview="onPreview"
      @save-draft="onDraft"
      @publish="onPublish"
      @unpublish="onUnpublish"
    />

    <div v-if="conflict" class="admin-conflict-banner">
      <p class="admin-form__error" style="margin: 0">
        Someone else edited this post. Reload before saving again.
      </p>
      <div class="admin-actions">
        <nui-button type="button" variant="outlined" label="Reload" @click="reloadDoc" />
        <nui-button type="button" variant="filled" label="Overwrite" @click="onOverwrite" />
      </div>
    </div>
    <p v-if="error" class="admin-form__error">{{ error }}</p>
    <p v-if="loading" class="admin-muted">Loading…</p>

    <DocumentForm
      v-else-if="fields.length"
      :model-value="model"
      :fields="fields"
      @update:model-value="onModel"
    />

    <AdminConfirmDialog
      :open="confirmTrash"
      title="Move to trash?"
      message="This post will be moved to trash."
      confirm-label="Trash"
      @confirm="doTrash"
      @cancel="confirmTrash = false"
    />
  </div>
</template>

<script setup lang="ts">
import type { AdminAction } from '@admin'
import { useDocumentForm } from '@admin'
import { adminApiSend } from '@admin'
import { useAdminToast } from '@admin'

useHead({ title: 'Post' })

const route = useRoute()
const config = useRuntimeConfig()
const toast = useAdminToast()
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
const confirmTrash = ref(false)

const crumbs = computed(() => [
  { label: 'Collections' },
  { label: 'Posts', to: `/${lang.value}/collections/posts` },
  { label: isNew.value ? 'New' : String(model.value.title || 'Edit') },
])

const headerTitle = computed(
  () => String(model.value.title || (isNew.value ? 'New post' : 'Post'))
)
const headerMeta = computed(() => {
  const slug = String(model.value.slug || '—')
  const locale = String(model.value.locale || 'en')
  return `${slug} · ${locale}`
})

const moreActions = computed((): AdminAction[] => [
  {
    id: 'schedule',
    label: 'Schedule…',
    disabled: saving.value,
    onClick: async () => {
      const when = window.prompt(
        'Publish at (ISO datetime)',
        model.value.publishedAt || new Date().toISOString()
      )
      if (!when) return
      model.value = { ...model.value, publishedAt: when, status: 'scheduled' }
      markDirty()
      await save('scheduled')
    },
  },
  {
    id: 'permalink',
    label: 'Copy permalink',
    onClick: async () => {
      const path = `/${model.value.locale || 'en'}/blog/${model.value.slug || ''}`
      await navigator.clipboard.writeText(path)
      toast.success('Permalink copied.')
    },
  },
  {
    id: 'live',
    label: 'Open live',
    onClick: () => {
      const webOrigin =
        String((config.public as { webOrigin?: string }).webOrigin || '').replace(
          /\/$/,
          ''
        ) || 'http://localhost:3000'
      window.open(
        `${webOrigin}/${model.value.locale || 'en'}/blog/${model.value.slug || ''}`,
        '_blank',
        'noopener,noreferrer'
      )
    },
  },
  {
    id: 'export',
    label: 'Export JSON',
    onClick: () => {
      const blob = new Blob([JSON.stringify(model.value, null, 2)], {
        type: 'application/json',
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${model.value.slug || 'post'}.json`
      a.click()
      URL.revokeObjectURL(url)
    },
  },
  {
    id: 'duplicate',
    label: 'Duplicate',
    disabled: !documentId.value,
    onClick: async () => {
      const doc = await adminApiSend<Record<string, unknown>>(
        '/api/admin/collections/posts',
        'POST',
        {
          title: `${model.value.title} (copy)`,
          slug: `${model.value.slug}-copy`,
          locale: model.value.locale,
          status: 'draft',
          data: {
            version: 1,
            body: model.value.body,
            excerpt: model.value.excerpt,
            featuredImage: model.value.featuredImage,
            seo: model.value.seo,
          },
        }
      )
      if (doc?.id) {
        toast.success('Duplicated.')
        await navigateTo(`/${lang.value}/collections/posts/${doc.id}`)
      }
    },
  },
  {
    id: 'trash',
    label: 'Trash',
    danger: true,
    disabled: !documentId.value || saving.value,
    onClick: () => {
      confirmTrash.value = true
    },
  },
])

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
  const webOrigin =
    String((config.public as { webOrigin?: string }).webOrigin || '').replace(
      /\/$/,
      ''
    ) || 'http://localhost:3000'
  window.open(`${webOrigin}${result.path}`, '_blank', 'noopener,noreferrer')
}

async function doTrash() {
  confirmTrash.value = false
  const deleted = await remove(false)
  if (deleted) await navigateTo(`/${lang.value}/collections/posts`)
}

async function reloadDoc() {
  if (!documentId.value) return
  await load(documentId.value)
}

async function onOverwrite() {
  await save(undefined)
}

onMounted(() => {
  if (isNew.value) resetCreate()
  else void load(idParam.value)
})
</script>

<template>
  <div class="admin-page-editor">
    <DocumentHeader
      :title="headerTitle"
      :meta="headerMeta"
      :status="String(model.status || 'draft')"
      :dirty="dirty"
      :saved-at="savedLabel"
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
    >
      <button
        type="button"
        class="admin-control-btn admin-control-btn--filled"
        :disabled="saving || loading || !canPreview || !creatorHref"
        @click="openCreator"
      >
        Interactive creator
      </button>
    </DocumentHeader>

    <div v-if="conflict" class="admin-conflict-banner">
      <p class="admin-form__error" style="margin: 0">
        Someone else edited this page. Reload before saving again.
      </p>
      <div class="admin-actions">
        <button type="button" class="admin-control-btn" @click="reloadDoc">
          Reload
        </button>
        <button
          type="button"
          class="admin-control-btn admin-control-btn--filled"
          @click="onOverwrite"
        >
          Overwrite
        </button>
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

    <AdminRevisionsDrawer
      :open="revisionsOpen"
      :revisions="revisions"
      :saving="saving"
      @close="revisionsOpen = false"
      @save="saveRevision"
      @restore="restoreRevision"
    />

    <AdminConfirmDialog
      :open="confirmTrash"
      title="Move to trash?"
      message="This page will be moved to trash."
      confirm-label="Trash"
      @confirm="doTrash"
      @cancel="confirmTrash = false"
    />

    <AdminConfirmDialog
      :open="leaveOpen"
      title="Leave without saving?"
      message="You have unsaved changes."
      confirm-label="Leave"
      @confirm="confirmLeave"
      @cancel="leaveOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import type { AdminAction } from '@admin'
import { useDocumentForm } from '@admin'
import { adminApiGet, adminApiSend } from '@admin'
import { useAdminToast } from '@admin'

useHead({ title: 'Page' })

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
} = useDocumentForm('pages')

const fields = computed(() => collectionConfig.value?.fields ?? [])
const canPreview = computed(() => Boolean(documentId.value || model.value.slug))
const revisions = ref<{ id: string; note: string; created_at: string }[]>([])
const revisionsOpen = ref(false)
const confirmTrash = ref(false)
const leaveOpen = ref(false)
const locked = ref(false)
let pendingTo: string | null = null

const crumbs = computed(() => [
  { label: 'Collections' },
  { label: 'Pages', to: `/${lang.value}/collections/pages` },
  { label: isNew.value ? 'New' : String(model.value.title || 'Edit') },
])

const headerTitle = computed(
  () => String(model.value.title || (isNew.value ? 'New page' : 'Page'))
)
const headerMeta = computed(() => {
  const slug = String(model.value.slug || '—')
  const locale = String(model.value.locale || 'en')
  return `${slug} · ${locale}${locked.value ? ' · locked' : ''}`
})

const savedLabel = computed(() => {
  if (dirty.value) return ''
  return new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
})

const creatorHref = computed(() => {
  const id = documentId.value || (!isNew.value ? idParam.value : '')
  if (!id) return ''
  return `/${lang.value}/collections/pages/${id}/creator`
})

async function openCreator() {
  if (!creatorHref.value) {
    toast.error('Save a draft first, then open the interactive creator.')
    return
  }
  await navigateTo(creatorHref.value)
}

function webOrigin() {
  return (
    String((config.public as { webOrigin?: string }).webOrigin || '').replace(
      /\/$/,
      ''
    ) || 'http://127.0.0.1:7777'
  )
}

const moreActions = computed((): AdminAction[] => [
  {
    id: 'creator',
    label: 'Interactive creator',
    disabled: saving.value || loading.value || !canPreview.value || !creatorHref.value,
    onClick: async () => {
      if (!creatorHref.value) return
      await navigateTo(creatorHref.value)
    },
  },
  {
    id: 'schedule',
    label: 'Schedule…',
    disabled: saving.value || locked.value,
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
    id: 'revision',
    label: 'Save revision',
    disabled: !documentId.value || saving.value,
    onClick: () => saveRevision(),
  },
  {
    id: 'revisions',
    label: 'Revisions…',
    disabled: !documentId.value,
    onClick: () => {
      revisionsOpen.value = true
    },
  },
  {
    id: 'permalink',
    label: 'Copy permalink',
    onClick: async () => {
      const path = `/${model.value.locale || 'en'}/${model.value.slug || ''}`
      await navigator.clipboard.writeText(path)
      toast.success('Permalink copied.')
    },
  },
  {
    id: 'live',
    label: 'Open live',
    onClick: () => {
      window.open(
        `${webOrigin()}/${model.value.locale || 'en'}/${model.value.slug || ''}`,
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
      a.download = `${model.value.slug || 'page'}.json`
      a.click()
      URL.revokeObjectURL(url)
    },
  },
  {
    id: 'locale',
    label: 'Copy from locale…',
    disabled: !documentId.value,
    onClick: async () => {
      const from = window.prompt('Copy content from locale code', 'en')
      if (!from || !documentId.value) return
      await adminApiSend(
        `/api/admin/collections/pages/${documentId.value}/copy-locale`,
        'POST',
        { fromLocale: from }
      ).catch(() => null)
      await load(documentId.value)
      toast.info('Requested locale copy (if supported).')
    },
  },
  {
    id: 'lock',
    label: locked.value ? 'Unlock editing' : 'Lock editing',
    onClick: () => {
      locked.value = !locked.value
      toast.info(locked.value ? 'Editing locked.' : 'Editing unlocked.')
    },
  },
  {
    id: 'duplicate',
    label: 'Duplicate',
    disabled: !documentId.value,
    onClick: async () => {
      const doc = await adminApiSend<Record<string, unknown>>(
        '/api/admin/collections/pages',
        'POST',
        {
          title: `${model.value.title} (copy)`,
          slug: `${model.value.slug}-copy`,
          locale: model.value.locale,
          status: 'draft',
          data: {
            version: 1,
            sections: model.value.sections,
            seo: model.value.seo,
            enableIris: model.value.enableIris,
            showMenu: model.value.showMenu,
            menuSlug: model.value.menuSlug,
            showRail: model.value.showRail,
            showShear: model.value.showShear,
            showFooter: model.value.showFooter,
            footerMenuSlug: model.value.footerMenuSlug,
            footerTemplate: model.value.footerTemplate,
          },
        }
      )
      if (doc?.id) {
        toast.success('Duplicated.')
        await navigateTo(`/${lang.value}/collections/pages/${doc.id}`)
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
  if (locked.value) {
    toast.info('Editing is locked.')
    return
  }
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
      (await adminApiGet(
        `/api/admin/collections/pages/${documentId.value}/revisions`
      )) ?? []
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
  window.open(`${webOrigin()}${result.path}`, '_blank', 'noopener,noreferrer')
}

async function doTrash() {
  confirmTrash.value = false
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
  toast.success('Revision saved.')
}

async function restoreRevision(revisionId: string) {
  if (!documentId.value) return
  await adminApiSend(
    `/api/admin/collections/pages/${documentId.value}/revisions/${revisionId}/restore`,
    'POST'
  )
  await load(documentId.value)
  await refreshRevisions()
  toast.success('Revision restored.')
}

async function reloadDoc() {
  if (!documentId.value) return
  await load(documentId.value)
}

async function onOverwrite() {
  await save(undefined)
}

function confirmLeave() {
  leaveOpen.value = false
  dirty.value = false
  if (pendingTo) void navigateTo(pendingTo)
  pendingTo = null
}

onBeforeRouteLeave((to) => {
  if (!dirty.value) return true
  pendingTo = to.fullPath
  leaveOpen.value = true
  return false
})

onMounted(async () => {
  if (isNew.value) resetCreate()
  else {
    await load(idParam.value)
    await refreshRevisions()
  }
})
</script>

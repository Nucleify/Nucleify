<template>
  <div class="admin-page-editor is-creator">
    <InteractiveCreator
      :preview-url="previewUrl"
      :frame-key="frameKey"
      :refreshing="creatorRefreshing"
      :loading="sidebarLoading"
      :title="headerMeta"
      :live-payload="creatorLivePayload"
      :target-origin="webOrigin()"
      :draft-disabled="saving || sidebarLoading"
      :publish-disabled="saving || sidebarLoading"
      :unpublish-disabled="saving || sidebarLoading"
      :show-unpublish="model.status === 'published'"
      :draft-label="saving ? 'Saving…' : dirty ? 'Save draft*' : 'Save draft'"
      :publish-label="saving ? 'Publishing…' : 'Publish'"
      @refresh="refreshCreatorPreview"
      @exit="exitCreator"
      @save-draft="onCreatorDraft"
      @publish="onCreatorPublish"
      @unpublish="onUnpublish"
    >
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
      <DocumentForm
        v-if="fields.length"
        :model-value="model"
        :fields="fields"
        @update:model-value="onModel"
      />
    </InteractiveCreator>

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
import { useDocumentForm } from '@admin'
import { useAdminToast } from '@admin'
import type { PreviewLivePayload } from '@shared_modules'

definePageMeta({ layout: 'blank' })
useHead({ title: 'Interactive creator' })

const route = useRoute()
const config = useRuntimeConfig()
const toast = useAdminToast()
const lang = computed(() => String(route.params.lang || 'en'))
const idParam = computed(() => String(route.params.id || ''))

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
  save,
  publish,
  unpublish,
  preview,
  markDirty,
} = useDocumentForm('pages')

const fields = computed(() => collectionConfig.value?.fields ?? [])
const previewUrl = ref('')
const frameKey = ref(0)
const creatorRefreshing = ref(false)
const leaveOpen = ref(false)
let pendingTo: string | null = null

// Gate first paint before onMounted — otherwise fields (sync) + loading=false
// flash the empty form for a frame.
loading.value = true

/** Sidebar form only — do not wait on preview iframe boot (that made the list pop in late). */
const sidebarLoading = computed(
  () => loading.value || fields.value.length === 0
)

const headerMeta = computed(() => {
  const slug = String(model.value.slug || '—')
  const locale = String(model.value.locale || 'en')
  return `${slug} · ${locale}`
})

function webOrigin() {
  return (
    String((config.public as { webOrigin?: string }).webOrigin || '').replace(
      /\/$/,
      ''
    ) || 'http://127.0.0.1:7777'
  )
}

const creatorLivePayload = computed((): PreviewLivePayload => ({
  sections: Array.isArray(model.value.sections) ? model.value.sections : [],
  title: String(model.value.title || ''),
  slug: String(model.value.slug || ''),
  template: String(model.value.template || 'rail'),
  enableIris: model.value.enableIris !== false,
  showMenu: model.value.showMenu === true,
  menuSlug: String(model.value.menuSlug || 'primary'),
  showRail: model.value.showRail !== false,
  showShear: model.value.showShear !== false,
  showFooter: model.value.showFooter !== false,
  footerMenuSlug: String(model.value.footerMenuSlug || 'footer'),
  footerTemplate: String(model.value.footerTemplate || 'home'),
}))

const editorPath = computed(
  () => `/${lang.value}/collections/pages/${documentId.value || idParam.value}`
)

async function buildPreviewUrl() {
  const result = await preview()
  if (!result?.path) return ''
  const url = new URL(result.path, webOrigin())
  // Hide in-frame draft banner — creator shows it in the viewport bar.
  url.searchParams.set('embed', '1')
  return url.toString()
}

async function bootPreview() {
  creatorRefreshing.value = true
  try {
    const url = await buildPreviewUrl()
    if (!url) {
      toast.error('Could not open preview. Save a draft first.')
      await navigateTo(editorPath.value, { replace: true })
      return
    }
    previewUrl.value = url
    frameKey.value += 1
  } finally {
    creatorRefreshing.value = false
  }
}

async function refreshCreatorPreview() {
  creatorRefreshing.value = true
  try {
    if (dirty.value) await save(undefined, { silent: true })
    const url = await buildPreviewUrl()
    if (!url) return
    previewUrl.value = url
    frameKey.value += 1
  } finally {
    creatorRefreshing.value = false
  }
}

async function onCreatorDraft() {
  await save('draft')
  await refreshCreatorPreview()
}

async function onCreatorPublish() {
  if (documentId.value) await publish()
  else await save('published')
  await refreshCreatorPreview()
}

async function onUnpublish() {
  await unpublish()
}

function onModel(next: typeof model.value) {
  model.value = next
  markDirty()
}

async function reloadDoc() {
  if (!documentId.value) return
  await load(documentId.value)
}

async function onOverwrite() {
  await save(undefined)
}

function exitCreator() {
  void navigateTo(editorPath.value)
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
  if (!idParam.value || idParam.value === 'new') {
    await navigateTo(`/${lang.value}/collections/pages/new`, { replace: true })
    return
  }
  await load(idParam.value)
  // Preview boots after the form — sidebar list stays visible as soon as the doc loads.
  void bootPreview()
})
</script>

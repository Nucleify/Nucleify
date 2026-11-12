import type { CollectionConfig } from '@shared_modules'
import { getCollectionConfig } from '@shared_modules'

import { adminApiGet, adminApiSend } from '@admin'

export type DocumentFormModel = Record<string, unknown> & {
  title: string
  slug: string
  status: string
  locale: string
  sections: unknown[]
  body: unknown[]
  seo: Record<string, unknown>
  template: string
  publishedAt: string
  excerpt: string
  featuredImage: string
  enableIris: boolean
  translationGroup: string
}

export type CmsDocumentRow = {
  id: string
  collection_slug: string
  locale: string
  title: string
  slug: string
  status: string
  published_at: string | null
  template?: string
  translation_group?: string | null
  data: Record<string, unknown>
  updated_at?: string
  created_at?: string
}

function emptyModel(): DocumentFormModel {
  return {
    title: '',
    slug: '',
    status: 'draft',
    locale: 'en',
    sections: [],
    body: [],
    seo: { title: '', description: '', robots: 'index,follow' },
    template: 'default',
    publishedAt: '',
    excerpt: '',
    featuredImage: '',
    enableIris: true,
    translationGroup: '',
  }
}

function fromDocument(doc: CmsDocumentRow): DocumentFormModel {
  const data = doc.data ?? {}
  const seo =
    data.seo && typeof data.seo === 'object' && !Array.isArray(data.seo)
      ? (data.seo as Record<string, unknown>)
      : { title: '', description: '', robots: 'index,follow' }
  return {
    title: doc.title || '',
    slug: doc.slug || '',
    status: doc.status || 'draft',
    locale: doc.locale || 'en',
    sections: Array.isArray(data.sections) ? data.sections : [],
    body: Array.isArray(data.body) ? data.body : [],
    seo,
    template: doc.template || String(data.template ?? 'default'),
    publishedAt: doc.published_at || '',
    excerpt: typeof data.excerpt === 'string' ? data.excerpt : '',
    featuredImage:
      typeof data.featuredImage === 'string' ? data.featuredImage : '',
    enableIris: data.enableIris !== false,
    translationGroup: doc.translation_group || '',
  }
}

function toPayload(
  model: DocumentFormModel,
  collectionSlug: string,
  expectedUpdatedAt?: string
) {
  const data: Record<string, unknown> = {
    version: 1,
    seo: model.seo && typeof model.seo === 'object' ? model.seo : {},
  }
  if (collectionSlug === 'posts') {
    data.body = Array.isArray(model.body) ? model.body : []
    data.excerpt = model.excerpt || ''
    data.featuredImage = model.featuredImage || ''
  } else {
    data.sections = Array.isArray(model.sections) ? model.sections : []
    data.enableIris = model.enableIris !== false
  }
  return {
    title: String(model.title ?? ''),
    slug: String(model.slug ?? ''),
    locale: String(model.locale ?? 'en'),
    status: String(model.status ?? 'draft'),
    template: String(model.template ?? 'default'),
    publishedAt: model.publishedAt || undefined,
    translationGroup: model.translationGroup || undefined,
    expectedUpdatedAt,
    data,
  }
}

export function useDocumentForm(collectionSlug: string) {
  const config = computed<CollectionConfig | undefined>(() =>
    getCollectionConfig(collectionSlug)
  )
  const model = ref<DocumentFormModel>(emptyModel())
  const documentId = ref<string | null>(null)
  const updatedAt = ref<string | null>(null)
  const loading = ref(false)
  const saving = ref(false)
  const dirty = ref(false)
  const error = ref('')
  const ok = ref('')
  const conflict = ref(false)

  let autosaveTimer: ReturnType<typeof setTimeout> | null = null

  function markDirty() {
    dirty.value = true
    ok.value = ''
    scheduleAutosave()
  }

  function scheduleAutosave() {
    if (!documentId.value) return
    if (autosaveTimer) clearTimeout(autosaveTimer)
    autosaveTimer = setTimeout(() => {
      void save(undefined, { silent: true })
    }, 45_000)
  }

  async function load(id: string) {
    loading.value = true
    error.value = ''
    ok.value = ''
    conflict.value = false
    try {
      const doc = await adminApiGet<CmsDocumentRow>(
        `/api/admin/collections/${encodeURIComponent(collectionSlug)}/${encodeURIComponent(id)}`
      )
      documentId.value = doc.id
      updatedAt.value = doc.updated_at ?? null
      model.value = fromDocument(doc)
      dirty.value = false
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load document'
    } finally {
      loading.value = false
    }
  }

  function resetCreate(locale = 'en') {
    documentId.value = null
    updatedAt.value = null
    model.value = { ...emptyModel(), locale }
    error.value = ''
    ok.value = ''
    dirty.value = false
    conflict.value = false
  }

  async function save(
    status?: string,
    opts?: { silent?: boolean }
  ) {
    saving.value = true
    if (!opts?.silent) {
      error.value = ''
      ok.value = ''
    }
    conflict.value = false
    if (status) model.value = { ...model.value, status }
    const payload = toPayload(
      model.value,
      collectionSlug,
      updatedAt.value || undefined
    )
    try {
      let doc: CmsDocumentRow
      if (documentId.value) {
        doc = await adminApiSend<CmsDocumentRow>(
          `/api/admin/collections/${encodeURIComponent(collectionSlug)}/${encodeURIComponent(documentId.value)}`,
          'PATCH',
          payload
        )
      } else {
        doc = await adminApiSend<CmsDocumentRow>(
          `/api/admin/collections/${encodeURIComponent(collectionSlug)}`,
          'POST',
          payload
        )
        documentId.value = doc.id
      }
      model.value = fromDocument(doc)
      updatedAt.value = doc.updated_at ?? null
      dirty.value = false
      if (!opts?.silent) {
        ok.value =
          payload.status === 'published'
            ? 'Published.'
            : payload.status === 'scheduled'
              ? 'Scheduled.'
              : 'Draft saved.'
      }
      return doc
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Save failed'
      if (message.toLowerCase().includes('modified by someone else')) {
        conflict.value = true
      }
      if (!opts?.silent) error.value = message
      return null
    } finally {
      saving.value = false
    }
  }

  async function publish() {
    if (!documentId.value) return save('published')
    saving.value = true
    error.value = ''
    ok.value = ''
    try {
      // Persist current edits first
      await save(undefined, { silent: true })
      const doc = await adminApiSend<CmsDocumentRow>(
        `/api/admin/collections/${encodeURIComponent(collectionSlug)}/${encodeURIComponent(documentId.value)}/publish`,
        'POST'
      )
      model.value = fromDocument(doc)
      updatedAt.value = doc.updated_at ?? null
      dirty.value = false
      ok.value = 'Published.'
      return doc
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Publish failed'
      return null
    } finally {
      saving.value = false
    }
  }

  async function unpublish() {
    if (!documentId.value) return null
    saving.value = true
    error.value = ''
    ok.value = ''
    try {
      const doc = await adminApiSend<CmsDocumentRow>(
        `/api/admin/collections/${encodeURIComponent(collectionSlug)}/${encodeURIComponent(documentId.value)}/unpublish`,
        'POST'
      )
      model.value = fromDocument(doc)
      updatedAt.value = doc.updated_at ?? null
      dirty.value = false
      ok.value = 'Unpublished.'
      return doc
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unpublish failed'
      return null
    } finally {
      saving.value = false
    }
  }

  async function preview() {
    if (!documentId.value) {
      const doc = await save('draft')
      if (!doc) return null
    }
    const result = await adminApiSend<{ token: string; path: string }>(
      `/api/admin/collections/${encodeURIComponent(collectionSlug)}/${encodeURIComponent(documentId.value!)}/preview-token`,
      'POST'
    )
    return result
  }

  async function remove(hard = false) {
    if (!documentId.value) return false
    saving.value = true
    error.value = ''
    try {
      const qs = hard ? '?hard=1' : ''
      await adminApiSend(
        `/api/admin/collections/${encodeURIComponent(collectionSlug)}/${encodeURIComponent(documentId.value)}${qs}`,
        'DELETE'
      )
      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Delete failed'
      return false
    } finally {
      saving.value = false
    }
  }

  onBeforeUnmount(() => {
    if (autosaveTimer) clearTimeout(autosaveTimer)
  })

  if (import.meta.client) {
    onMounted(() => {
      const onBeforeUnload = (event: BeforeUnloadEvent) => {
        if (!dirty.value) return
        event.preventDefault()
        event.returnValue = ''
      }
      window.addEventListener('beforeunload', onBeforeUnload)
      onBeforeUnmount(() => {
        window.removeEventListener('beforeunload', onBeforeUnload)
      })
    })
  }

  return {
    config,
    model,
    documentId,
    updatedAt,
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
  }
}

import type { CollectionConfig } from '@shared_modules'
import { defaultSeoForSlug, getCollectionConfig } from '@shared_modules'

import { adminApiGet, adminApiSend } from '@admin'
import { useToast } from './use_toast'

export type DocumentFormModel = Record<string, unknown> & {
  title: string
  slug: string
  status: string
  locale: string
  sections: unknown[]
  body: unknown[]
  seo: Record<string, unknown>
  publishedAt: string
  excerpt: string
  featuredImage: string
  enableIris: boolean
  showMenu: boolean
  menuSlug: string
  showRail: boolean
  showShear: boolean
  showFooter: boolean
  footerMenuSlug: string
  footerTemplate: string
  template: string
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
    publishedAt: '',
    excerpt: '',
    featuredImage: '',
    enableIris: true,
    showMenu: false,
    menuSlug: 'primary',
    showRail: true,
    showShear: true,
    showFooter: true,
    footerMenuSlug: '',
    footerTemplate: 'home',
    template: 'rail',
    translationGroup: '',
  }
}

function chromeFlag(value: unknown, fallback = true): boolean {
  if (value === undefined || value === null) return fallback
  return value !== false && value !== 0 && value !== '0' && value !== 'false'
}

function resolveSeo(
  slug: string,
  raw: unknown
): Record<string, unknown> {
  const fromDoc =
    raw && typeof raw === 'object' && !Array.isArray(raw)
      ? (raw as Record<string, unknown>)
      : {}
  const defaults = defaultSeoForSlug(slug)
  if (!defaults) {
    return {
      title: '',
      description: '',
      robots: 'index,follow',
      ...fromDoc,
    }
  }
  const title = typeof fromDoc.title === 'string' ? fromDoc.title.trim() : ''
  const description =
    typeof fromDoc.description === 'string' ? fromDoc.description.trim() : ''
  // Canonical marketing pages: empty CMS seo falls back to product defaults so
  // admin matches what the public shell already serves.
  if (!title && !description) return { ...defaults }
  return { ...defaults, ...fromDoc }
}

function fromDocument(doc: CmsDocumentRow): DocumentFormModel {
  const data = doc.data ?? {}
  const seo = resolveSeo(doc.slug || '', data.seo)
  return {
    title: doc.title || '',
    slug: doc.slug || '',
    status: doc.status || 'draft',
    locale: doc.locale || 'en',
    sections: Array.isArray(data.sections) ? data.sections : [],
    body: Array.isArray(data.body) ? data.body : [],
    seo,
    publishedAt: doc.published_at || '',
    excerpt: typeof data.excerpt === 'string' ? data.excerpt : '',
    featuredImage:
      typeof data.featuredImage === 'string' ? data.featuredImage : '',
    enableIris: chromeFlag(data.enableIris),
    showMenu: chromeFlag(data.showMenu, false),
    menuSlug:
      typeof data.menuSlug === 'string' && data.menuSlug.trim()
        ? data.menuSlug.trim()
        : 'primary',
    showRail: chromeFlag(data.showRail),
    showShear: chromeFlag(data.showShear),
    showFooter: chromeFlag(data.showFooter),
    footerMenuSlug:
      typeof data.footerMenuSlug === 'string' ? data.footerMenuSlug.trim() : '',
    footerTemplate:
      typeof data.footerTemplate === 'string' && data.footerTemplate.trim()
        ? data.footerTemplate.trim()
        : 'home',
    template: String(doc.template || 'rail').trim() || 'rail',
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
    data.enableIris = chromeFlag(model.enableIris)
    data.showMenu = chromeFlag(model.showMenu, false)
    data.menuSlug = String(model.menuSlug || 'primary').trim() || 'primary'
    data.showRail = chromeFlag(model.showRail)
    data.showShear = chromeFlag(model.showShear)
    data.showFooter = chromeFlag(model.showFooter)
    data.footerMenuSlug = String(model.footerMenuSlug || '').trim()
    data.footerTemplate =
      String(model.footerTemplate || 'home').trim() || 'home'
  }
  return {
    title: String(model.title ?? ''),
    slug: String(model.slug ?? ''),
    locale: String(model.locale ?? 'en'),
    status: String(model.status ?? 'draft'),
    template: String(model.template || 'rail').trim() || 'rail',
    publishedAt: model.publishedAt || undefined,
    translationGroup: model.translationGroup || undefined,
    expectedUpdatedAt,
    data,
  }
}

export function useDocumentForm(collectionSlug: string) {
  const toast = useToast()
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
        const message =
          payload.status === 'published'
            ? 'Published.'
            : payload.status === 'scheduled'
              ? 'Scheduled.'
              : 'Draft saved.'
        ok.value = message
        toast.success(message)
      }
      return doc
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Save failed'
      if (message.toLowerCase().includes('modified by someone else')) {
        conflict.value = true
      }
      if (!opts?.silent) {
        error.value = message
        toast.error(message)
      }
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
      toast.success('Published.')
      return doc
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Publish failed'
      error.value = message
      toast.error(message)
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
      toast.success('Unpublished.')
      return doc
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unpublish failed'
      error.value = message
      toast.error(message)
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

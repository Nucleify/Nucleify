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

const chromeFlag = (val: unknown, fallback = true): boolean =>
  val === undefined || val === null
    ? fallback
    : val !== false && val !== 0 && val !== '0' && val !== 'false'

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

function resolveSeo(slug: string, raw: unknown): Record<string, unknown> {
  const fromDoc =
    raw && typeof raw === 'object' && !Array.isArray(raw)
      ? (raw as Record<string, unknown>)
      : {}
  const defaults = defaultSeoForSlug(slug)
  if (!defaults) {
    return { title: '', description: '', robots: 'index,follow', ...fromDoc }
  }
  const hasCustom = Boolean(
    String(fromDoc.title || '').trim() ||
      String(fromDoc.description || '').trim()
  )
  return hasCustom ? { ...defaults, ...fromDoc } : { ...defaults }
}

function fromDocument(doc: CmsDocumentRow): DocumentFormModel {
  const data = doc.data ?? {}
  return {
    ...emptyModel(),
    ...data,
    title: doc.title || '',
    slug: doc.slug || '',
    status: doc.status || 'draft',
    locale: doc.locale || 'en',
    template: String(doc.template || 'rail').trim() || 'rail',
    publishedAt: doc.published_at || '',
    translationGroup: doc.translation_group || '',
    sections: Array.isArray(data.sections) ? data.sections : [],
    body: Array.isArray(data.body) ? data.body : [],
    seo: resolveSeo(doc.slug || '', data.seo),
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
  }
}

function toPayload(
  model: DocumentFormModel,
  collectionSlug: string,
  expectedUpdatedAt?: string
) {
  const isPosts = collectionSlug === 'posts'
  const data: Record<string, unknown> = {
    version: 1,
    seo: model.seo && typeof model.seo === 'object' ? model.seo : {},
    ...(isPosts
      ? {
          body: Array.isArray(model.body) ? model.body : [],
          excerpt: model.excerpt || '',
          featuredImage: model.featuredImage || '',
        }
      : {
          sections: Array.isArray(model.sections) ? model.sections : [],
          enableIris: chromeFlag(model.enableIris),
          showMenu: chromeFlag(model.showMenu, false),
          menuSlug: String(model.menuSlug || 'primary').trim() || 'primary',
          showRail: chromeFlag(model.showRail),
          showShear: chromeFlag(model.showShear),
          showFooter: chromeFlag(model.showFooter),
          footerMenuSlug: String(model.footerMenuSlug || '').trim(),
          footerTemplate:
            String(model.footerTemplate || 'home').trim() || 'home',
        }),
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

  const colUrl = (sub = '') =>
    `/api/admin/collections/${encodeURIComponent(collectionSlug)}${sub ? `/${sub}` : ''}`

  function applyDoc(doc: CmsDocumentRow) {
    documentId.value = doc.id
    updatedAt.value = doc.updated_at ?? null
    model.value = fromDocument(doc)
    dirty.value = false
  }

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
        colUrl(encodeURIComponent(id))
      )
      applyDoc(doc)
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

  async function save(status?: string, opts?: { silent?: boolean }) {
    saving.value = true
    if (!opts?.silent) {
      error.value = ''
      ok.value = ''
    }
    conflict.value = false
    if (status) model.value.status = status

    const payload = toPayload(
      model.value,
      collectionSlug,
      updatedAt.value || undefined
    )
    const url = documentId.value
      ? colUrl(encodeURIComponent(documentId.value))
      : colUrl()
    const method = documentId.value ? 'PATCH' : 'POST'

    try {
      const doc = await adminApiSend<CmsDocumentRow>(url, method, payload)
      applyDoc(doc)
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

  async function mutateDoc(endpoint: string, actionLabel: string) {
    if (!documentId.value) return null
    saving.value = true
    error.value = ''
    ok.value = ''
    try {
      const doc = await adminApiSend<CmsDocumentRow>(endpoint, 'POST')
      applyDoc(doc)
      ok.value = actionLabel
      toast.success(actionLabel)
      return doc
    } catch (e) {
      const message = e instanceof Error ? e.message : `${actionLabel} failed`
      error.value = message
      toast.error(message)
      return null
    } finally {
      saving.value = false
    }
  }

  async function publish() {
    if (!documentId.value) return save('published')
    await save(undefined, { silent: true })
    return mutateDoc(
      colUrl(`${encodeURIComponent(documentId.value)}/publish`),
      'Published.'
    )
  }

  async function unpublish() {
    return mutateDoc(
      colUrl(`${encodeURIComponent(documentId.value!)}/unpublish`),
      'Unpublished.'
    )
  }

  async function preview() {
    if (!documentId.value && !(await save('draft'))) return null
    return adminApiSend<{ token: string; path: string }>(
      colUrl(`${encodeURIComponent(documentId.value!)}/preview-token`),
      'POST'
    )
  }

  async function remove(hard = false) {
    if (!documentId.value) return false
    saving.value = true
    error.value = ''
    try {
      const qs = hard ? '?hard=1' : ''
      await adminApiSend(
        colUrl(`${encodeURIComponent(documentId.value)}${qs}`),
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
      onBeforeUnmount(() =>
        window.removeEventListener('beforeunload', onBeforeUnload)
      )
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

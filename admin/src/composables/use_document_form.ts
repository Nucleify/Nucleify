import type { CollectionConfig } from '../../../shared_modules/nuc_admin/cms/fields/types'
import { getCollectionConfig } from '../../../shared_modules/nuc_admin/cms/admin_config'

import { adminApiGet, adminApiSend } from './use_admin_api'

export type DocumentFormModel = Record<string, unknown> & {
  title: string
  slug: string
  status: string
  locale: string
  sections: unknown[]
  seo: Record<string, unknown>
}

export type CmsDocumentRow = {
  id: string
  collection_slug: string
  locale: string
  title: string
  slug: string
  status: string
  published_at: string | null
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
    seo: { title: '', description: '' },
  }
}

function fromDocument(doc: CmsDocumentRow): DocumentFormModel {
  const data = doc.data ?? {}
  const seo =
    data.seo && typeof data.seo === 'object' && !Array.isArray(data.seo)
      ? (data.seo as Record<string, unknown>)
      : { title: '', description: '' }
  return {
    title: doc.title || '',
    slug: doc.slug || '',
    status: doc.status || 'draft',
    locale: doc.locale || 'en',
    sections: Array.isArray(data.sections) ? data.sections : [],
    seo,
  }
}

function toPayload(model: DocumentFormModel) {
  return {
    title: String(model.title ?? ''),
    slug: String(model.slug ?? ''),
    locale: String(model.locale ?? 'en'),
    status: String(model.status ?? 'draft'),
    data: {
      version: 1,
      sections: Array.isArray(model.sections) ? model.sections : [],
      seo: model.seo && typeof model.seo === 'object' ? model.seo : {},
    },
  }
}

export function useDocumentForm(collectionSlug: string) {
  const config = computed<CollectionConfig | undefined>(() =>
    getCollectionConfig(collectionSlug)
  )
  const model = ref<DocumentFormModel>(emptyModel())
  const documentId = ref<string | null>(null)
  const loading = ref(false)
  const saving = ref(false)
  const error = ref('')
  const ok = ref('')

  async function load(id: string) {
    loading.value = true
    error.value = ''
    ok.value = ''
    try {
      const doc = await adminApiGet<CmsDocumentRow>(
        `/api/admin/collections/${encodeURIComponent(collectionSlug)}/${encodeURIComponent(id)}`
      )
      documentId.value = doc.id
      model.value = fromDocument(doc)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load document'
    } finally {
      loading.value = false
    }
  }

  function resetCreate(locale = 'en') {
    documentId.value = null
    model.value = { ...emptyModel(), locale }
    error.value = ''
    ok.value = ''
  }

  async function save(status?: string) {
    saving.value = true
    error.value = ''
    ok.value = ''
    if (status) model.value = { ...model.value, status }
    const payload = toPayload(model.value)
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
      ok.value = payload.status === 'published' ? 'Published.' : 'Draft saved.'
      return doc
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Save failed'
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
      const doc = await adminApiSend<CmsDocumentRow>(
        `/api/admin/collections/${encodeURIComponent(collectionSlug)}/${encodeURIComponent(documentId.value)}/publish`,
        'POST'
      )
      model.value = fromDocument(doc)
      ok.value = 'Published.'
      return doc
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Publish failed'
      return null
    } finally {
      saving.value = false
    }
  }

  async function remove() {
    if (!documentId.value) return false
    saving.value = true
    error.value = ''
    try {
      await adminApiSend(
        `/api/admin/collections/${encodeURIComponent(collectionSlug)}/${encodeURIComponent(documentId.value)}`,
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

  return {
    config,
    model,
    documentId,
    loading,
    saving,
    error,
    ok,
    load,
    resetCreate,
    save,
    publish,
    remove,
  }
}

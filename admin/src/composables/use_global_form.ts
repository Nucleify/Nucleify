import type { GlobalConfig } from '../../../shared_modules/nuc_admin/cms/fields/types'
import { getGlobalConfig } from '../../../shared_modules/nuc_admin/cms/admin_config'

import { adminApiGet, adminApiSend } from './use_admin_api'

export type GlobalDocumentRow = {
  id: string | null
  global_slug: string
  locale: string
  status: string
  data: Record<string, unknown>
}

export function useGlobalForm(globalSlug: MaybeRefOrGetter<string>) {
  const slug = computed(() => toValue(globalSlug))
  const config = computed<GlobalConfig | undefined>(() =>
    getGlobalConfig(slug.value)
  )
  const model = ref<Record<string, unknown>>({})
  const locale = ref('en')
  const status = ref('draft')
  const documentId = ref<string | null>(null)
  const loading = ref(false)
  const saving = ref(false)
  const error = ref('')
  const ok = ref('')

  async function load(nextLocale = locale.value) {
    if (!slug.value) return
    loading.value = true
    error.value = ''
    ok.value = ''
    locale.value = nextLocale
    try {
      const doc = await adminApiGet<GlobalDocumentRow>(
        `/api/admin/globals/${encodeURIComponent(slug.value)}?locale=${encodeURIComponent(nextLocale)}`
      )
      documentId.value = doc.id
      status.value = doc.status || 'draft'
      model.value = { ...(doc.data ?? {}) }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load global'
    } finally {
      loading.value = false
    }
  }

  async function save(nextStatus?: string) {
    if (!slug.value) return null
    saving.value = true
    error.value = ''
    ok.value = ''
    if (nextStatus) status.value = nextStatus
    try {
      const doc = await adminApiSend<GlobalDocumentRow>(
        `/api/admin/globals/${encodeURIComponent(slug.value)}`,
        'PATCH',
        {
          locale: locale.value,
          status: status.value,
          data: model.value,
        }
      )
      documentId.value = doc.id
      status.value = doc.status
      model.value = { ...(doc.data ?? {}) }
      ok.value = status.value === 'published' ? 'Published.' : 'Draft saved.'
      return doc
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Save failed'
      return null
    } finally {
      saving.value = false
    }
  }

  watch(slug, () => {
    void load('en')
  })

  return {
    config,
    model,
    locale,
    status,
    documentId,
    loading,
    saving,
    error,
    ok,
    load,
    save,
  }
}

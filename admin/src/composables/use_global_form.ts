import type { FieldConfig, GlobalConfig } from '@shared_modules'
import { getGlobalConfig, normalizeFooterGlobalData } from '@shared_modules'

import { adminApiGet, adminApiSend } from '@admin'

export type GlobalDocumentRow = {
  id: string | null
  global_slug: string
  locale: string
  status: string
  data: Record<string, unknown>
}

function fieldDefaults(fields?: FieldConfig[]): Record<string, unknown> {
  const defaults: Record<string, unknown> = {}
  for (const f of fields ?? []) {
    if ('name' in f && f.name && 'defaultValue' in f && f.defaultValue !== undefined) {
      defaults[f.name] = structuredClone(f.defaultValue)
    }
  }
  return defaults
}

function mergeDefaults(
  data: Record<string, unknown>,
  defaults: Record<string, unknown>
): Record<string, unknown> {
  const merged = { ...defaults, ...data }
  for (const [key, val] of Object.entries(defaults)) {
    const cur = data[key]
    if (
      cur === undefined ||
      cur === null ||
      cur === '' ||
      (Array.isArray(cur) && cur.length === 0 && Array.isArray(val))
    ) {
      merged[key] = structuredClone(val)
    }
  }
  return merged
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

  const endpoint = (loc?: string) =>
    `/api/admin/globals/${encodeURIComponent(slug.value)}${loc ? `?locale=${encodeURIComponent(loc)}` : ''}`

  async function load(nextLocale = locale.value) {
    if (!slug.value) return
    loading.value = true
    error.value = ''
    ok.value = ''
    locale.value = nextLocale
    try {
      const doc = await adminApiGet<GlobalDocumentRow>(endpoint(nextLocale))
      documentId.value = doc.id
      status.value = doc.status || 'draft'
      const raw = { ...(doc.data ?? {}) }
      model.value =
        slug.value === 'footer'
          ? normalizeFooterGlobalData(raw, nextLocale)
          : mergeDefaults(raw, fieldDefaults(config.value?.fields))
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
      const doc = await adminApiSend<GlobalDocumentRow>(endpoint(), 'PATCH', {
        locale: locale.value,
        status: status.value,
        data: model.value,
      })
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

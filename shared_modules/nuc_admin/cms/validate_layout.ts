import { isRegisteredWidgetType } from './registry'

export type PageSection = {
  id: string
  type: string
  order: number
  props?: Record<string, unknown>
}

export type PageLayout = {
  version: number
  title?: string
  slug?: string
  locale?: string
  sections: PageSection[]
  seo?: { title?: string; description?: string }
}

export type LayoutValidateResult =
  | { ok: true; layout: PageLayout }
  | { ok: false; error: string }

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

export function validateLayout(raw: unknown): LayoutValidateResult {
  if (!isPlainObject(raw)) {
    return { ok: false, error: 'layout must be an object' }
  }

  const version = Number(raw.version ?? 1)
  if (!Number.isFinite(version) || version < 1) {
    return { ok: false, error: 'layout.version must be a positive number' }
  }

  const sectionsRaw = raw.sections
  if (!Array.isArray(sectionsRaw)) {
    return { ok: false, error: 'layout.sections must be an array' }
  }

  const sections: PageSection[] = []
  const seenIds = new Set<string>()

  for (let i = 0; i < sectionsRaw.length; i++) {
    const item = sectionsRaw[i]
    if (!isPlainObject(item)) {
      return { ok: false, error: `sections[${i}] must be an object` }
    }
    const id = String(item.id ?? '').trim()
    const type = String(item.type ?? '').trim()
    const order = Number(item.order ?? i)
    if (!id) return { ok: false, error: `sections[${i}].id is required` }
    if (seenIds.has(id)) {
      return { ok: false, error: `duplicate section id: ${id}` }
    }
    seenIds.add(id)
    if (!type) return { ok: false, error: `sections[${i}].type is required` }
    if (!isRegisteredWidgetType(type)) {
      return { ok: false, error: `unknown widget type: ${type}` }
    }
    if (!Number.isFinite(order)) {
      return { ok: false, error: `sections[${i}].order must be a number` }
    }
    const props = isPlainObject(item.props) ? item.props : {}
    sections.push({ id, type, order, props })
  }

  sections.sort((a, b) => a.order - b.order)

  const layout: PageLayout = {
    version,
    sections,
  }
  if (typeof raw.title === 'string') layout.title = raw.title
  if (typeof raw.slug === 'string') layout.slug = raw.slug
  if (typeof raw.locale === 'string') layout.locale = raw.locale
  if (isPlainObject(raw.seo)) {
    layout.seo = {
      title: typeof raw.seo.title === 'string' ? raw.seo.title : '',
      description:
        typeof raw.seo.description === 'string' ? raw.seo.description : '',
    }
  }

  return { ok: true, layout }
}

/** Normalize document `data` that stores sections at top-level or under `layout`. */
export function validateDocumentData(data: unknown): LayoutValidateResult {
  if (!isPlainObject(data)) {
    return { ok: false, error: 'data must be an object' }
  }
  if (Array.isArray(data.sections)) {
    return validateLayout({
      version: data.version ?? 1,
      title: data.title,
      slug: data.slug,
      locale: data.locale,
      sections: data.sections,
      seo: data.seo,
    })
  }
  if (isPlainObject(data.layout)) {
    return validateLayout(data.layout)
  }
  // Empty / non-layout documents are allowed (fields-only).
  return {
    ok: true,
    layout: { version: 1, sections: [] },
  }
}

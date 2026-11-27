import type { Component } from 'vue'

export type PageTemplateDefinition = {
  id: string
  label: string
  /** When false, layout skips rail / shear / iris chrome. */
  frameEffects: boolean
  Rail?: Component
  Shear?: Component
}

const templates: PageTemplateDefinition[] = []
const byId = new Map<string, PageTemplateDefinition>()

export const DEFAULT_PAGE_TEMPLATE_ID = 'rail'

export function registerPageTemplate(def: PageTemplateDefinition): void {
  const existing = byId.get(def.id)
  if (existing) {
    const idx = templates.indexOf(existing)
    if (idx >= 0) templates[idx] = def
  } else {
    templates.push(def)
  }
  byId.set(def.id, def)
}

export function listPageTemplates(): PageTemplateDefinition[] {
  return [...templates]
}

export function getPageTemplate(
  id: string | null | undefined
): PageTemplateDefinition | undefined {
  const key = String(id || '').trim()
  if (!key) return byId.get(DEFAULT_PAGE_TEMPLATE_ID)
  return byId.get(key) ?? byId.get(DEFAULT_PAGE_TEMPLATE_ID)
}

export function defaultPageTemplateId(): string {
  return byId.has(DEFAULT_PAGE_TEMPLATE_ID)
    ? DEFAULT_PAGE_TEMPLATE_ID
    : (templates[0]?.id ?? DEFAULT_PAGE_TEMPLATE_ID)
}

export function resolvePageTemplate(
  id: string | null | undefined
): PageTemplateDefinition {
  return (
    getPageTemplate(id) ?? {
      id: DEFAULT_PAGE_TEMPLATE_ID,
      label: 'Rail',
      frameEffects: true,
    }
  )
}

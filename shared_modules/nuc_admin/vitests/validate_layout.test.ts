import { describe, expect, it } from 'vitest'

import { getAdminConfig, getCollectionConfig } from '../cms/admin_config'
import { validateDocumentData, validateLayout } from '../cms/validate_layout'

describe('validateLayout', () => {
  it('accepts ordered registered sections', () => {
    const result = validateLayout({
      version: 1,
      sections: [
        {
          id: 'sec_pillars',
          type: 'section.pillars',
          order: 1,
          props: { items: [] },
        },
        {
          id: 'sec_hero',
          type: 'section.hero',
          order: 0,
          props: { headline: 'Hello' },
        },
      ],
    })
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.layout.sections.map((s) => s.id)).toEqual([
      'sec_hero',
      'sec_pillars',
    ])
  })

  it('rejects unknown widget types', () => {
    const result = validateLayout({
      version: 1,
      sections: [{ id: 'x', type: 'unknown.block', order: 0 }],
    })
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.error).toContain('unknown widget type')
  })

  it('rejects duplicate section ids', () => {
    const result = validateLayout({
      version: 1,
      sections: [
        { id: 'same', type: 'section.hero', order: 0 },
        { id: 'same', type: 'section.pillars', order: 1 },
      ],
    })
    expect(result.ok).toBe(false)
  })
})

describe('validateDocumentData', () => {
  it('allows empty field-only documents', () => {
    const result = validateDocumentData({ title: 'x' })
    expect(result.ok).toBe(true)
  })
})

describe('admin_config', () => {
  it('registers pages collection', () => {
    expect(getCollectionConfig('pages')?.slug).toBe('pages')
    expect(getAdminConfig().globals.map((g) => g.slug)).toEqual([
      'settings',
      'header',
      'footer',
    ])
  })
})

describe('default marketing layouts', () => {
  it('registers every default home, investor, company, and thank-you section type', async () => {
    const {
      DEFAULT_COMPANY_SECTIONS,
      DEFAULT_HOME_SECTIONS,
      DEFAULT_INVESTOR_SECTIONS,
      DEFAULT_THANK_YOU_SECTIONS,
    } = await import('../cms/default_pages')
    const { isRegisteredWidgetType } = await import('../cms/registry')
    for (const section of [
      ...DEFAULT_HOME_SECTIONS,
      ...DEFAULT_INVESTOR_SECTIONS,
      ...DEFAULT_COMPANY_SECTIONS,
      ...DEFAULT_THANK_YOU_SECTIONS,
    ]) {
      expect(isRegisteredWidgetType(section.type)).toBe(true)
    }
  })

  it('exposes adminFields for every registered widget', async () => {
    const { listWidgets } = await import('../cms/registry')
    for (const widget of listWidgets()) {
      expect(widget.adminFields?.length ?? 0).toBeGreaterThan(0)
    }
  })

  it('accepts the seeded home layout', async () => {
    const { DEFAULT_HOME_SECTIONS } = await import('../cms/default_pages')
    const result = validateLayout({
      version: 1,
      sections: DEFAULT_HOME_SECTIONS,
    })
    expect(result.ok).toBe(true)
  })

  it('registers pages and posts collections', async () => {
    const { getCollectionConfig, listCollectionSlugs } = await import(
      '../cms/admin_config'
    )
    expect(listCollectionSlugs()).toEqual(['pages', 'posts'])
    expect(getCollectionConfig('posts')?.labels.plural).toBe('Posts')
  })
})

describe('preview tokens', () => {
  it('signs and verifies a preview token', async () => {
    const { signPreviewToken, verifyPreviewToken } = await import(
      '../cms/preview_token'
    )
    const token = signPreviewToken({
      slug: 'home',
      locale: 'en',
      collection: 'pages',
      ttlSec: 60,
    })
    const payload = verifyPreviewToken(token)
    expect(payload?.slug).toBe('home')
    expect(payload?.locale).toBe('en')
    expect(payload?.collection).toBe('pages')
  })
})

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
          type: 'home.pillars',
          order: 1,
          props: { items: [] },
        },
        {
          id: 'sec_hero',
          type: 'home.hero',
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
        { id: 'same', type: 'home.hero', order: 0 },
        { id: 'same', type: 'home.pillars', order: 1 },
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

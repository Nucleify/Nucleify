import { describe, expect, it } from 'vitest'

import {
  defaultFooterGlobalData,
  footerTemplateForPageSlug,
  normalizeFooterGlobalData,
  resolveFooterTemplateData,
} from '../cms/defaults/footer'

describe('footer templates', () => {
  it('maps page slugs to packs', () => {
    expect(footerTemplateForPageSlug('home')).toBe('home')
    expect(footerTemplateForPageSlug('investor')).toBe('investor')
    expect(footerTemplateForPageSlug('migrations-company')).toBe('company')
  })

  it('ships three distinct default packs', () => {
    const data = defaultFooterGlobalData('en')
    const templates = data.templates as Record<
      string,
      { brand: string; links: { label: string }[] }
    >
    expect(Object.keys(templates)).toEqual(['home', 'investor', 'company'])
    expect(templates.home.links.map((l) => l.label)).toEqual([
      'Docs',
      'Playground',
      'CLI',
      'GitHub',
    ])
    expect(templates.investor.links[0]?.label).toBe('Product')
    expect(templates.company.links[0]?.label).toBe('Product')
    expect(templates.investor.links).toHaveLength(5)
    expect(templates.home.links).toHaveLength(4)
    expect(templates.home.separator).toBe('dot')
  })

  it('normalizes legacy single-template drafts into home', () => {
    const next = normalizeFooterGlobalData({
      menuSlug: 'footer',
      brand: 'Nucleify',
      links: [{ label: 'Docs', href: 'https://docs.nucleify.io' }],
    })
    const pack = resolveFooterTemplateData(next, 'home')
    expect(pack.links).toEqual([
      { label: 'Docs', href: 'https://docs.nucleify.io' },
    ])
    expect(
      resolveFooterTemplateData(next, 'investor').links.length
    ).toBeGreaterThan(0)
  })
})

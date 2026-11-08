import { describe, expect, it } from 'vitest'

import {
  companyDocsHref,
  companyHomeHref,
  NUC_COMPANY_CONTACT_TYPES,
  NUC_COMPANY_COPY,
  NUC_COMPANY_GLANCE,
  NUC_COMPANY_SAVINGS,
  NUC_COMPANY_SECTIONS,
  NUC_COMPANY_SEO,
  NUC_COMPANY_SHELLS,
  NUC_COMPANY_SURFACE,
  NUC_COMPANY_THESIS,
} from '@web'

describe('company routes', () => {
  it('builds locale-prefixed product and docs paths', () => {
    expect(companyHomeHref('en')).toBe('/en/home')
    expect(companyDocsHref('pl')).toBe(
      'https://docs.nucleify.io/pl/docs/getting-started/introduction'
    )
  })
})

describe('company contact types', () => {
  it('keeps API-stable values with company labels', () => {
    expect(NUC_COMPANY_CONTACT_TYPES.map((item) => item.value)).toEqual([
      'business',
      'landing',
      'blog',
      'help',
    ])
    expect(NUC_COMPANY_CONTACT_TYPES[0]?.label).toMatch(/migration/i)
  })
})

describe('company pitch content', () => {
  it('covers six rail sections, seven emit shells, and four delivery surfaces', () => {
    expect(NUC_COMPANY_SECTIONS.map((s) => s.id)).toEqual([
      'intro',
      'thesis',
      'savings',
      'wedge',
      'surface',
      'ask',
    ])
    expect(NUC_COMPANY_SHELLS).toHaveLength(7)
    expect(NUC_COMPANY_SURFACE).toHaveLength(4)
    expect(
      NUC_COMPANY_SURFACE.every(
        (item) =>
          item.id &&
          item.index &&
          item.title &&
          item.outcome &&
          item.proof &&
          item.metric
      )
    ).toBe(true)
  })

  it('leads with migration-company delivery messaging', () => {
    expect(NUC_COMPANY_COPY.headline).toBe(
      'Charge the same migration fee.\nRewrite half the work.'
    )
    expect(NUC_COMPANY_COPY.support.toLowerCase()).toMatch(
      /client|typescript|shell|supabase/
    )
    expect(NUC_COMPANY_COPY.heroEyebrow).toMatch(/migration companies/i)
    expect(NUC_COMPANY_SEO.title).toMatch(/migration companies/i)
    expect(NUC_COMPANY_SEO.description.toLowerCase()).not.toMatch(/\$\d/)
  })

  it('frames keep metrics as product facts, not dollar forecasts', () => {
    expect(NUC_COMPANY_SAVINGS.map((item) => item.id)).toEqual([
      'shells',
      'runtime',
      'data',
    ])
    expect(NUC_COMPANY_SAVINGS.every((item) => !/\$/.test(item.value))).toBe(
      true
    )
    expect(NUC_COMPANY_COPY.savingsNote.toLowerCase()).toMatch(
      /product facts|not a forecast/
    )
  })

  it('keeps the intro glance on a product snapshot', () => {
    expect(
      `${NUC_COMPANY_GLANCE.figureLead}→${NUC_COMPANY_GLANCE.figureTrail}`
    ).toBe(NUC_COMPANY_GLANCE.figure)
    expect(NUC_COMPANY_GLANCE.from).toBe('7')
    expect(NUC_COMPANY_GLANCE.to).toBe('1')
    expect(NUC_COMPANY_GLANCE.figureLead).not.toMatch(/\$/)
    expect(NUC_COMPANY_GLANCE.note.toLowerCase()).toBe('product facts')
    expect(NUC_COMPANY_GLANCE.note.toLowerCase()).not.toMatch(/forecast/)
    expect(NUC_COMPANY_GLANCE.line.toLowerCase()).toMatch(
      /emit|backend|features/
    )
  })

  it('backs thesis cards with product proofs', () => {
    expect(NUC_COMPANY_THESIS).toHaveLength(3)
    expect(NUC_COMPANY_THESIS.map((item) => item.proof).join(' ')).toMatch(
      /shared_modules|supabase|land/i
    )
    expect(
      NUC_COMPANY_SURFACE.find((item) => item.id === 'timing')?.metric
    ).toBe('Wave timing')
  })
})

import { describe, expect, it } from 'vitest'

import {
  investorDocsHref,
  investorHomeHref,
  NUC_INVESTOR_CONTACT_TYPES,
  NUC_INVESTOR_COPY,
  NUC_INVESTOR_GLANCE,
  NUC_INVESTOR_SAVINGS,
  NUC_INVESTOR_SECTIONS,
  NUC_INVESTOR_SEO,
  NUC_INVESTOR_SHELLS,
  NUC_INVESTOR_SURFACE,
  NUC_INVESTOR_THESIS,
} from '@web'

describe('investor routes', () => {
  it('builds locale-prefixed product and docs paths', () => {
    expect(investorHomeHref('en')).toBe('/en/home')
    expect(investorDocsHref('pl')).toBe(
      'https://docs.nucleify.io/pl/docs/getting-started/introduction'
    )
  })
})

describe('investor contact types', () => {
  it('keeps API-stable values with investor labels', () => {
    expect(NUC_INVESTOR_CONTACT_TYPES.map((item) => item.value)).toEqual([
      'business',
      'landing',
      'blog',
      'help',
    ])
    expect(NUC_INVESTOR_CONTACT_TYPES[0]?.label).toMatch(/Investment/i)
  })
})

describe('investor pitch content', () => {
  it('covers six rail sections, seven emit shells, and four capital surfaces', () => {
    expect(NUC_INVESTOR_SECTIONS.map((s) => s.id)).toEqual([
      'intro',
      'thesis',
      'savings',
      'wedge',
      'surface',
      'ask',
    ])
    expect(NUC_INVESTOR_SHELLS).toHaveLength(7)
    expect(NUC_INVESTOR_SURFACE).toHaveLength(4)
    expect(
      NUC_INVESTOR_SURFACE.every(
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

  it('leads with investor capital messaging', () => {
    expect(NUC_INVESTOR_COPY.headline).toMatch(/rewrite|capital|burn/i)
    expect(NUC_INVESTOR_COPY.support.toLowerCase()).toMatch(
      /capital|supabase|shared modules|nucleus/
    )
    expect(NUC_INVESTOR_SEO.title).toMatch(/investors|framework/i)
    expect(NUC_INVESTOR_SEO.description.toLowerCase()).not.toMatch(/\$\d/)
  })

  it('frames keep metrics as product facts, not dollar forecasts', () => {
    expect(NUC_INVESTOR_SAVINGS.map((item) => item.id)).toEqual([
      'shells',
      'runtime',
      'data',
    ])
    expect(NUC_INVESTOR_SAVINGS.every((item) => !/\$/.test(item.value))).toBe(
      true
    )
    expect(NUC_INVESTOR_COPY.savingsNote.toLowerCase()).toMatch(
      /product facts|not a forecast/
    )
  })

  it('keeps the intro glance on a product snapshot', () => {
    expect(
      `${NUC_INVESTOR_GLANCE.figureLead}→${NUC_INVESTOR_GLANCE.figureTrail}`
    ).toBe(NUC_INVESTOR_GLANCE.figure)
    expect(NUC_INVESTOR_GLANCE.from).toBe('7')
    expect(NUC_INVESTOR_GLANCE.to).toBe('1')
    expect(NUC_INVESTOR_GLANCE.figureLead).not.toMatch(/\$/)
    expect(NUC_INVESTOR_GLANCE.note.toLowerCase()).toMatch(
      /product facts|not a financial forecast|not a forecast/
    )
  })

  it('backs thesis cards with product proofs', () => {
    expect(NUC_INVESTOR_THESIS).toHaveLength(3)
    expect(NUC_INVESTOR_THESIS.map((item) => item.proof).join(' ')).toMatch(
      /shared_modules|supabase|land/i
    )
    expect(
      NUC_INVESTOR_SURFACE.find((item) => item.id === 'timing')?.metric
    ).toBe('Wave timing')
  })
})

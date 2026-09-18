import { describe, expect, it } from 'vitest'

import {
  investorDocsHref,
  investorHomeHref,
  NUC_INVESTOR_CONTACT_TYPES,
  NUC_INVESTOR_SAVINGS,
  NUC_INVESTOR_SECTIONS,
  NUC_INVESTOR_SURFACE,
} from '../../src/pages/investor/constants/content'

describe('investor routes', () => {
  it('builds locale-prefixed product and docs paths', () => {
    expect(investorHomeHref('en')).toBe('/en/home')
    expect(investorDocsHref('pl')).toBe('/pl/docs/getting-started/introduction')
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
  it('covers six rail sections and seven emit shells', () => {
    expect(NUC_INVESTOR_SECTIONS.map((s) => s.id)).toEqual([
      'intro',
      'thesis',
      'savings',
      'moat',
      'surface',
      'ask',
    ])
    expect(NUC_INVESTOR_SURFACE).toHaveLength(7)
  })

  it('labels savings as a planning model, not audited financials', () => {
    expect(NUC_INVESTOR_SAVINGS.some((item) => item.id === 'dollars')).toBe(
      true
    )
    const dollars = NUC_INVESTOR_SAVINGS.find((item) => item.id === 'dollars')
    expect(dollars?.detail.toLowerCase()).toMatch(/not a forecast|blended/)
  })
})

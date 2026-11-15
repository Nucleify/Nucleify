import { describe, expect, it } from 'vitest'

import { coalesceBreakpointVisibility } from '../cms/merge_props'

const FALLBACK = {
  mobile: false,
  tablet: true,
  desktop: true,
} as const

describe('coalesceBreakpointVisibility', () => {
  it('uses fallback when override is missing', () => {
    expect(coalesceBreakpointVisibility(undefined, FALLBACK)).toEqual(FALLBACK)
  })

  it('maps legacy true to fallback and false to all off', () => {
    expect(coalesceBreakpointVisibility(true, FALLBACK)).toEqual(FALLBACK)
    expect(coalesceBreakpointVisibility(false, FALLBACK)).toEqual({
      mobile: false,
      tablet: false,
      desktop: false,
    })
  })

  it('merges partial objects onto fallback', () => {
    expect(
      coalesceBreakpointVisibility({ mobile: true, tablet: false }, FALLBACK)
    ).toEqual({
      mobile: true,
      tablet: false,
      desktop: true,
    })
  })
})

import { describe, expect, it } from 'vitest'

import {
  NUC_RAINBOW_CYCLE_DURATION,
  NUC_RAINBOW_HUE_INITIAL,
} from '../constants/rainbow'

describe('nuc_animations rainbow', () => {
  it('re-exports the nui-rainbow hue origin and default duration', () => {
    expect(NUC_RAINBOW_HUE_INITIAL).toBe('132deg')
    expect(NUC_RAINBOW_CYCLE_DURATION).toBe('60s')
  })
})

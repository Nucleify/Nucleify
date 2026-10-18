import { describe, expect, it } from 'vitest'

import {
  NUC_RAINBOW_CYCLE_DURATION,
  NUC_RAINBOW_HUE_ASTRO,
  NUC_RAINBOW_HUE_INITIAL,
  NUC_RAINBOW_HUE_REACT,
  NUC_RAINBOW_HUE_SVELTE,
  NUC_RAINBOW_HUE_VUE,
  NUC_RAINBOW_OFFSET_CYAN,
  NUC_RAINBOW_OFFSET_PURPLE,
} from '../constants/rainbow'

describe('nuc_animations rainbow', () => {
  it('exposes shell-brand hues and the nui-rainbow origin', () => {
    expect(NUC_RAINBOW_HUE_VUE).toBe('152deg')
    expect(NUC_RAINBOW_HUE_REACT).toBe('190deg')
    expect(NUC_RAINBOW_HUE_ASTRO).toBe('292deg')
    expect(NUC_RAINBOW_HUE_SVELTE).toBe('375deg')
    expect(NUC_RAINBOW_HUE_INITIAL).toBe(NUC_RAINBOW_HUE_VUE)
    expect(NUC_RAINBOW_OFFSET_CYAN).toBe('38deg')
    expect(NUC_RAINBOW_OFFSET_PURPLE).toBe('140deg')
    expect(NUC_RAINBOW_CYCLE_DURATION).toBe('60s')
  })
})

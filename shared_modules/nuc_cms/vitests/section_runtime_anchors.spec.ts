import { describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'

import { registerSection } from '../cms/registry'
import {
  railItemsFromSections,
  uniqueAnchorsBySectionId,
} from '../cms/section_runtime'

const Stub = defineComponent({ name: 'Stub', render: () => null })

describe('uniqueAnchorsBySectionId', () => {
  it('keeps canonical anchors for single instances', () => {
    const map = uniqueAnchorsBySectionId([
      { id: 'home-hero', type: 'section.hero', order: 0, props: {} },
      { id: 'home-pillars', type: 'section.pillars', order: 1, props: {} },
    ])
    expect(map.get('home-hero')).toBe('intro')
    expect(map.get('home-pillars')).toBe('architecture')
  })

  it('suffixes duplicate widget types for DOM anchors', () => {
    const map = uniqueAnchorsBySectionId([
      {
        id: 'a',
        type: 'section.pillars',
        order: 0,
        props: { railLabel: 'Ship' },
      },
      {
        id: 'b',
        type: 'section.close',
        order: 1,
        props: { railLabel: 'Contact' },
      },
      {
        id: 'c',
        type: 'section.pillars',
        order: 2,
        props: { railLabel: 'Ship' },
      },
    ])
    expect(map.get('a')).toBe('architecture')
    expect(map.get('b')).toBe('start')
    expect(map.get('c')).toBe('architecture-2')
  })

  it('keys rail items by CMS section id (not DOM anchor)', () => {
    registerSection({
      type: 'section.pillars',
      label: 'Pillars',
      webComponentKey: 'sections/pillars',
      propsSchema: {},
      component: Stub,
    })
    registerSection({
      type: 'section.close',
      label: 'Close',
      webComponentKey: 'sections/close',
      propsSchema: {},
      component: Stub,
    })
    const items = railItemsFromSections([
      {
        id: 'a',
        type: 'section.pillars',
        order: 0,
        props: { railLabel: 'Ship' },
      },
      {
        id: 'c',
        type: 'section.pillars',
        order: 1,
        props: { railLabel: 'Ship' },
      },
    ])
    expect(items.map((r) => r.id)).toEqual(['a', 'c'])
    expect(items.map((r) => r.label)).toEqual(['Ship', 'Ship'])
  })
})

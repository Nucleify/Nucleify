import { describe, expect, it } from 'vitest'

import {
  defaultSectionWidgets,
  SOLID_SYNC_SECTION_TYPES,
} from '../cms/default_section_widgets'
import {
  CMS_SECTION_EMIT,
  CMS_SECTION_EMIT_SOLID_LAZY,
  CMS_SECTION_EMIT_SOLID_SYNC,
  sectionBindName,
} from '../cms/section_emit_catalog'

describe('section_emit_catalog', () => {
  it('mirrors defaultSectionWidgets 1:1', () => {
    expect(CMS_SECTION_EMIT.map((e) => e.type)).toEqual(
      defaultSectionWidgets.map((w) => w.type)
    )
    for (const [i, w] of defaultSectionWidgets.entries()) {
      const row = CMS_SECTION_EMIT[i]
      expect(row.importPath).toBe(`../${w.webComponentKey}/index`)
      expect(row.bind).toBe(sectionBindName(w.webComponentKey))
    }
  })

  it('splits Solid sync vs lazy without gaps or overlap', () => {
    const syncTypes = CMS_SECTION_EMIT_SOLID_SYNC.map((e) => e.type)
    const lazyTypes = CMS_SECTION_EMIT_SOLID_LAZY.map((e) => e.type)
    expect(new Set(syncTypes)).toEqual(SOLID_SYNC_SECTION_TYPES)
    expect([...syncTypes, ...lazyTypes].sort()).toEqual(
      CMS_SECTION_EMIT.map((e) => e.type).sort()
    )
    expect(syncTypes.some((t) => lazyTypes.includes(t))).toBe(false)
  })

  it('binds thank_you and compiler_demo with PascalCase', () => {
    expect(sectionBindName('sections/thank_you')).toBe('ThankYouSection')
    expect(sectionBindName('sections/compiler_demo')).toBe(
      'CompilerDemoSection'
    )
  })
})

import { describe, expect, it } from 'vitest'

import { buildSearchText } from '../cms/activity'
import { getAdminConfig } from '../cms/admin_config'
import { getPostBlock, listPostBlockTypes } from '../cms/post_blocks'

describe('cms wordpress foundation', () => {
  it('exposes post body block types', () => {
    const types = listPostBlockTypes()
    expect(types).toContain('block.paragraph')
    expect(getPostBlock('block.cta')?.label).toBe('CTA')
  })

  it('includes SEO pack fields on pages', () => {
    const pages = getAdminConfig().collections.find((c) => c.slug === 'pages')
    const seo = pages?.fields.find(
      (f) => f.type === 'group' && 'name' in f && f.name === 'seo'
    )
    expect(seo && seo.type === 'group').toBe(true)
    if (seo && seo.type === 'group') {
      const names = seo.fields.map((f) => ('name' in f ? f.name : ''))
      expect(names).toContain('ogImage')
      expect(names).toContain('robots')
      expect(names).toContain('canonical')
    }
  })

  it('builds search text from nested props', () => {
    const text = buildSearchText([
      'Home',
      { sections: [{ props: { headline: 'Keep the product.' } }] },
    ])
    expect(text).toContain('Home')
    expect(text).toContain('Keep the product.')
  })

  it('pages expose chrome toggles with menu picks', () => {
    const pages = getAdminConfig().collections.find((c) => c.slug === 'pages')
    const names = (pages?.fields ?? []).map((f) => ('name' in f ? f.name : ''))
    expect(names).toContain('showMenu')
    expect(names).toContain('menuSlug')
    expect(names).toContain('showRail')
    expect(names).toContain('showShear')
    expect(names).toContain('showFooter')
    expect(names).toContain('footerMenuSlug')
    expect(names).toContain('footerTemplate')
    expect(names).toContain('template')
    const menu = (pages?.fields ?? []).find(
      (f) => 'name' in f && f.name === 'menuSlug'
    )
    expect(menu && 'relationTo' in menu && menu.relationTo).toBe('menus')
    expect(getAdminConfig().globals.map((g) => g.slug)).not.toContain(
      'settings'
    )
  })
})

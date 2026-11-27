import { describe, expect, it } from 'vitest'

import {
  FONT_PRELOAD_RAW,
  type HtmlRenderContext,
  injectFontPreloads,
  parseFontPreloadTags,
} from '../../src/server/utils/font_preloads'

describe('font_preloads server util', () => {
  it('returns empty array when raw placeholder is unreplaced', () => {
    expect(parseFontPreloadTags('__NUC_FONT_PRELOADS_JSON__')).toEqual([])
    expect(parseFontPreloadTags('__NUC_CUSTOM__')).toEqual([])
  })

  it('returns empty array for invalid JSON or non-array', () => {
    expect(parseFontPreloadTags('{ invalid: json }')).toEqual([])
    expect(parseFontPreloadTags('{"foo": "bar"}')).toEqual([])
  })

  it('parses valid font hrefs into preload link tags', () => {
    const urls = ['/_nuxt/font1.woff2', '/_nuxt/font2.woff2']
    const tags = parseFontPreloadTags(JSON.stringify(urls))

    expect(tags).toEqual([
      '<link rel="preload" as="font" type="font/woff2" href="/_nuxt/font1.woff2" crossorigin>',
      '<link rel="preload" as="font" type="font/woff2" href="/_nuxt/font2.woff2" crossorigin>',
    ])
  })

  it('limits preloads to MAX_PRELOADED_FONTS (4)', () => {
    const urls = [
      '/_nuxt/1.woff2',
      '/_nuxt/2.woff2',
      '/_nuxt/3.woff2',
      '/_nuxt/4.woff2',
      '/_nuxt/5.woff2',
      '/_nuxt/6.woff2',
    ]
    const tags = parseFontPreloadTags(JSON.stringify(urls))
    expect(tags).toHaveLength(4)
  })

  it('filters out non-string entries', () => {
    const mixed = ['/_nuxt/valid.woff2', 123, null, false]
    const tags = parseFontPreloadTags(JSON.stringify(mixed))
    expect(tags).toEqual([
      '<link rel="preload" as="font" type="font/woff2" href="/_nuxt/valid.woff2" crossorigin>',
    ])
  })

  it('has valid default FONT_PRELOAD_RAW constant', () => {
    expect(FONT_PRELOAD_RAW).toBe('__NUC_FONT_PRELOADS_JSON__')
  })

  it('injectFontPreloads does not fail on context without tags', () => {
    const html: HtmlRenderContext = { head: ['<meta charset="utf-8">'] }
    injectFontPreloads(html)
    expect(html.head.length).toBeGreaterThanOrEqual(1)
  })
})

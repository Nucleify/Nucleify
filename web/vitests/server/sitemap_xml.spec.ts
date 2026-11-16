import type { H3Event } from 'h3'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import handler, {
  buildSitemapXml,
  escapeXml,
  formatLastmod,
  getLocaleFallbackUrls,
  resolveSiteOrigin,
} from '../../src/server/routes/sitemap.xml'

describe('sitemap.xml server route', () => {
  describe('escapeXml', () => {
    it('escapes special XML characters', () => {
      const input = 'https://nucleify.io/page?a=1&b=2<test>"quote"\'apos\''
      const escaped = escapeXml(input)
      expect(escaped).toBe(
        'https://nucleify.io/page?a=1&amp;b=2&lt;test&gt;&quot;quote&quot;&apos;apos&apos;'
      )
    })

    it('returns clean string unchanged', () => {
      expect(escapeXml('https://nucleify.io/en/home')).toBe(
        'https://nucleify.io/en/home'
      )
    })
  })

  describe('formatLastmod', () => {
    it('formats valid Date instances and ISO strings', () => {
      const date = new Date('2026-01-15T10:00:00.000Z')
      expect(formatLastmod(date)).toBe(
        '<lastmod>2026-01-15T10:00:00.000Z</lastmod>'
      )
      expect(formatLastmod('2026-01-15T10:00:00.000Z')).toBe(
        '<lastmod>2026-01-15T10:00:00.000Z</lastmod>'
      )
    })

    it('returns empty string for null, undefined, or invalid dates', () => {
      expect(formatLastmod(null)).toBe('')
      expect(formatLastmod(undefined)).toBe('')
      expect(formatLastmod('')).toBe('')
      expect(formatLastmod('invalid-date-string')).toBe('')
    })
  })

  describe('getLocaleFallbackUrls', () => {
    it('returns standard fallback URLs for requested locale', () => {
      const urls = getLocaleFallbackUrls('pl')
      expect(urls).toHaveLength(3)
      expect(urls.map((u) => u.path)).toEqual([
        '/pl/home',
        '/pl/investor',
        '/pl/blog',
      ])
    })
  })

  describe('resolveSiteOrigin', () => {
    it('falls back to default origin when no env or config present', () => {
      const orig = process.env.NUXT_PUBLIC_SITE_URL
      delete process.env.NUXT_PUBLIC_SITE_URL
      delete process.env.SITE_URL

      const origin = resolveSiteOrigin()
      expect(origin).toBe('https://nucleify.io')

      if (orig) process.env.NUXT_PUBLIC_SITE_URL = orig
    })

    it('uses env variable if configured and strips trailing slashes', () => {
      const orig = process.env.NUXT_PUBLIC_SITE_URL
      process.env.NUXT_PUBLIC_SITE_URL = 'https://custom.nucleify.io///'

      const origin = resolveSiteOrigin()
      expect(origin).toBe('https://custom.nucleify.io')

      if (orig) {
        process.env.NUXT_PUBLIC_SITE_URL = orig
      } else {
        delete process.env.NUXT_PUBLIC_SITE_URL
      }
    })
  })

  describe('buildSitemapXml', () => {
    it('generates well-formed sitemap XML', () => {
      const xml = buildSitemapXml(
        [
          {
            path: '/en/home',
            updated_at: '2026-01-01T00:00:00.000Z',
            changefreq: 'daily',
            priority: 1.0,
          },
          {
            path: '/en/investor',
          },
        ],
        'https://nucleify.io/'
      )

      expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>')
      expect(xml).toContain(
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
      )
      expect(xml).toContain('<loc>https://nucleify.io/en/home</loc>')
      expect(xml).toContain('<lastmod>2026-01-01T00:00:00.000Z</lastmod>')
      expect(xml).toContain('<changefreq>daily</changefreq>')
      expect(xml).toContain('<priority>1.0</priority>')
      expect(xml).toContain('<loc>https://nucleify.io/en/investor</loc>')
    })
  })

  describe('handler integration', () => {
    beforeEach(() => {
      // Mock global $fetch to simulate failed or empty DB call (fallback)
      vi.stubGlobal(
        '$fetch',
        vi.fn().mockRejectedValue(new Error('Supabase not configured'))
      )
    })

    it('generates multi-locale sitemap when no locale query passed', async () => {
      const headers: Record<string, string> = {}
      const event = {
        node: {
          res: {
            setHeader: (k: string, v: string) => {
              headers[k.toLowerCase()] = v
            },
          },
        },
      } as unknown as H3Event

      const xml = await handler(event)

      expect(typeof xml).toBe('string')
      expect(xml).toContain('<loc>https://nucleify.io/</loc>')
      expect(xml).toContain('<loc>https://nucleify.io/en/home</loc>')
      expect(xml).toContain('<loc>https://nucleify.io/pl/home</loc>')
      expect(xml).toContain('<loc>https://nucleify.io/vn/home</loc>')
      expect(headers['content-type']).toBe('application/xml; charset=utf-8')
      expect(headers['cache-control']).toContain('public, max-age=3600')
    })

    it('generates specific locale sitemap when ?locale=pl is provided', async () => {
      const event = {
        node: {
          req: { url: '/sitemap.xml?locale=pl' },
          res: { setHeader: vi.fn() },
        },
        path: '/sitemap.xml?locale=pl',
      } as unknown as H3Event

      const xml = await handler(event)

      expect(xml).toContain('<loc>https://nucleify.io/pl/home</loc>')
      expect(xml).toContain('<loc>https://nucleify.io/pl/investor</loc>')
      expect(xml).not.toContain('<loc>https://nucleify.io/en/home</loc>')
    })
  })
})

import { useAsyncData } from 'nuxt/app'
import { type ComputedRef, computed, type Ref } from 'vue'

import {
  CMS_CANONICAL_PAGE_SLUGS,
  defaultSectionsForSlug,
  defaultSeoForSlug,
  type PageSection,
} from '../cms/default_pages'
import { footerTemplateForPageSlug } from '../cms/defaults/footer'

export type PublicPagePayload = {
  id?: string
  slug: string
  locale: string
  title: string
  version: number
  sections: PageSection[]
  seo?: {
    title?: string
    description?: string
    shareTitle?: string
    ogImage?: string
    canonical?: string
    robots?: string
  } | null
  /** When false, skip iris wipe on shell boot (admin layout field). */
  enableIris?: boolean
  showMenu?: boolean
  menuSlug?: string
  showRail?: boolean
  showShear?: boolean
  showFooter?: boolean
  footerMenuSlug?: string
  footerTemplate?: string
  /** Page frame template id (`rail` / `bare` / …). */
  template?: string
  /** cms = published doc; fallback = canonical hardcoded; missing = no page → home */
  source: 'cms' | 'fallback' | 'missing'
}

type PublicPageApiBody = {
  data?: {
    id?: string
    slug?: string
    locale?: string
    title?: string
    version?: number
    sections?: PageSection[]
    seo?: PublicPagePayload['seo']
    enableIris?: boolean
    showMenu?: boolean
    menuSlug?: string
    showRail?: boolean
    showShear?: boolean
    showFooter?: boolean
    footerMenuSlug?: string
    footerTemplate?: string
    template?: string
  }
}

const CANONICAL = new Set<string>(CMS_CANONICAL_PAGE_SLUGS)
const CANONICAL_LOCALES = new Set(['en', 'pl', 'vn'])

function normalizeSections(raw: unknown): PageSection[] {
  if (!Array.isArray(raw)) return []
  return raw
    .filter((item): item is Record<string, unknown> =>
      Boolean(item && typeof item === 'object' && !Array.isArray(item))
    )
    .map((item, index) => ({
      id: String(item.id ?? `section-${index}`),
      type: String(item.type ?? ''),
      order: Number(item.order ?? index),
      props:
        item.props &&
        typeof item.props === 'object' &&
        !Array.isArray(item.props)
          ? (item.props as Record<string, unknown>)
          : {},
    }))
    .filter((s) => Boolean(s.type))
}

function fallbackSeo(slug: string): PublicPagePayload['seo'] {
  return defaultSeoForSlug(slug)
}

function fallbackPage(slug: string, locale: string): PublicPagePayload {
  const seo = fallbackSeo(slug)
  return {
    slug,
    locale,
    title: seo?.title || slug,
    version: 1,
    sections: defaultSectionsForSlug(slug),
    seo,
    footerTemplate: footerTemplateForPageSlug(slug),
    source: 'fallback',
  }
}

function missingPage(slug: string, locale: string): PublicPagePayload {
  return {
    slug,
    locale,
    title: slug,
    version: 0,
    sections: [],
    seo: null,
    source: 'missing',
  }
}

function isCanonicalSlug(slug: string): boolean {
  return CANONICAL.has(slug)
}

/**
 * Load a published CMS page for SSR / prerender.
 * Canonical marketing slugs fall back to hardcoded layouts when the API is down.
 * Other slugs: CMS hit → render; miss → `source: 'missing'` (shell redirects home).
 *
 * Sync composable: call Nuxt helpers (SEO, etc.) before `await ready`.
 */
export function usePublicPage(
  slug: Ref<string> | ComputedRef<string> | string,
  locale: Ref<string> | ComputedRef<string> | string
) {
  const slugValue = () => (typeof slug === 'string' ? slug : slug.value)
  const localeValue = () => (typeof locale === 'string' ? locale : locale.value)

  const watchSources = [
    ...(typeof slug === 'string' ? [] : [slug]),
    ...(typeof locale === 'string' ? [] : [locale]),
  ]

  // Thenable AsyncData — do not await here so callers can register other
  // Nuxt composables before the fetch settles (Workers drop ALS after await).
  const asyncData = useAsyncData(
    `public-page:${slugValue()}:${localeValue()}`,
    async (): Promise<PublicPagePayload> => {
      const s = slugValue()
      const rawLoc = localeValue() || 'en'
      // Unknown pseudo-locales 404 at the API (~600ms+) then fall back — skip
      // the round-trip so shell sections are not painted late.
      const loc = CANONICAL_LOCALES.has(rawLoc) ? rawLoc : 'en'
      if (!s) return missingPage(s, loc)
      if (!CANONICAL_LOCALES.has(rawLoc)) {
        return isCanonicalSlug(s)
          ? fallbackPage(s, loc)
          : missingPage(s, rawLoc)
      }

      try {
        const body = await $fetch<PublicPageApiBody>(
          `/api/public/pages/${encodeURIComponent(s)}`,
          { query: { locale: loc } }
        )
        const page = body?.data
        if (!page) {
          return isCanonicalSlug(s) ? fallbackPage(s, loc) : missingPage(s, loc)
        }
        // Empty sections is valid (e.g. all hidden) — do not fall back to defaults.
        return {
          id: page.id,
          slug: page.slug || s,
          locale: page.locale || loc,
          title: page.title || s,
          version: Number(page.version ?? 1),
          sections: normalizeSections(page.sections),
          seo: page.seo ?? null,
          enableIris: page.enableIris !== false,
          showMenu: page.showMenu === true,
          menuSlug: String(page.menuSlug || 'primary').trim() || 'primary',
          showRail: page.showRail !== false,
          showShear: page.showShear !== false,
          showFooter: page.showFooter !== false,
          footerMenuSlug: String(page.footerMenuSlug || '').trim(),
          footerTemplate:
            String(page.footerTemplate || '').trim() ||
            footerTemplateForPageSlug(page.slug || s),
          template: String(page.template || 'rail').trim() || 'rail',
          source: 'cms',
        }
      } catch {
        // Canonical marketing pages keep hardcoded layouts when API is down / 404.
        // Custom CMS slugs without a published doc → missing (shell → home).
        return isCanonicalSlug(s) ? fallbackPage(s, loc) : missingPage(s, loc)
      }
    },
    {
      watch: watchSources,
      default: () => {
        const s = slugValue()
        const loc = localeValue() || 'en'
        return isCanonicalSlug(s) ? fallbackPage(s, loc) : missingPage(s, loc)
      },
    }
  )

  const page = computed(
    () =>
      asyncData.data.value ??
      (isCanonicalSlug(slugValue())
        ? fallbackPage(slugValue(), localeValue() || 'en')
        : missingPage(slugValue(), localeValue() || 'en'))
  )

  return {
    page,
    pending: asyncData.pending,
    error: asyncData.error,
    refresh: asyncData.refresh,
    ready: asyncData,
  }
}

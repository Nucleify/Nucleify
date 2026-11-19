import { useAsyncData } from 'nuxt/app'
import { type ComputedRef, computed, type Ref, unref } from 'vue'

export type PublicMenuItem = {
  label: string
  href: string
  children?: PublicMenuItem[]
}

export type PublicMenuPayload = {
  slug: string
  locale: string
  label: string
  items: PublicMenuItem[]
  source: 'cms' | 'missing'
}

function normalizeItems(raw: unknown): PublicMenuItem[] {
  if (!Array.isArray(raw)) return []
  const out: PublicMenuItem[] = []
  for (const row of raw) {
    if (!row || typeof row !== 'object' || Array.isArray(row)) continue
    const item = row as Record<string, unknown>
    const label = String(item.label || '').trim()
    const href = String(item.href || item.url || '').trim()
    if (!label || !href) continue
    const children = normalizeItems(item.children)
    out.push(children.length ? { label, href, children } : { label, href })
  }
  return out
}

function slugOf(value: Ref<string> | ComputedRef<string> | string): string {
  return typeof value === 'string' ? value : unref(value)
}

/**
 * Load a published cms_menus entry for the public shell.
 */
export function usePublicMenu(
  slug: Ref<string> | ComputedRef<string> | string,
  locale: Ref<string> | ComputedRef<string> | string = 'en'
) {
  const slugValue = () => slugOf(slug).trim()
  const localeValue = () => slugOf(locale).trim() || 'en'

  const watchSources = [
    ...(typeof slug === 'string' ? [] : [slug]),
    ...(typeof locale === 'string' ? [] : [locale]),
  ]

  const asyncData = useAsyncData(
    () => `public-menu:${slugValue()}:${localeValue()}`,
    async (): Promise<PublicMenuPayload> => {
      const s = slugValue()
      const loc = localeValue()
      if (!s) {
        return {
          slug: '',
          locale: loc,
          label: '',
          items: [],
          source: 'missing',
        }
      }
      try {
        const body = await $fetch<{
          data?: {
            slug?: string
            locale?: string
            label?: string
            items?: unknown
            source?: string
          }
        }>(`/api/public/menus/${encodeURIComponent(s)}`, {
          query: { locale: loc },
        })
        const items = normalizeItems(body?.data?.items)
        return {
          slug: body?.data?.slug || s,
          locale: body?.data?.locale || loc,
          label: String(body?.data?.label || s),
          items,
          source: body?.data?.source === 'cms' ? 'cms' : 'missing',
        }
      } catch {
        return { slug: s, locale: loc, label: s, items: [], source: 'missing' }
      }
    },
    {
      watch: watchSources,
      default: () => ({
        slug: slugValue(),
        locale: localeValue(),
        label: '',
        items: [] as PublicMenuItem[],
        source: 'missing' as const,
      }),
    }
  )

  const menu = computed(
    () =>
      asyncData.data.value ?? {
        slug: slugValue(),
        locale: localeValue(),
        label: '',
        items: [] as PublicMenuItem[],
        source: 'missing' as const,
      }
  )

  return { menu, pending: asyncData.pending, ready: asyncData }
}

import { useAsyncData } from 'nuxt/app'
import { type ComputedRef, computed, type Ref } from 'vue'

export type PublicGlobalPayload = {
  slug: string
  locale: string
  data: Record<string, unknown>
  source: 'cms' | 'missing'
}

export function usePublicGlobal(
  slug: Ref<string> | ComputedRef<string> | string,
  locale: Ref<string> | ComputedRef<string> | string = 'en'
) {
  const slugValue = () => (typeof slug === 'string' ? slug : slug.value)
  const localeValue = () => (typeof locale === 'string' ? locale : locale.value)

  const asyncData = useAsyncData(
    `public-global:${slugValue()}:${localeValue()}`,
    async (): Promise<PublicGlobalPayload> => {
      const s = slugValue()
      const loc = localeValue() || 'en'
      try {
        const body = await $fetch<{
          data?: {
            slug?: string
            locale?: string
            data?: Record<string, unknown>
            source?: string
          }
        }>(`/api/public/globals/${encodeURIComponent(s)}`, {
          query: { locale: loc },
        })
        return {
          slug: body?.data?.slug || s,
          locale: body?.data?.locale || loc,
          data:
            body?.data?.data && typeof body.data.data === 'object'
              ? body.data.data
              : {},
          source: body?.data?.source === 'cms' ? 'cms' : 'missing',
        }
      } catch {
        return { slug: s, locale: loc, data: {}, source: 'missing' }
      }
    },
    {
      default: () => ({
        slug: slugValue(),
        locale: localeValue() || 'en',
        data: {},
        source: 'missing' as const,
      }),
    }
  )

  const global = computed(
    () =>
      asyncData.data.value ?? {
        slug: slugValue(),
        locale: localeValue() || 'en',
        data: {},
        source: 'missing' as const,
      }
  )

  return { global, pending: asyncData.pending, ready: asyncData }
}

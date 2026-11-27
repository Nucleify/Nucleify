import { navigateTo, useNuxtApp, useRoute, useSeoMeta } from 'nuxt/app'
import { type ComputedRef, computed, type Ref, unref, watch } from 'vue'

import { type FrameVariant, useFramePage } from './use_frame_page'
import { type PublicPagePayload, usePublicPage } from './use_public_page'

import { defaultSeoForSlug } from '../cms/default_pages'
import { DEFAULT_OG_IMAGE } from '../cms/defaults/marketing_props'

const SITE_ORIGIN = 'https://nucleify.io'

const VARIANT_BY_SLUG: Record<string, FrameVariant> = {
  home: 'product',
  investor: 'pitch',
  'migrations-company': 'pitch',
  'thank-you': 'thankYou',
}

function slugOf(slug: Ref<string> | ComputedRef<string> | string): string {
  return typeof slug === 'string' ? slug : unref(slug)
}

function seoFallback(slug: string): {
  title: string
  description: string
  ogImage: string
  robots: string
} {
  return (
    defaultSeoForSlug(slug) ?? {
      title: 'Page',
      description: '',
      ogImage: DEFAULT_OG_IMAGE,
      robots: 'index,follow',
    }
  )
}

function pageTitle(page: PublicPagePayload, slug: string): string {
  return page.seo?.title || page.title || seoFallback(slug).title
}

function pageDescription(page: PublicPagePayload, slug: string): string {
  return page.seo?.description || seoFallback(slug).description
}

/**
 * Load a public CMS page into the marketing frame + SEO.
 * Known marketing slugs pin shell variant; SEO prefers admin fields.
 *
 * All Nuxt composables run before `await ready` — Workers drop request ALS
 * inside nested async composables (unlike top-level `<script setup>` awaits).
 */
export async function usePublicFramePage(
  slug: Ref<string> | ComputedRef<string> | string
) {
  const route = useRoute()
  const nuxtApp = useNuxtApp()
  const lang = computed(() => String(route.params.lang || 'en'))
  const slugValue = computed(() => slugOf(slug))

  const frame = useFramePage()
  const { page, pending, error, refresh, ready } = usePublicPage(slug, lang)

  const seoUrl = computed(
    () => `${SITE_ORIGIN}/${lang.value}/${slugValue.value}`
  )

  useSeoMeta({
    title: () => pageTitle(page.value, slugValue.value),
    description: () => pageDescription(page.value, slugValue.value),
    ogTitle: () =>
      page.value.seo?.shareTitle || pageTitle(page.value, slugValue.value),
    ogDescription: () => pageDescription(page.value, slugValue.value),
    ogType: 'website',
    ogUrl: () => page.value.seo?.canonical || seoUrl.value,
    ogImage: () =>
      page.value.seo?.ogImage || seoFallback(slugValue.value).ogImage,
    twitterCard: 'summary',
    twitterTitle: () =>
      page.value.seo?.shareTitle || pageTitle(page.value, slugValue.value),
    twitterDescription: () => pageDescription(page.value, slugValue.value),
    twitterImage: () =>
      page.value.seo?.ogImage || seoFallback(slugValue.value).ogImage,
    robots: () => page.value.seo?.robots || seoFallback(slugValue.value).robots,
  })

  const redirectHome = () =>
    navigateTo(`/${lang.value}/home`, {
      replace: true,
      redirectCode: 302,
    })

  const applyFrame = () => {
    const s = slugValue.value
    if (page.value.source === 'missing') {
      // Keep a pending shell while the first fetch runs — otherwise SSR
      // paints an empty shell and never picks up CMS sections after await.
      frame.value = {
        sections: [],
        railAriaLabel: 'Sections',
        variant: 'auto',
        pending: pending.value,
        template: page.value.template || 'rail',
        enableIris: page.value.enableIris !== false,
        showMenu: page.value.showMenu === true,
        menuSlug: page.value.menuSlug || 'primary',
        showRail: page.value.showRail !== false,
        showShear: page.value.showShear !== false,
        showFooter: page.value.showFooter !== false,
        footerMenuSlug: page.value.footerMenuSlug || '',
        footerTemplate: page.value.footerTemplate || 'home',
      }
      return
    }
    frame.value = {
      sections: page.value.sections,
      railAriaLabel: 'Sections',
      variant: VARIANT_BY_SLUG[s] ?? 'auto',
      pending: pending.value && page.value.sections.length === 0,
      template: page.value.template || 'rail',
      enableIris: page.value.enableIris !== false,
      showMenu: page.value.showMenu === true,
      menuSlug: page.value.menuSlug || 'primary',
      showRail: page.value.showRail !== false,
      showShear: page.value.showShear !== false,
      showFooter: page.value.showFooter !== false,
      footerMenuSlug: page.value.footerMenuSlug || '',
      footerTemplate: page.value.footerTemplate || 'home',
    }
  }

  watch(
    [page, pending, slugValue, lang],
    () => {
      if (page.value.source === 'missing' && !pending.value) {
        void nuxtApp.runWithContext(redirectHome)
        return
      }
      applyFrame()
    },
    { immediate: true }
  )

  await ready

  // Watch alone is not enough on CF Workers SSR — flush after fetch settles.
  if (page.value.source === 'missing') {
    await nuxtApp.runWithContext(redirectHome)
  } else {
    applyFrame()
  }

  return { page, pending, error, refresh, lang, slug: slugValue }
}

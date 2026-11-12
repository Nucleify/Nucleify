import { navigateTo, useNuxtApp, useRoute, useSeoMeta } from 'nuxt/app'
import { type ComputedRef, computed, type Ref, unref, watch } from 'vue'

import { type PublicPagePayload, usePublicPage } from './use_public_page'
import { type ShellVariant, useShellPage } from './use_shell_page'

import {
  COMPANY_PAGE_SEO,
  HOME_PAGE_SEO,
  INVESTOR_PAGE_SEO,
  THANK_YOU_PAGE_SEO,
} from '@shared_modules'

const OG_IMAGE = 'https://nucleify.io/img/og-image.png'
const SITE_ORIGIN = 'https://nucleify.io'

const VARIANT_BY_SLUG: Record<string, ShellVariant> = {
  home: 'product',
  investor: 'pitch',
  'migrations-company': 'pitch',
  'thank-you': 'thankYou',
}

const SEO_FALLBACK_BY_SLUG: Record<
  string,
  { title: string; description: string }
> = {
  home: HOME_PAGE_SEO,
  investor: INVESTOR_PAGE_SEO,
  'migrations-company': COMPANY_PAGE_SEO,
  'thank-you': THANK_YOU_PAGE_SEO,
}

function slugOf(slug: Ref<string> | ComputedRef<string> | string): string {
  return typeof slug === 'string' ? slug : unref(slug)
}

function seoFallback(slug: string): { title: string; description: string } {
  return (
    SEO_FALLBACK_BY_SLUG[slug] ?? {
      title: 'Page',
      description: '',
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
 * Load a public CMS page into the marketing shell + SEO.
 * Known marketing slugs pin shell variant; SEO prefers admin fields.
 *
 * All Nuxt composables run before `await ready` — Workers drop request ALS
 * inside nested async composables (unlike top-level `<script setup>` awaits).
 */
export async function usePublicShellPage(
  slug: Ref<string> | ComputedRef<string> | string
) {
  const route = useRoute()
  const nuxtApp = useNuxtApp()
  const lang = computed(() => String(route.params.lang || 'en'))
  const slugValue = computed(() => slugOf(slug))

  const shell = useShellPage()
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
    ogImage: () => page.value.seo?.ogImage || OG_IMAGE,
    twitterCard: 'summary',
    twitterTitle: () =>
      page.value.seo?.shareTitle || pageTitle(page.value, slugValue.value),
    twitterDescription: () => pageDescription(page.value, slugValue.value),
    twitterImage: () => page.value.seo?.ogImage || OG_IMAGE,
    robots: () =>
      page.value.seo?.robots ||
      (slugValue.value === 'thank-you' ? 'noindex, follow' : 'index, follow'),
  })

  const redirectHome = () =>
    navigateTo(`/${lang.value}/home`, {
      replace: true,
      redirectCode: 302,
    })

  const applyShell = () => {
    const s = slugValue.value
    if (page.value.source === 'missing') {
      // Keep a pending shell while the first fetch runs — otherwise SSR
      // paints an empty shell and never picks up CMS sections after await.
      shell.value = {
        sections: [],
        railAriaLabel: 'Sections',
        variant: 'auto',
        pending: pending.value,
        enableIris: page.value.enableIris !== false,
        template: page.value.template || 'default',
      }
      return
    }
    shell.value = {
      sections: page.value.sections,
      railAriaLabel: 'Sections',
      variant: VARIANT_BY_SLUG[s] ?? 'auto',
      pending: pending.value && page.value.sections.length === 0,
      enableIris: page.value.enableIris !== false,
      template: page.value.template || 'default',
    }
  }

  watch(
    [page, pending, slugValue, lang],
    () => {
      if (page.value.source === 'missing' && !pending.value) {
        void nuxtApp.runWithContext(redirectHome)
        return
      }
      applyShell()
    },
    { immediate: true }
  )

  await ready

  // Watch alone is not enough on CF Workers SSR — flush after fetch settles.
  if (page.value.source === 'missing') {
    await nuxtApp.runWithContext(redirectHome)
  } else {
    applyShell()
  }

  return { page, pending, error, refresh, lang, slug: slugValue }
}

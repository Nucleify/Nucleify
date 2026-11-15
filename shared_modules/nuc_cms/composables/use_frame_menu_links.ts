import { useRoute } from 'nuxt/app'
import { type ComputedRef, computed } from 'vue'

import { useFramePage } from './use_frame_page'
import { usePublicGlobal } from './use_public_globals'
import { usePublicMenu } from './use_public_menu'

import {
  FOOTER_SEPARATOR_DOT,
  type FooterSeparatorId,
  type FooterTemplateId,
  footerTemplateForPageSlug,
  isFooterTemplateId,
  normalizeFooterGlobalData,
  resolveFooterTemplateData,
} from '../cms/defaults/footer'

export type ShellMenuLink = { label: string; href: string }

/**
 * Resolve footer chrome for the current shell page.
 * Links: page footer menu → selected footer template links → built-in defaults.
 */
export function useFrameFooterLinks(): {
  links: ComputedRef<ShellMenuLink[]>
  brand: ComputedRef<string>
  separator: ComputedRef<FooterSeparatorId>
  template: ComputedRef<FooterTemplateId>
  pending: ComputedRef<boolean>
} {
  const route = useRoute()
  const frame = useFramePage()
  const lang = computed(() => String(route.params.lang || 'en'))
  const pageSlug = computed(() => String(route.params.slug || ''))
  const { global: footer } = usePublicGlobal('footer', lang)

  const footerData = computed(() =>
    normalizeFooterGlobalData(
      footer.value.data as Record<string, unknown>,
      lang.value
    )
  )

  const template = computed((): FooterTemplateId => {
    const fromPage = String(frame.value.footerTemplate || '').trim()
    if (isFooterTemplateId(fromPage)) return fromPage
    return footerTemplateForPageSlug(pageSlug.value)
  })

  const resolvedSlug = computed(() => {
    const fromPage = String(frame.value.footerMenuSlug || '').trim()
    if (fromPage) return fromPage
    return String(footerData.value.menuSlug || '').trim()
  })

  const { menu, pending } = usePublicMenu(resolvedSlug, lang)

  const pack = computed(() =>
    resolveFooterTemplateData(footerData.value, template.value, lang.value)
  )

  const links = computed(() => {
    const fromMenu = menu.value.items.map((item) => ({
      label: item.label,
      href: item.href,
    }))
    if (fromMenu.length) return fromMenu
    return pack.value.links
  })

  const brand = computed(() => pack.value.brand)
  const separator = computed(
    (): FooterSeparatorId => pack.value.separator || FOOTER_SEPARATOR_DOT
  )

  return {
    links,
    brand,
    separator,
    template,
    pending: computed(() => Boolean(pending.value)),
  }
}

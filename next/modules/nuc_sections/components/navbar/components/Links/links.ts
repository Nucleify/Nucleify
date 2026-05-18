import type { NucNavLinkInterface } from 'nucleify'

type NavbarTranslate = (key: string) => string

export function getNavLinks(
  lang: string,
  t: NavbarTranslate
): NucNavLinkInterface[] {
  return [
    {
      label: t('nav-home'),
      href: `/${lang}/home`,
    },
    {
      label: t('nav-offer'),
      href: `/${lang}/offer`,
    },
    {
      label: t('nav-docs'),
      href: `/${lang}/docs/getting-started/introduction`,
    },
    {
      label: t('nav-login'),
      href: `/${lang}/login`,
      isButton: true,
      class: 'login-button',
    },
  ]
}

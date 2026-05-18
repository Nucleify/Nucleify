export type FooterItem = {
  name: string
  url: string
  header?: boolean
}

export type FooterTranslate = (key: string) => string

export function getColumns(lang: string, t: FooterTranslate): FooterItem[][] {
  const b = `/${lang}`

  return [
    [
      { name: t('footer-services'), header: true, url: `${b}/services` },
      {
        name: t('footer-business-websites'),
        url: `${b}/services/business-websites`,
      },
      { name: t('footer-ecommerce'), url: `${b}/services/ecommerce-stores` },
      { name: t('footer-landing-pages'), url: `${b}/services/landing-pages` },
      {
        name: t('footer-website-redesign'),
        url: `${b}/services/website-redesign`,
      },
      {
        name: t('footer-custom-projects'),
        url: `${b}/services/custom-projects`,
      },
    ],
    [
      { name: t('footer-company'), header: true, url: `#${lang}/home` },
      { name: t('footer-about'), url: `${b}/about-us#start` },
      { name: t('footer-process'), url: `${b}/process` },
      { name: t('footer-contact'), url: '#contact' },
      { name: t('footer-faq'), url: '#faq' },
    ],
    [
      {
        name: t('footer-legal'),
        header: true,
        url: `${b}/legal/privacy-policy`,
      },
      { name: t('footer-privacy-policy'), url: `${b}/legal/privacy-policy` },
      { name: t('footer-terms'), url: `${b}/legal/terms-of-service` },
      { name: t('footer-cookies'), url: `${b}/legal/cookies` },
      { name: t('footer-gdpr'), url: `${b}/legal/gdpr` },
    ],
  ]
}

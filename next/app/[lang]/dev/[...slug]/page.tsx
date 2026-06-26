'use client'

import { useParams } from 'next/navigation'
import type { ComponentType, JSX } from 'react'

import {
  DEV_PAGE_MAP,
  NucAboutUsPage,
  NucBusinessWebsitesPage,
  NucCookiesPage,
  NucCustomProjectsPage,
  NucEcommerceStoresPage,
  NucError404Page,
  NucGDPRPage,
  NucLandingPagesPage,
  NucOfferPage,
  NucPrivacyPolicyPage,
  NucProcessPage,
  NucServicesPage,
  NucTermsOfServicePage,
  NucWebsiteRedesignPage,
} from 'nucleify'

const DEV_PAGE_COMPONENTS: Record<string, ComponentType> = {
  offer: NucOfferPage,
  'about-us': NucAboutUsPage,
  'process-page': NucProcessPage,
  services: NucServicesPage,
  'business-websites': NucBusinessWebsitesPage,
  'ecommerce-stores': NucEcommerceStoresPage,
  'landing-pages': NucLandingPagesPage,
  'website-redesign': NucWebsiteRedesignPage,
  'custom-projects': NucCustomProjectsPage,
  'privacy-policy': NucPrivacyPolicyPage,
  'terms-of-service': NucTermsOfServicePage,
  cookies: NucCookiesPage,
  gdpr: NucGDPRPage,
}

export default function DevPreviewPage(): JSX.Element {
  const params = useParams()
  const slugParts = params?.slug
  const slug = Array.isArray(slugParts)
    ? slugParts.join('/')
    : String(slugParts ?? '')

  const entry = DEV_PAGE_MAP[slug]
  if (!entry) {
    return <NucError404Page />
  }

  const Page = DEV_PAGE_COMPONENTS[entry.id]
  if (!Page) {
    return <NucError404Page />
  }

  return (
    <div id={entry.id}>
      <Page />
    </div>
  )
}

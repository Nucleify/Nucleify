'use client'

import type { JSX } from 'react'

import {
  AdIcon,
  NucSectionContact,
  NucSectionFaq,
  NucShinyBadge,
  NucTrustBadges,
  t,
} from 'nucleify'

import './_index.scss'

export function NucOfferPage(): JSX.Element {
  const heroFeatures = [
    { icon: 'mdi:shield-check', label: t('offer-trust-moneyback') },
    { icon: 'mdi:clock-fast', label: t('offer-trust-delivery') },
    { icon: 'mdi:headset', label: t('offer-trust-consultation') },
  ]

  return (
    <div className="offer-container">
      <section className="offer-hero">
        <div className="offer-hero-content container">
          <NucShinyBadge icon="mdi:rocket-launch" label={t('offer-badge')} />
          <h1 className="offer-hero-title">
            {t('offer-title')}
            <span className="offer-hero-title-highlight">
              {t('offer-title-highlight')}
            </span>
          </h1>
          <p className="offer-hero-subtitle">{t('offer-subtitle')}</p>
          <NucTrustBadges items={heroFeatures} />
          <a href="#offer-faq" className="offer-hero-button">
            <AdIcon icon="mdi:arrow-down" />
            <span>{t('offer-see-plans')}</span>
          </a>
        </div>
      </section>

      <div id="offer-faq">
        <NucSectionFaq site="offer" />
      </div>
      <NucSectionContact />
    </div>
  )
}

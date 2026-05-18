'use client'

import type { JSX } from 'react'

import { AdIcon, NucGridBackground, NucSectionEmailUs, t } from 'nucleify'
import './_index.scss'

const startFeatureItems = [
  {
    icon: 'mdi:currency-usd' as const,
    titleKey: 'home-feature-save-title',
    descKey: 'home-feature-save-desc',
  },
  {
    icon: 'mdi:lightning-bolt' as const,
    titleKey: 'home-feature-fast-title',
    descKey: 'home-feature-fast-desc',
  },
  {
    icon: 'mdi:shield-check' as const,
    titleKey: 'home-feature-secure-title',
    descKey: 'home-feature-secure-desc',
  },
]

export function NucStart(): JSX.Element {
  return (
    <section id="start">
      <NucGridBackground className="start-grid" />
      <div className="container start-container">
        <div className="start-left">
          <span className="start-badge">{t('home-badge')}</span>

          <h1 className="start-heading">{t('home-header')}</h1>

          <p className="start-description">{t('home-description')}</p>

          <div className="start-features">
            {startFeatureItems.map((item) => (
              <div className="feature-item" key={item.titleKey}>
                <div className="feature-icon">
                  <AdIcon icon={item.icon} />
                </div>
                <div className="feature-content">
                  <span>{t(item.titleKey)}</span>
                  <p>{t(item.descKey)}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="start-note">{t('home-note')}</p>

          <div className="start-social-proof">
            <AdIcon icon="mdi:rocket-launch-outline" />
            <span>{t('home-social-proof')}</span>
          </div>
        </div>

        <div className="start-right">
          <NucSectionEmailUs />
        </div>
      </div>
    </section>
  )
}

'use client'

import type { JSX } from 'react'

import {
  AdIcon,
  NucSectionEmailUsDialog,
  NucShinyBadge,
  NucTrustBadges,
  t,
} from 'nucleify'
import './_index.scss'

export function NucResults(): JSX.Element {
  const trustItems = [
    { icon: 'mdi:shield-check', label: t('results-trust-guarantee') },
    { icon: 'mdi:credit-card-off-outline', label: t('results-trust-payment') },
    { icon: 'mdi:infinity', label: t('results-trust-revisions') },
  ]

  const benefits = [
    {
      title: t('results-benefit-standout-title'),
      desc: t('results-benefit-standout-desc'),
      icon: 'mdi:trophy-outline',
    },
    {
      title: t('results-benefit-reach-title'),
      desc: t('results-benefit-reach-desc'),
      icon: 'mdi:account-group-outline',
    },
    {
      title: t('results-benefit-trust-title'),
      desc: t('results-benefit-trust-desc'),
      icon: 'mdi:shield-check-outline',
    },
    {
      title: t('results-benefit-control-title'),
      desc: t('results-benefit-control-desc'),
      icon: 'mdi:cursor-default-click-outline',
    },
  ]

  return (
    <section id="results">
      <div className="results-glow"></div>
      <div className="results-container container">
        <div className="results-header">
          <NucShinyBadge icon="mdi:gift-outline" label={t('results-badge')} />
          <h2 className="results-heading">
            {t('results-header')}
            <span className="highlight">{t('results-header-highlight')}</span>
          </h2>
          <p className="results-description">{t('results-description')}</p>
        </div>

        <div className="stats-grid">
          {benefits.map((item) => (
            <div key={item.title} className="stat-item">
              <div className="stat-icon-wrapper">
                <AdIcon icon={item.icon} className="stat-icon" />
              </div>
              <div className="stat-content">
                <span className="stat-value">{item.title}</span>
                <span className="stat-label">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="cta-section">
          <div className="cta-card">
            <div className="cta-inner">
              <div className="cta-left">
                <div className="cta-icon-wrapper">
                  <AdIcon icon="mdi:rocket-launch" className="cta-icon" />
                </div>
                <div className="cta-text">
                  <h3>{t('results-cta-header')}</h3>
                  <p>{t('results-cta-description')}</p>
                </div>
              </div>
              <NucSectionEmailUsDialog buttonClass="cta-button" />
            </div>
          </div>
        </div>

        <NucTrustBadges items={trustItems} />
      </div>
    </section>
  )
}

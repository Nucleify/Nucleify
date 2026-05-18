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
import '../_index.scss'

export function NucWebsiteRedesignPage(): JSX.Element {
  const trustItems = [
    { icon: 'mdi:speedometer', label: t('service-wr-trust-performance') },
    { icon: 'mdi:palette-outline', label: t('service-wr-trust-design') },
    { icon: 'mdi:magnify', label: t('service-wr-trust-seo') },
  ]

  const features = [
    {
      icon: 'mdi:palette-swatch-outline',
      title: t('service-wr-feat-design-title'),
      desc: t('service-wr-feat-design-desc'),
    },
    {
      icon: 'mdi:speedometer',
      title: t('service-wr-feat-performance-title'),
      desc: t('service-wr-feat-performance-desc'),
    },
    {
      icon: 'mdi:magnify',
      title: t('service-wr-feat-seo-title'),
      desc: t('service-wr-feat-seo-desc'),
    },
    {
      icon: 'mdi:cellphone-check',
      title: t('service-wr-feat-responsive-title'),
      desc: t('service-wr-feat-responsive-desc'),
    },
    {
      icon: 'mdi:database-sync-outline',
      title: t('service-wr-feat-migration-title'),
      desc: t('service-wr-feat-migration-desc'),
    },
    {
      icon: 'mdi:shield-lock-outline',
      title: t('service-wr-feat-security-title'),
      desc: t('service-wr-feat-security-desc'),
    },
  ]

  const benefits = [
    {
      icon: 'mdi:sparkles',
      title: t('service-wr-benefit-modern-title'),
      desc: t('service-wr-benefit-modern-desc'),
    },
    {
      icon: 'mdi:speedometer',
      title: t('service-wr-benefit-faster-title'),
      desc: t('service-wr-benefit-faster-desc'),
    },
    {
      icon: 'mdi:trending-up',
      title: t('service-wr-benefit-ranking-title'),
      desc: t('service-wr-benefit-ranking-desc'),
    },
  ]

  const beforeItems = [
    t('service-wr-before-1'),
    t('service-wr-before-2'),
    t('service-wr-before-3'),
    t('service-wr-before-4'),
    t('service-wr-before-5'),
  ]

  const afterItems = [
    t('service-wr-after-1'),
    t('service-wr-after-2'),
    t('service-wr-after-3'),
    t('service-wr-after-4'),
    t('service-wr-after-5'),
  ]

  const upgradeAreas = [
    {
      icon: 'mdi:speedometer',
      title: t('service-wr-area-speed-title'),
      desc: t('service-wr-area-speed-desc'),
      score: '96%',
      width: '96%',
    },
    {
      icon: 'mdi:magnify',
      title: t('service-wr-area-seo-title'),
      desc: t('service-wr-area-seo-desc'),
      score: '94%',
      width: '94%',
    },
    {
      icon: 'mdi:cellphone-check',
      title: t('service-wr-area-mobile-title'),
      desc: t('service-wr-area-mobile-desc'),
      score: '99%',
      width: '99%',
    },
    {
      icon: 'mdi:shield-lock-outline',
      title: t('service-wr-area-security-title'),
      desc: t('service-wr-area-security-desc'),
      score: '100%',
      width: '100%',
    },
  ]

  return (
    <div className="service-container">
      <section className="service-hero">
        <div className="service-hero-decoration service-hero-decoration-1">
          <AdIcon icon="mdi:hexagon-outline" />
        </div>
        <div className="service-hero-decoration service-hero-decoration-2">
          <AdIcon icon="mdi:triangle-outline" />
        </div>

        <div className="service-hero-content container">
          <NucShinyBadge icon="mdi:auto-fix" label={t('service-wr-badge')} />
          <h1 className="service-hero-title">
            {t('service-wr-title')}
            <span className="service-hero-title-highlight">
              {t('service-wr-title-highlight')}
            </span>
          </h1>
          <p className="service-hero-subtitle">{t('service-wr-subtitle')}</p>
          <NucTrustBadges items={trustItems} />
        </div>
      </section>

      <section className="service-features">
        <div className="container">
          <div className="service-features-grid">
            {features.map((feature) => (
              <div key={feature.title} className="service-feature-card">
                <div className="service-feature-card-icon">
                  <AdIcon icon={feature.icon} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-benefits">
        <div className="container">
          <h2 className="service-section-heading">
            {t('service-wr-benefits-heading')}
            <span className="highlight">
              {t('service-wr-benefits-highlight')}
            </span>
          </h2>
          <div className="service-benefits-grid">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="service-benefit-item">
                <div className="service-benefit-icon">
                  <AdIcon icon={benefit.icon} />
                </div>
                <div className="service-benefit-content">
                  <span>{benefit.title}</span>
                  <p>{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-comparison">
        <div className="container">
          <h2 className="service-section-heading">
            {t('service-wr-comparison-heading')}
            <span className="highlight">
              {t('service-wr-comparison-highlight')}
            </span>
          </h2>
          <div className="service-comparison-cards">
            <div className="service-comparison-card service-comparison-card--before">
              <div className="service-comparison-card-header">
                <AdIcon icon="mdi:close-circle-outline" />
                <span>{t('service-wr-before-label')}</span>
              </div>
              <div className="service-comparison-card-items">
                {beforeItems.map((item) => (
                  <div
                    key={item}
                    className="service-comparison-item service-comparison-item--bad"
                  >
                    <AdIcon icon="mdi:close" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="service-comparison-arrow">
              <AdIcon icon="mdi:arrow-right-bold" />
            </div>

            <div className="service-comparison-card service-comparison-card--after">
              <div className="service-comparison-card-header">
                <AdIcon icon="mdi:check-circle-outline" />
                <span>{t('service-wr-after-label')}</span>
              </div>
              <div className="service-comparison-card-items">
                {afterItems.map((item) => (
                  <div
                    key={item}
                    className="service-comparison-item service-comparison-item--good"
                  >
                    <AdIcon icon="mdi:check" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-upgrade-areas">
        <div className="container">
          <h2 className="service-section-heading">
            {t('service-wr-upgrade-heading')}
            <span className="highlight">
              {t('service-wr-upgrade-highlight')}
            </span>
          </h2>
          <div className="service-upgrade-grid">
            {upgradeAreas.map((area) => (
              <div key={area.title} className="service-upgrade-card">
                <div className="service-upgrade-card-top">
                  <div className="service-upgrade-card-icon">
                    <AdIcon icon={area.icon} />
                  </div>
                  <h3>{area.title}</h3>
                </div>
                <p>{area.desc}</p>
                <div className="service-upgrade-bar">
                  <div
                    className="service-upgrade-bar-fill"
                    style={{ width: area.width }}
                  >
                    <span>{area.score}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NucSectionFaq site="home" />
      <NucSectionContact />
    </div>
  )
}

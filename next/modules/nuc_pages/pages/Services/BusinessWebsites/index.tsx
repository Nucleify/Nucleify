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

export function NucBusinessWebsitesPage(): JSX.Element {
  const trustItems = [
    { icon: 'mdi:responsive', label: t('service-bw-trust-responsive') },
    { icon: 'mdi:magnify', label: t('service-bw-trust-seo') },
    { icon: 'mdi:headset', label: t('service-bw-trust-support') },
  ]

  const features = [
    {
      icon: 'mdi:palette-outline',
      title: t('service-bw-feat-design-title'),
      desc: t('service-bw-feat-design-desc'),
    },
    {
      icon: 'mdi:pencil-ruler',
      title: t('service-bw-feat-cms-title'),
      desc: t('service-bw-feat-cms-desc'),
    },
    {
      icon: 'mdi:chart-line',
      title: t('service-bw-feat-analytics-title'),
      desc: t('service-bw-feat-analytics-desc'),
    },
    {
      icon: 'mdi:cellphone-check',
      title: t('service-bw-feat-responsive-title'),
      desc: t('service-bw-feat-responsive-desc'),
    },
    {
      icon: 'mdi:shield-lock-outline',
      title: t('service-bw-feat-security-title'),
      desc: t('service-bw-feat-security-desc'),
    },
    {
      icon: 'mdi:rocket-outline',
      title: t('service-bw-feat-speed-title'),
      desc: t('service-bw-feat-speed-desc'),
    },
  ]

  const benefits = [
    {
      icon: 'mdi:shield-check-outline',
      title: t('service-bw-benefit-credibility-title'),
      desc: t('service-bw-benefit-credibility-desc'),
    },
    {
      icon: 'mdi:account-search-outline',
      title: t('service-bw-benefit-customers-title'),
      desc: t('service-bw-benefit-customers-desc'),
    },
    {
      icon: 'mdi:trending-up',
      title: t('service-bw-benefit-growth-title'),
      desc: t('service-bw-benefit-growth-desc'),
    },
  ]

  const scopeItems = [
    t('service-bw-scope-1'),
    t('service-bw-scope-2'),
    t('service-bw-scope-3'),
    t('service-bw-scope-4'),
    t('service-bw-scope-5'),
    t('service-bw-scope-6'),
    t('service-bw-scope-7'),
    t('service-bw-scope-8'),
  ]

  const processSteps = [
    {
      num: '01',
      icon: 'mdi:chat-outline',
      title: t('service-bw-step-1-title'),
      desc: t('service-bw-step-1-desc'),
    },
    {
      num: '02',
      icon: 'mdi:vector-square',
      title: t('service-bw-step-2-title'),
      desc: t('service-bw-step-2-desc'),
    },
    {
      num: '03',
      icon: 'mdi:code-tags',
      title: t('service-bw-step-3-title'),
      desc: t('service-bw-step-3-desc'),
    },
    {
      num: '04',
      icon: 'mdi:rocket-launch-outline',
      title: t('service-bw-step-4-title'),
      desc: t('service-bw-step-4-desc'),
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
          <NucShinyBadge icon="mdi:domain" label={t('service-bw-badge')} />
          <h1 className="service-hero-title">
            {t('service-bw-title')}
            <span className="service-hero-title-highlight">
              {t('service-bw-title-highlight')}
            </span>
          </h1>
          <p className="service-hero-subtitle">{t('service-bw-subtitle')}</p>
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

      <section className="service-scope">
        <div className="container service-scope-layout">
          <div>
            <NucShinyBadge
              icon="mdi:check-decagram-outline"
              label={t('service-bw-scope-badge')}
            />
            <h2 className="service-section-heading service-section-heading-left">
              {t('service-bw-scope-heading')}
              <span className="highlight">
                {t('service-bw-scope-highlight')}
              </span>
            </h2>
            <p className="service-scope-desc">{t('service-bw-scope-desc')}</p>
          </div>
          <div className="service-scope-checklist">
            {scopeItems.map((item) => (
              <div key={item} className="service-scope-item">
                <div className="service-scope-check">
                  <AdIcon icon="mdi:check-bold" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-process-mini">
        <div className="container">
          <h2 className="service-section-heading">
            {t('service-bw-process-heading')}
            <span className="highlight">
              {t('service-bw-process-highlight')}
            </span>
          </h2>
          <div className="service-process-steps">
            {processSteps.map((step, index) => (
              <div key={step.title} className="service-process-step">
                <div className="service-process-step-num">{step.num}</div>
                <div className="service-process-step-icon">
                  <AdIcon icon={step.icon} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                {index < processSteps.length - 1 && (
                  <div className="service-process-step-connector">
                    <AdIcon icon="mdi:chevron-right" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-benefits">
        <div className="container">
          <h2 className="service-section-heading">
            {t('service-bw-benefits-heading')}
            <span className="highlight">
              {t('service-bw-benefits-highlight')}
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

      <NucSectionFaq site="home" />
      <NucSectionContact />
    </div>
  )
}

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

export function NucLandingPagesPage(): JSX.Element {
  const trustItems = [
    { icon: 'mdi:clock-fast', label: t('service-lp-trust-fast') },
    { icon: 'mdi:target', label: t('service-lp-trust-conversion') },
    { icon: 'mdi:cellphone-check', label: t('service-lp-trust-mobile') },
  ]

  const features = [
    {
      icon: 'mdi:target',
      title: t('service-lp-feat-conversion-title'),
      desc: t('service-lp-feat-conversion-desc'),
    },
    {
      icon: 'mdi:clock-fast',
      title: t('service-lp-feat-speed-title'),
      desc: t('service-lp-feat-speed-desc'),
    },
    {
      icon: 'mdi:ab-testing',
      title: t('service-lp-feat-testing-title'),
      desc: t('service-lp-feat-testing-desc'),
    },
    {
      icon: 'mdi:form-select',
      title: t('service-lp-feat-forms-title'),
      desc: t('service-lp-feat-forms-desc'),
    },
    {
      icon: 'mdi:magnify',
      title: t('service-lp-feat-seo-title'),
      desc: t('service-lp-feat-seo-desc'),
    },
    {
      icon: 'mdi:animation-outline',
      title: t('service-lp-feat-animations-title'),
      desc: t('service-lp-feat-animations-desc'),
    },
  ]

  const benefits = [
    {
      icon: 'mdi:target',
      title: t('service-lp-benefit-convert-title'),
      desc: t('service-lp-benefit-convert-desc'),
    },
    {
      icon: 'mdi:rocket-launch-outline',
      title: t('service-lp-benefit-launch-title'),
      desc: t('service-lp-benefit-launch-desc'),
    },
    {
      icon: 'mdi:test-tube',
      title: t('service-lp-benefit-test-title'),
      desc: t('service-lp-benefit-test-desc'),
    },
  ]

  const sprintDays = [
    {
      day: '1',
      title: t('service-lp-day-1-title'),
      desc: t('service-lp-day-1-desc'),
    },
    {
      day: '2',
      title: t('service-lp-day-2-title'),
      desc: t('service-lp-day-2-desc'),
    },
    {
      day: '3',
      title: t('service-lp-day-3-title'),
      desc: t('service-lp-day-3-desc'),
    },
    {
      day: '4',
      title: t('service-lp-day-4-title'),
      desc: t('service-lp-day-4-desc'),
    },
    {
      day: '5',
      title: t('service-lp-day-5-title'),
      desc: t('service-lp-day-5-desc'),
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
          <NucShinyBadge
            icon="mdi:lightning-bolt"
            label={t('service-lp-badge')}
          />
          <h1 className="service-hero-title">
            {t('service-lp-title')}
            <span className="service-hero-title-highlight">
              {t('service-lp-title-highlight')}
            </span>
          </h1>
          <p className="service-hero-subtitle">{t('service-lp-subtitle')}</p>
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

      <section className="service-metrics">
        <div className="container">
          <h2 className="service-section-heading">
            {t('service-lp-metrics-heading')}
            <span className="highlight">
              {t('service-lp-metrics-highlight')}
            </span>
          </h2>
          <div className="service-metrics-comparison">
            <div className="service-metrics-side">
              <span className="service-metrics-label">
                {t('service-lp-metrics-before')}
              </span>
              <div className="service-metrics-bars">
                <div className="service-metrics-bar-row">
                  <span className="service-metrics-bar-label">
                    {t('service-lp-metric-conversion')}
                  </span>
                  <div className="service-metrics-bar-track">
                    <div
                      className="service-metrics-bar-fill service-metrics-bar-fill--muted"
                      style={{ width: '2.1%' }}
                    >
                      <span>2.1%</span>
                    </div>
                  </div>
                </div>
                <div className="service-metrics-bar-row">
                  <span className="service-metrics-bar-label">
                    {t('service-lp-metric-bounce')}
                  </span>
                  <div className="service-metrics-bar-track">
                    <div
                      className="service-metrics-bar-fill service-metrics-bar-fill--muted"
                      style={{ width: '68%' }}
                    >
                      <span>68%</span>
                    </div>
                  </div>
                </div>
                <div className="service-metrics-bar-row">
                  <span className="service-metrics-bar-label">
                    {t('service-lp-metric-time')}
                  </span>
                  <div className="service-metrics-bar-track">
                    <div
                      className="service-metrics-bar-fill service-metrics-bar-fill--muted"
                      style={{ width: '35%' }}
                    >
                      <span>0:42</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="service-metrics-arrow">
              <AdIcon icon="mdi:arrow-right-bold" />
            </div>
            <div className="service-metrics-side">
              <span className="service-metrics-label service-metrics-label--success">
                {t('service-lp-metrics-after')}
              </span>
              <div className="service-metrics-bars">
                <div className="service-metrics-bar-row">
                  <span className="service-metrics-bar-label">
                    {t('service-lp-metric-conversion')}
                  </span>
                  <div className="service-metrics-bar-track">
                    <div
                      className="service-metrics-bar-fill"
                      style={{ width: '6.4%' }}
                    >
                      <span>6.4%</span>
                    </div>
                  </div>
                </div>
                <div className="service-metrics-bar-row">
                  <span className="service-metrics-bar-label">
                    {t('service-lp-metric-bounce')}
                  </span>
                  <div className="service-metrics-bar-track">
                    <div
                      className="service-metrics-bar-fill"
                      style={{ width: '31%' }}
                    >
                      <span>31%</span>
                    </div>
                  </div>
                </div>
                <div className="service-metrics-bar-row">
                  <span className="service-metrics-bar-label">
                    {t('service-lp-metric-time')}
                  </span>
                  <div className="service-metrics-bar-track">
                    <div
                      className="service-metrics-bar-fill"
                      style={{ width: '82%' }}
                    >
                      <span>2:38</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-sprint">
        <div className="container">
          <h2 className="service-section-heading">
            {t('service-lp-sprint-heading')}
            <span className="highlight">
              {t('service-lp-sprint-highlight')}
            </span>
          </h2>
          <div className="service-sprint-timeline">
            <div className="service-sprint-line" />
            {sprintDays.map((day) => (
              <div key={day.day} className="service-sprint-day">
                <div className="service-sprint-dot">
                  <span>{day.day}</span>
                </div>
                <div className="service-sprint-card">
                  <div className="service-sprint-card-badge">
                    {t('service-lp-day-label').replace('{{day}}', day.day)}
                  </div>
                  <h3>{day.title}</h3>
                  <p>{day.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-benefits">
        <div className="container">
          <h2 className="service-section-heading">
            {t('service-lp-benefits-heading')}
            <span className="highlight">
              {t('service-lp-benefits-highlight')}
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

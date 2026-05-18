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

export function NucEcommerceStoresPage(): JSX.Element {
  const trustItems = [
    { icon: 'mdi:lock-outline', label: t('service-ec-trust-secure') },
    { icon: 'mdi:credit-card-outline', label: t('service-ec-trust-payments') },
    { icon: 'mdi:truck-fast-outline', label: t('service-ec-trust-delivery') },
  ]

  const features = [
    {
      icon: 'mdi:store-outline',
      title: t('service-ec-feat-catalog-title'),
      desc: t('service-ec-feat-catalog-desc'),
    },
    {
      icon: 'mdi:credit-card-check-outline',
      title: t('service-ec-feat-payments-title'),
      desc: t('service-ec-feat-payments-desc'),
    },
    {
      icon: 'mdi:package-variant-closed',
      title: t('service-ec-feat-inventory-title'),
      desc: t('service-ec-feat-inventory-desc'),
    },
    {
      icon: 'mdi:cellphone-check',
      title: t('service-ec-feat-responsive-title'),
      desc: t('service-ec-feat-responsive-desc'),
    },
    {
      icon: 'mdi:chart-line',
      title: t('service-ec-feat-analytics-title'),
      desc: t('service-ec-feat-analytics-desc'),
    },
    {
      icon: 'mdi:email-fast-outline',
      title: t('service-ec-feat-notifications-title'),
      desc: t('service-ec-feat-notifications-desc'),
    },
  ]

  const benefits = [
    {
      icon: 'mdi:hours-24',
      title: t('service-ec-benefit-247-title'),
      desc: t('service-ec-benefit-247-desc'),
    },
    {
      icon: 'mdi:earth',
      title: t('service-ec-benefit-global-title'),
      desc: t('service-ec-benefit-global-desc'),
    },
    {
      icon: 'mdi:rocket-launch-outline',
      title: t('service-ec-benefit-scale-title'),
      desc: t('service-ec-benefit-scale-desc'),
    },
  ]

  const dashboardStats = [
    {
      icon: 'mdi:cash-multiple',
      value: '$48k',
      label: t('service-ec-stat-revenue'),
      change: '+18%',
    },
    {
      icon: 'mdi:cart-outline',
      value: '126',
      label: t('service-ec-stat-orders'),
      change: '+11%',
    },
    {
      icon: 'mdi:account-group-outline',
      value: '2.4k',
      label: t('service-ec-stat-customers'),
      change: '+9%',
    },
    {
      icon: 'mdi:target',
      value: '4.3%',
      label: t('service-ec-stat-conversion'),
      change: '+1.2%',
    },
  ]

  const integrations = [
    { icon: 'mdi:credit-card-outline', label: 'Stripe' },
    { icon: 'mdi:paypal', label: 'PayPal' },
    { icon: 'mdi:google-analytics', label: 'Analytics' },
    { icon: 'mdi:truck-outline', label: 'Shippo' },
    { icon: 'mdi:email-outline', label: 'Mailchimp' },
    { icon: 'mdi:facebook', label: 'Meta Ads' },
    { icon: 'mdi:chat-outline', label: 'Live Chat' },
    { icon: 'mdi:api', label: 'API' },
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
            icon="mdi:cart-outline"
            label={t('service-ec-badge')}
          />
          <h1 className="service-hero-title">
            {t('service-ec-title')}
            <span className="service-hero-title-highlight">
              {t('service-ec-title-highlight')}
            </span>
          </h1>
          <p className="service-hero-subtitle">{t('service-ec-subtitle')}</p>
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

      <section className="service-dashboard">
        <div className="container">
          <h2 className="service-section-heading">
            {t('service-ec-dashboard-heading')}
            <span className="highlight">
              {t('service-ec-dashboard-highlight')}
            </span>
          </h2>
          <div className="service-dashboard-preview">
            <div className="service-dashboard-header">
              <div className="service-dashboard-dots">
                <span />
                <span />
                <span />
              </div>
              <span className="service-dashboard-title">
                {t('service-ec-dashboard-title')}
              </span>
            </div>
            <div className="service-dashboard-body">
              <div className="service-dashboard-stats">
                {dashboardStats.map((stat) => (
                  <div key={stat.label} className="service-dashboard-stat">
                    <div className="service-dashboard-stat-icon">
                      <AdIcon icon={stat.icon} />
                    </div>
                    <span className="service-dashboard-stat-value">
                      {stat.value}
                    </span>
                    <span className="service-dashboard-stat-label">
                      {stat.label}
                    </span>
                    <span className="service-dashboard-stat-change positive">
                      <AdIcon icon="mdi:trending-up" />
                      {stat.change}
                    </span>
                  </div>
                ))}
              </div>
              <div className="service-dashboard-chart">
                <div className="service-dashboard-chart-label">
                  {t('service-ec-dashboard-revenue')}
                </div>
                <div className="service-dashboard-chart-bars">
                  {[42, 58, 49, 71, 65, 80, 76, 88, 79, 92, 86, 95].map(
                    (value) => (
                      <div
                        key={value}
                        className="service-dashboard-bar"
                        style={{ height: `${value}%` }}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-integrations">
        <div className="container">
          <h2 className="service-section-heading">
            {t('service-ec-integrations-heading')}
            <span className="highlight">
              {t('service-ec-integrations-highlight')}
            </span>
          </h2>
          <div className="service-integrations-grid">
            {integrations.map((item) => (
              <div key={item.label} className="service-integration-card">
                <AdIcon icon={item.icon} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-benefits">
        <div className="container">
          <h2 className="service-section-heading">
            {t('service-ec-benefits-heading')}
            <span className="highlight">
              {t('service-ec-benefits-highlight')}
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

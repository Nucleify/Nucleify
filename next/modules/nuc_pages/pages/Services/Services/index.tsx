'use client'

import type { JSX } from 'react'

import {
  AdIcon,
  NucSectionContact,
  NucSectionFaq,
  NucShinyBadge,
  t,
} from 'nucleify'
import '../_index.scss'

export function NucServicesPage(): JSX.Element {
  const services = [
    {
      icon: 'mdi:domain',
      title: t('service-main-bw-title'),
      desc: t('service-main-bw-desc'),
      url: '/en/services/business-websites',
    },
    {
      icon: 'mdi:cart-outline',
      title: t('service-main-ec-title'),
      desc: t('service-main-ec-desc'),
      url: '/en/services/ecommerce-stores',
    },
    {
      icon: 'mdi:lightning-bolt',
      title: t('service-main-lp-title'),
      desc: t('service-main-lp-desc'),
      url: '/en/services/landing-pages',
    },
    {
      icon: 'mdi:auto-fix',
      title: t('service-main-wr-title'),
      desc: t('service-main-wr-desc'),
      url: '/en/services/website-redesign',
    },
    {
      icon: 'mdi:puzzle-outline',
      title: t('service-main-cp-title'),
      desc: t('service-main-cp-desc'),
      url: '/en/services/custom-projects',
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
            icon="mdi:briefcase-outline"
            label={t('service-main-badge')}
          />
          <h1 className="service-hero-title">
            {t('service-main-title')}
            <span className="service-hero-title-highlight">
              {t('service-main-title-highlight')}
            </span>
          </h1>
          <p className="service-hero-subtitle">{t('service-main-subtitle')}</p>
        </div>
      </section>

      <section className="service-features">
        <div className="container">
          <div className="service-features-grid">
            {services.map((service) => (
              <a
                key={service.title}
                href={service.url}
                className="service-feature-card service-feature-card-link"
              >
                <div className="service-feature-card-icon">
                  <AdIcon icon={service.icon} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <span className="service-feature-card-arrow">
                  <AdIcon icon="mdi:arrow-right" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <NucSectionFaq site="home" />
      <NucSectionContact />
    </div>
  )
}

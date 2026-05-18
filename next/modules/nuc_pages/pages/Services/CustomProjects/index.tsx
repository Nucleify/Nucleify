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

export function NucCustomProjectsPage(): JSX.Element {
  const trustItems = [
    { icon: 'mdi:code-braces', label: t('service-cp-trust-tailored') },
    { icon: 'mdi:arrow-expand-all', label: t('service-cp-trust-scalable') },
    { icon: 'mdi:key-outline', label: t('service-cp-trust-ownership') },
  ]

  const features = [
    {
      icon: 'mdi:cog-outline',
      title: t('service-cp-feat-tailored-title'),
      desc: t('service-cp-feat-tailored-desc'),
    },
    {
      icon: 'mdi:api',
      title: t('service-cp-feat-api-title'),
      desc: t('service-cp-feat-api-desc'),
    },
    {
      icon: 'mdi:arrow-expand-all',
      title: t('service-cp-feat-scalable-title'),
      desc: t('service-cp-feat-scalable-desc'),
    },
    {
      icon: 'mdi:database-outline',
      title: t('service-cp-feat-database-title'),
      desc: t('service-cp-feat-database-desc'),
    },
    {
      icon: 'mdi:test-tube',
      title: t('service-cp-feat-testing-title'),
      desc: t('service-cp-feat-testing-desc'),
    },
    {
      icon: 'mdi:cloud-outline',
      title: t('service-cp-feat-deploy-title'),
      desc: t('service-cp-feat-deploy-desc'),
    },
  ]

  const benefits = [
    {
      icon: 'mdi:fingerprint',
      title: t('service-cp-benefit-unique-title'),
      desc: t('service-cp-benefit-unique-desc'),
    },
    {
      icon: 'mdi:trending-up',
      title: t('service-cp-benefit-scale-title'),
      desc: t('service-cp-benefit-scale-desc'),
    },
    {
      icon: 'mdi:key-outline',
      title: t('service-cp-benefit-ownership-title'),
      desc: t('service-cp-benefit-ownership-desc'),
    },
  ]

  const techStack = [
    {
      title: t('service-cp-tech-frontend'),
      items: [
        { icon: 'mdi:vuejs', label: 'Vue 3' },
        { icon: 'mdi:nuxt', label: 'Nuxt 3' },
        { icon: 'mdi:language-typescript', label: 'TypeScript' },
        { icon: 'mdi:sass', label: 'SCSS' },
      ],
    },
    {
      title: t('service-cp-tech-backend'),
      items: [
        { icon: 'mdi:laravel', label: 'Laravel' },
        { icon: 'mdi:language-php', label: 'PHP 8' },
        { icon: 'mdi:database', label: 'MySQL' },
        { icon: 'mdi:api', label: 'REST API' },
      ],
    },
    {
      title: t('service-cp-tech-devops'),
      items: [
        { icon: 'mdi:docker', label: 'Docker' },
        { icon: 'mdi:github', label: 'GitHub CI/CD' },
        { icon: 'mdi:cloud-outline', label: 'Cloud' },
        { icon: 'mdi:monitor-dashboard', label: 'Monitoring' },
      ],
    },
  ]

  const phases = [
    {
      num: '01',
      icon: 'mdi:magnify',
      title: t('service-cp-phase-1-title'),
      duration: t('service-cp-phase-1-duration'),
      desc: t('service-cp-phase-1-desc'),
      deliverables: [
        t('service-cp-phase-1-d1'),
        t('service-cp-phase-1-d2'),
        t('service-cp-phase-1-d3'),
      ],
    },
    {
      num: '02',
      icon: 'mdi:vector-square',
      title: t('service-cp-phase-2-title'),
      duration: t('service-cp-phase-2-duration'),
      desc: t('service-cp-phase-2-desc'),
      deliverables: [
        t('service-cp-phase-2-d1'),
        t('service-cp-phase-2-d2'),
        t('service-cp-phase-2-d3'),
      ],
    },
    {
      num: '03',
      icon: 'mdi:code-tags',
      title: t('service-cp-phase-3-title'),
      duration: t('service-cp-phase-3-duration'),
      desc: t('service-cp-phase-3-desc'),
      deliverables: [
        t('service-cp-phase-3-d1'),
        t('service-cp-phase-3-d2'),
        t('service-cp-phase-3-d3'),
      ],
    },
    {
      num: '04',
      icon: 'mdi:rocket-launch-outline',
      title: t('service-cp-phase-4-title'),
      duration: t('service-cp-phase-4-duration'),
      desc: t('service-cp-phase-4-desc'),
      deliverables: [
        t('service-cp-phase-4-d1'),
        t('service-cp-phase-4-d2'),
        t('service-cp-phase-4-d3'),
      ],
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
            icon="mdi:puzzle-outline"
            label={t('service-cp-badge')}
          />
          <h1 className="service-hero-title">
            {t('service-cp-title')}
            <span className="service-hero-title-highlight">
              {t('service-cp-title-highlight')}
            </span>
          </h1>
          <p className="service-hero-subtitle">{t('service-cp-subtitle')}</p>
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

      <section className="service-techstack">
        <div className="container">
          <h2 className="service-section-heading">
            {t('service-cp-tech-heading')}
            <span className="highlight">{t('service-cp-tech-highlight')}</span>
          </h2>
          <div className="service-techstack-grid">
            {techStack.map((category) => (
              <div key={category.title} className="service-techstack-category">
                <h3>{category.title}</h3>
                <div className="service-techstack-items">
                  {category.items.map((item) => (
                    <div key={item.label} className="service-techstack-item">
                      <AdIcon icon={item.icon} />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-phases">
        <div className="container">
          <h2 className="service-section-heading">
            {t('service-cp-phases-heading')}
            <span className="highlight">
              {t('service-cp-phases-highlight')}
            </span>
          </h2>
          <div className="service-phases-grid">
            {phases.map((phase) => (
              <div key={phase.title} className="service-phase-card">
                <div className="service-phase-card-accent" />
                <div className="service-phase-num">{phase.num}</div>
                <div className="service-phase-header">
                  <div className="service-phase-icon">
                    <AdIcon icon={phase.icon} />
                  </div>
                  <h3>{phase.title}</h3>
                </div>
                <div className="service-phase-duration">{phase.duration}</div>
                <p>{phase.desc}</p>
                <ul className="service-phase-deliverables">
                  {phase.deliverables.map((item) => (
                    <li key={item}>
                      <AdIcon icon="mdi:check-circle" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-benefits">
        <div className="container">
          <h2 className="service-section-heading">
            {t('service-cp-benefits-heading')}
            <span className="highlight">
              {t('service-cp-benefits-highlight')}
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

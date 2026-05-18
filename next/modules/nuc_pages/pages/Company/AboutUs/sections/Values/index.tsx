'use client'

import type { JSX } from 'react'

import { AdIcon, NucShinyBadge, t } from 'nucleify'

import './_index.scss'

export function NucAboutValues(): JSX.Element {
  const values = [
    {
      icon: 'mdi:clock-fast',
      title: t('about-value-speed-title'),
      desc: t('about-value-speed-desc'),
    },
    {
      icon: 'mdi:shield-lock-outline',
      title: t('about-value-security-title'),
      desc: t('about-value-security-desc'),
    },
    {
      icon: 'mdi:cash-check',
      title: t('about-value-cost-title'),
      desc: t('about-value-cost-desc'),
    },
    {
      icon: 'mdi:ear-hearing',
      title: t('about-value-listen-title'),
      desc: t('about-value-listen-desc'),
    },
    {
      icon: 'mdi:check-decagram-outline',
      title: t('about-value-quality-title'),
      desc: t('about-value-quality-desc'),
    },
    {
      icon: 'mdi:handshake-outline',
      title: t('about-value-partnership-title'),
      desc: t('about-value-partnership-desc'),
    },
  ]

  return (
    <section id="values">
      <div className="about-values-container container">
        <div className="about-values-header">
          <NucShinyBadge
            icon="mdi:star-four-points-outline"
            label={t('about-values-badge')}
          />
          <h2 className="about-values-heading">
            {t('about-values-heading')}
            <span className="highlight">
              {t('about-values-heading-highlight')}
            </span>
          </h2>
          <p className="about-values-description">
            {t('about-values-description')}
          </p>
        </div>
        <div className="about-values-grid">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={`about-value-card ${index === 0 ? 'about-value-card--featured' : ''}`}
            >
              <div className="about-value-card-number">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="about-value-card-icon">
                <AdIcon icon={value.icon} />
              </div>
              <h3 className="about-value-card-title">{value.title}</h3>
              <p className="about-value-card-desc">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

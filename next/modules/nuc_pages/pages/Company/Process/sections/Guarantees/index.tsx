'use client'

import type { JSX } from 'react'

import { AdIcon, NucShinyBadge, t } from 'nucleify'

import './_index.scss'

export function NucProcessGuarantees(): JSX.Element {
  const guarantees = [
    {
      icon: 'mdi:cash-refund',
      title: t('process-guarantee-moneyback-title'),
      desc: t('process-guarantee-moneyback-desc'),
      tag: t('process-guarantee-moneyback-tag'),
    },
    {
      icon: 'mdi:currency-usd-off',
      title: t('process-guarantee-transparent-title'),
      desc: t('process-guarantee-transparent-desc'),
      tag: t('process-guarantee-transparent-tag'),
    },
    {
      icon: 'mdi:refresh',
      title: t('process-guarantee-revisions-title'),
      desc: t('process-guarantee-revisions-desc'),
      tag: t('process-guarantee-revisions-tag'),
    },
    {
      icon: 'mdi:key-outline',
      title: t('process-guarantee-ownership-title'),
      desc: t('process-guarantee-ownership-desc'),
      tag: t('process-guarantee-ownership-tag'),
    },
  ]

  return (
    <section id="guarantees">
      <div className="process-guarantees-container container">
        <div className="process-guarantees-header">
          <NucShinyBadge
            icon="mdi:shield-check-outline"
            label={t('process-guarantees-badge')}
          />
          <h2 className="process-guarantees-heading">
            {t('process-guarantees-heading')}
            <span className="highlight">
              {t('process-guarantees-heading-highlight')}
            </span>
          </h2>
          <p className="process-guarantees-description">
            {t('process-guarantees-description')}
          </p>
        </div>

        <div className="process-guarantees-grid">
          {guarantees.map((item, index) => (
            <div key={item.title} className="process-guarantee-card">
              <div className="process-guarantee-card-accent" />
              <div className="process-guarantee-card-num">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="process-guarantee-card-head">
                <div className="process-guarantee-card-icon">
                  <AdIcon icon={item.icon} />
                </div>
                <h3>{item.title}</h3>
              </div>
              <p>{item.desc}</p>
              <div className="process-guarantee-card-check">
                <AdIcon icon="mdi:check-bold" />
                <span>{item.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

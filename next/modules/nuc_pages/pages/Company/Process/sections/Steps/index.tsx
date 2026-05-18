'use client'

import type { JSX } from 'react'

import { AdIcon, NucShinyBadge, t } from 'nucleify'

import './_index.scss'

export function NucProcessSteps(): JSX.Element {
  const steps = [
    {
      icon: 'mdi:chat-outline',
      badge: '01',
      title: t('process-step-1-title'),
      desc: t('process-step-1-desc'),
      details: [
        t('process-step-1-detail-1'),
        t('process-step-1-detail-2'),
        t('process-step-1-detail-3'),
      ],
    },
    {
      icon: 'mdi:pencil-ruler',
      badge: '02',
      title: t('process-step-2-title'),
      desc: t('process-step-2-desc'),
      details: [
        t('process-step-2-detail-1'),
        t('process-step-2-detail-2'),
        t('process-step-2-detail-3'),
      ],
    },
    {
      icon: 'mdi:code-tags',
      badge: '03',
      title: t('process-step-3-title'),
      desc: t('process-step-3-desc'),
      details: [
        t('process-step-3-detail-1'),
        t('process-step-3-detail-2'),
        t('process-step-3-detail-3'),
      ],
    },
    {
      icon: 'mdi:lifebuoy',
      badge: '04',
      title: t('process-step-4-title'),
      desc: t('process-step-4-desc'),
      details: [
        t('process-step-4-detail-1'),
        t('process-step-4-detail-2'),
        t('process-step-4-detail-3'),
      ],
    },
  ]

  return (
    <section id="steps">
      <div className="process-steps-container container">
        <div className="process-steps-header">
          <NucShinyBadge
            icon="mdi:format-list-numbered"
            label={t('process-steps-badge')}
          />
          <h2 className="process-steps-heading">
            {t('process-steps-heading')}
            <span className="highlight">
              {t('process-steps-heading-highlight')}
            </span>
          </h2>
          <p className="process-steps-description">
            {t('process-steps-description')}
          </p>
        </div>
        <div className="process-steps-timeline">
          <div className="process-steps-line">
            <div className="process-steps-line-shimmer" />
          </div>
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`process-step-row ${index % 2 === 0 ? 'process-step-row-left' : 'process-step-row-right'}`}
            >
              <div className="process-step-card">
                <div className="process-step-card-badge">{step.badge}</div>
                <div className="process-step-card-top">
                  <div className="process-step-card-icon">
                    <AdIcon icon={step.icon} />
                  </div>
                  <h3>{step.title}</h3>
                </div>
                <p className="process-step-card-desc">{step.desc}</p>
                <ul className="process-step-card-details">
                  {step.details.map((detail) => (
                    <li key={detail}>
                      <AdIcon icon="mdi:check-circle" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="process-step-dot">
                <span>{index + 1}</span>
              </div>
              <div className="process-step-spacer" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

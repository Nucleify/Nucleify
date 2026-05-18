'use client'

import type { JSX } from 'react'

import { AdIcon, t } from 'nucleify'

import './_index.scss'

export function NucProcessStart(): JSX.Element {
  const steps = [
    { num: '01', label: t('process-step-1-title') },
    { num: '02', label: t('process-step-2-title') },
    { num: '03', label: t('process-step-3-title') },
    { num: '04', label: t('process-step-4-title') },
  ]

  return (
    <section id="start">
      <div className="process-start-decoration process-start-decoration-1">
        <AdIcon icon="mdi:cog-outline" />
      </div>
      <div className="process-start-decoration process-start-decoration-2">
        <AdIcon icon="mdi:triangle-outline" />
      </div>
      <div className="container process-start-inner">
        <span className="process-start-badge">{t('process-badge')}</span>
        <h1 className="process-start-title">
          {t('process-start-title')}
          <span className="process-start-title-highlight">
            {t('process-start-title-highlight')}
          </span>
        </h1>
        <p className="process-start-subtitle">{t('process-start-subtitle')}</p>
        <div className="process-start-indicators">
          {steps.map((step) => (
            <div key={step.num} className="process-start-indicator">
              <div className="process-start-indicator-num">{step.num}</div>
              <span>{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

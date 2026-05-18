'use client'

import type { JSX } from 'react'

import { AdIcon, t } from 'nucleify'

import './_index.scss'

export function NucAboutProcess(): JSX.Element {
  const processSteps = [
    {
      icon: 'mdi:chat-outline',
      title: t('about-process-step-1-title'),
      desc: t('about-process-step-1-desc'),
    },
    {
      icon: 'mdi:pencil-ruler',
      title: t('about-process-step-2-title'),
      desc: t('about-process-step-2-desc'),
    },
    {
      icon: 'mdi:code-tags',
      title: t('about-process-step-3-title'),
      desc: t('about-process-step-3-desc'),
    },
    {
      icon: 'mdi:lifebuoy',
      title: t('about-process-step-4-title'),
      desc: t('about-process-step-4-desc'),
    },
  ]

  return (
    <section id="process">
      <div className="about-process-container container">
        <div className="about-process-inner">
          <h3 className="about-process-title">{t('about-process-title')}</h3>
          <div className="about-process-track">
            <div className="about-process-line">
              <div className="about-process-line-shimmer" />
            </div>
            <div className="about-process-steps">
              {processSteps.map((step, index) => (
                <div key={step.title} className="about-process-step">
                  <div className="about-process-step-number">
                    <span>{index + 1}</span>
                  </div>
                  <div className="about-process-step-body">
                    <div className="about-process-step-icon">
                      <AdIcon icon={step.icon} />
                    </div>
                    <span className="about-process-step-title">
                      {step.title}
                    </span>
                    <span className="about-process-step-desc">{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

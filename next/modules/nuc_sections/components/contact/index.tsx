'use client'

import type { JSX } from 'react'

import { AdIcon, NucSectionEmailUsDialog, t } from 'nucleify'
import './index.scss'

export function NucSectionContact(): JSX.Element {
  const contactText = t('contact-text')
  const contactTextHighlight = t('contact-text-highlight')
  const contactFeatures = [
    { icon: 'prime:clock', text: t('contact-feat-response') },
    { icon: 'prime:credit-card', text: t('contact-feat-payment') },
    { icon: 'prime:thumbs-up', text: t('contact-feat-satisfaction') },
  ]

  return (
    <div id="contact">
      <div className="contact-banner container">
        <div className="contact-decoration contact-decoration-left">
          <AdIcon className="iconify" icon="prime:envelope" />
        </div>

        <div className="contact-left">
          <span className="contact-badge">{t('contact-badge')}</span>
          <h3 className="contact-heading">{t('contact-heading')}</h3>
          <p className="contact-text">
            {contactText}{' '}
            <span className="highlight">{contactTextHighlight}</span>
          </p>

          <div className="contact-features">
            {contactFeatures.map((feature) => (
              <div className="feature" key={feature.icon}>
                <AdIcon className="iconify" icon={feature.icon} />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-divider" />

        <div className="contact-right">
          <NucSectionEmailUsDialog buttonClass="contact-button" />
          <span className="contact-email">business@nucleify.io</span>
        </div>

        <div className="contact-decoration contact-decoration-right">
          <AdIcon className="iconify" icon="prime:send" />
        </div>
      </div>
    </div>
  )
}

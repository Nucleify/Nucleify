'use client'

import type { JSX } from 'react'

import { AdIcon, t } from 'nucleify'

import '../_index.scss'

function tt(key: string): string {
  return t(key).replace(/\{'@'\}/g, '@')
}

export function NucGDPRPage(): JSX.Element {
  return (
    <div className="legal-container">
      <div className="legal-content container">
        <div className="legal-header">
          <AdIcon icon="mdi:scale-balance" className="legal-header-icon" />
          <h1 className="legal-title">{tt('legal-gdpr-title')}</h1>
          <p className="legal-updated">{t('legal-last-updated')}: 27.02.2026</p>
        </div>

        <div className="legal-sections">
          <section className="legal-section">
            <h2>{tt('legal-gdpr-intro-title')}</h2>
            <p>{tt('legal-gdpr-intro-text')}</p>
          </section>

          <section className="legal-section">
            <h2>{tt('legal-gdpr-controller-title')}</h2>
            <p>{tt('legal-gdpr-controller-text')}</p>
          </section>

          <section className="legal-section">
            <h2>{tt('legal-gdpr-legal-basis-title')}</h2>
            <p>{tt('legal-gdpr-legal-basis-text')}</p>
            <ul className="legal-list">
              <li>{tt('legal-gdpr-basis-consent')}</li>
              <li>{tt('legal-gdpr-basis-contract')}</li>
              <li>{tt('legal-gdpr-basis-legal')}</li>
              <li>{tt('legal-gdpr-basis-interest')}</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>{tt('legal-gdpr-rights-title')}</h2>
            <p>{tt('legal-gdpr-rights-text')}</p>
            <ul className="legal-list">
              <li>{tt('legal-gdpr-right-access')}</li>
              <li>{tt('legal-gdpr-right-rectification')}</li>
              <li>{tt('legal-gdpr-right-erasure')}</li>
              <li>{tt('legal-gdpr-right-restrict')}</li>
              <li>{tt('legal-gdpr-right-portability')}</li>
              <li>{tt('legal-gdpr-right-object')}</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>{tt('legal-gdpr-retention-title')}</h2>
            <p>{tt('legal-gdpr-retention-text')}</p>
          </section>

          <section className="legal-section">
            <h2>{tt('legal-gdpr-transfers-title')}</h2>
            <p>{tt('legal-gdpr-transfers-text')}</p>
          </section>

          <section className="legal-section">
            <h2>{tt('legal-gdpr-dpo-title')}</h2>
            <p>{tt('legal-gdpr-dpo-text')}</p>
          </section>
        </div>
      </div>
    </div>
  )
}

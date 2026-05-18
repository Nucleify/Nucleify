'use client'

import type { JSX } from 'react'

import { AdIcon, t } from 'nucleify'

import '../_index.scss'

function tt(key: string): string {
  return t(key).replace(/\{'@'\}/g, '@')
}

export function NucPrivacyPolicyPage(): JSX.Element {
  return (
    <div className="legal-container">
      <div className="legal-content container">
        <div className="legal-header">
          <AdIcon icon="mdi:shield-lock" className="legal-header-icon" />
          <h1 className="legal-title">{tt('legal-privacy-title')}</h1>
          <p className="legal-updated">{t('legal-last-updated')}: 27.02.2026</p>
        </div>

        <div className="legal-sections">
          <section className="legal-section">
            <h2>{tt('legal-privacy-intro-title')}</h2>
            <p>{tt('legal-privacy-intro-text')}</p>
          </section>

          <section className="legal-section">
            <h2>{tt('legal-privacy-data-collection-title')}</h2>
            <p>{tt('legal-privacy-data-collection-text')}</p>
            <ul className="legal-list">
              <li>{tt('legal-privacy-data-name')}</li>
              <li>{tt('legal-privacy-data-email')}</li>
              <li>{tt('legal-privacy-data-usage')}</li>
              <li>{tt('legal-privacy-data-cookies')}</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>{tt('legal-privacy-usage-title')}</h2>
            <p>{tt('legal-privacy-usage-text')}</p>
          </section>

          <section className="legal-section">
            <h2>{tt('legal-privacy-sharing-title')}</h2>
            <p>{tt('legal-privacy-sharing-text')}</p>
          </section>

          <section className="legal-section">
            <h2>{tt('legal-privacy-security-title')}</h2>
            <p>{tt('legal-privacy-security-text')}</p>
          </section>

          <section className="legal-section">
            <h2>{tt('legal-privacy-rights-title')}</h2>
            <p>{tt('legal-privacy-rights-text')}</p>
          </section>

          <section className="legal-section">
            <h2>{tt('legal-privacy-contact-title')}</h2>
            <p>{tt('legal-privacy-contact-text')}</p>
          </section>
        </div>
      </div>
    </div>
  )
}

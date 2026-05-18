'use client'

import type { JSX } from 'react'

import { AdIcon, t } from 'nucleify'

import '../_index.scss'

function tt(key: string): string {
  return t(key).replace(/\{'@'\}/g, '@')
}

export function NucTermsOfServicePage(): JSX.Element {
  return (
    <div className="legal-container">
      <div className="legal-content container">
        <div className="legal-header">
          <AdIcon
            icon="mdi:file-document-outline"
            className="legal-header-icon"
          />
          <h1 className="legal-title">{tt('legal-terms-title')}</h1>
          <p className="legal-updated">{t('legal-last-updated')}: 27.02.2026</p>
        </div>

        <div className="legal-sections">
          <section className="legal-section">
            <h2>{tt('legal-terms-intro-title')}</h2>
            <p>{tt('legal-terms-intro-text')}</p>
          </section>

          <section className="legal-section">
            <h2>{tt('legal-terms-services-title')}</h2>
            <p>{tt('legal-terms-services-text')}</p>
          </section>

          <section className="legal-section">
            <h2>{tt('legal-terms-accounts-title')}</h2>
            <p>{tt('legal-terms-accounts-text')}</p>
          </section>

          <section className="legal-section">
            <h2>{tt('legal-terms-ip-title')}</h2>
            <p>{tt('legal-terms-ip-text')}</p>
          </section>

          <section className="legal-section">
            <h2>{tt('legal-terms-liability-title')}</h2>
            <p>{tt('legal-terms-liability-text')}</p>
          </section>

          <section className="legal-section">
            <h2>{tt('legal-terms-termination-title')}</h2>
            <p>{tt('legal-terms-termination-text')}</p>
          </section>

          <section className="legal-section">
            <h2>{tt('legal-terms-changes-title')}</h2>
            <p>{tt('legal-terms-changes-text')}</p>
          </section>

          <section className="legal-section">
            <h2>{tt('legal-terms-contact-title')}</h2>
            <p>{tt('legal-terms-contact-text')}</p>
          </section>
        </div>
      </div>
    </div>
  )
}

'use client'

import type { JSX } from 'react'

import { AdIcon, t } from 'nucleify'

import '../_index.scss'

function tt(key: string): string {
  return t(key).replace(/\{'@'\}/g, '@')
}

export function NucCookiesPage(): JSX.Element {
  return (
    <div className="legal-container">
      <div className="legal-content container">
        <div className="legal-header">
          <AdIcon icon="mdi:cookie" className="legal-header-icon" />
          <h1 className="legal-title">{tt('legal-cookies-title')}</h1>
          <p className="legal-updated">{t('legal-last-updated')}: 27.02.2026</p>
        </div>

        <div className="legal-sections">
          <section className="legal-section">
            <h2>{tt('legal-cookies-what-title')}</h2>
            <p>{tt('legal-cookies-what-text')}</p>
          </section>

          <section className="legal-section">
            <h2>{tt('legal-cookies-types-title')}</h2>
            <p>{tt('legal-cookies-types-text')}</p>
            <ul className="legal-list">
              <li>
                <strong>{tt('legal-cookies-essential-label')}:</strong>{' '}
                {tt('legal-cookies-essential-text')}
              </li>
              <li>
                <strong>{tt('legal-cookies-analytics-label')}:</strong>{' '}
                {tt('legal-cookies-analytics-text')}
              </li>
              <li>
                <strong>{tt('legal-cookies-functional-label')}:</strong>{' '}
                {tt('legal-cookies-functional-text')}
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>{tt('legal-cookies-manage-title')}</h2>
            <p>{tt('legal-cookies-manage-text')}</p>
          </section>

          <section className="legal-section">
            <h2>{tt('legal-cookies-third-party-title')}</h2>
            <p>{tt('legal-cookies-third-party-text')}</p>
          </section>

          <section className="legal-section">
            <h2>{tt('legal-cookies-contact-title')}</h2>
            <p>{tt('legal-cookies-contact-text')}</p>
          </section>
        </div>
      </div>
    </div>
  )
}

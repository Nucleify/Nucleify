'use client'

import type { JSX } from 'react'

import { AdIcon, t } from 'nucleify'

import './_index.scss'

export function NucAboutStart(): JSX.Element {
  const companyLink =
    'https://aleo.com/pl/firma/atomic-it-spolka-z-ograniczona-odpowiedzialnoscia'

  const cardItems = [
    {
      icon: 'mdi:file-document-outline',
      value: t('about-card-nip-value'),
      label: t('about-card-nip-label'),
      link: companyLink,
    },
    {
      icon: 'mdi:calendar-outline',
      value: t('about-card-founded-value'),
      label: t('about-card-founded-label'),
      link: companyLink,
    },
    {
      icon: 'mdi:map-marker-outline',
      value: t('about-card-location-value'),
      label: t('about-card-location-label'),
      link: companyLink,
    },
    {
      icon: 'mdi:email-outline',
      value: t('about-card-email-value'),
      label: t('about-card-email-label'),
      link: 'mailto:info@nucleify.io',
    },
  ]

  return (
    <section id="start">
      <div className="about-start-decoration about-start-decoration-1">
        <AdIcon icon="mdi:hexagon-outline" />
      </div>
      <div className="about-start-decoration about-start-decoration-2">
        <AdIcon icon="mdi:circle-outline" />
      </div>
      <div className="container about-start-inner">
        <div className="about-start-left">
          <span className="about-start-badge">{t('about-badge')}</span>
          <h1 className="about-start-title">
            {t('about-start-title')}
            <span className="about-start-title-highlight">
              {t('about-start-title-highlight')}
            </span>
          </h1>
          <p className="about-start-subtitle">{t('about-start-subtitle')}</p>
        </div>

        <div className="about-start-right">
          <div className="about-start-card">
            <div className="about-start-card-header">
              <AdIcon icon="mdi:information-outline" />
              <span>{t('about-card-title')}</span>
            </div>
            <a
              className="about-start-card-company"
              href={companyLink}
              target="_blank"
              rel="noreferrer"
            >
              <AdIcon icon="mdi:domain" />
              <span>{t('footer-company-name')}</span>
            </a>
            <div className="about-start-card-divider" />
            <div className="about-start-card-items">
              {cardItems.map((item) => (
                <a
                  key={item.label}
                  className="about-start-card-item"
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="about-start-card-item-icon">
                    <AdIcon icon={item.icon} />
                  </div>
                  <div className="about-start-card-item-text">
                    <span className="about-start-card-item-value">
                      {item.value}
                    </span>
                    <span className="about-start-card-item-label">
                      {item.label}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

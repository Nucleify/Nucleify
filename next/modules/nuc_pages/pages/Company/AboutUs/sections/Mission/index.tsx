'use client'

import type { JSX } from 'react'

import { AdIcon, NucShinyBadge, t } from 'nucleify'

import './_index.scss'

export function NucAboutMission(): JSX.Element {
  const features = [
    {
      icon: 'mdi:palette-outline',
      title: t('about-mission-feat-websites-title'),
      desc: t('about-mission-feat-websites-desc'),
    },
    {
      icon: 'mdi:package-variant-closed',
      title: t('about-mission-feat-everything-title'),
      desc: t('about-mission-feat-everything-desc'),
    },
    {
      icon: 'mdi:trending-up',
      title: t('about-mission-feat-growth-title'),
      desc: t('about-mission-feat-growth-desc'),
    },
    {
      icon: 'mdi:headset',
      title: t('about-mission-feat-support-title'),
      desc: t('about-mission-feat-support-desc'),
    },
  ]

  return (
    <section id="mission">
      <div className="about-mission-container container">
        <div className="about-mission-header">
          <NucShinyBadge
            icon="mdi:rocket-launch-outline"
            label={t('about-mission-badge')}
          />
          <h2 className="about-mission-heading">
            {t('about-mission-heading')}
            <span className="highlight">
              {t('about-mission-heading-highlight')}
            </span>
          </h2>
          <p className="about-mission-description">
            {t('about-mission-description')}
          </p>
        </div>
        <div className="about-mission-grid">
          {features.map((item) => (
            <div key={item.title} className="about-mission-card">
              <div className="about-mission-card-top">
                <div className="about-mission-card-icon">
                  <AdIcon icon={item.icon} />
                </div>
                <h3>{item.title}</h3>
              </div>
              <p className="about-mission-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="about-mission-story">
          <h3>{t('about-story-title')}</h3>
          <p>{t('about-story-text-1')}</p>
          <p>{t('about-story-text-2')}</p>
        </div>
      </div>
    </section>
  )
}

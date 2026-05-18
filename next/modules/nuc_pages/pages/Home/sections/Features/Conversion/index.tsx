'use client'

import type { JSX } from 'react'

import { AdIcon, t } from 'nucleify'

import type { FeatureItemInterface } from '../Template'
import { NucFeatureTemplate } from '../Template'
import './_index.scss'

export function NucConversion(): JSX.Element {
  const features: FeatureItemInterface[] = [
    {
      icon: 'mdi:cursor-default-click-outline',
      label: t('features-conversion-feat-cta'),
    },
    { icon: 'mdi:target', label: t('features-conversion-feat-placement') },
    { icon: 'mdi:chart-line', label: t('features-conversion-feat-layouts') },
  ]

  return (
    <NucFeatureTemplate
      sectionId="conversion"
      badge={t('features-conversion-badge')}
      headingPrefix={t('features-conversion-heading-prefix')}
      headingHighlight={t('features-conversion-heading-highlight')}
      description={t('features-conversion-description')}
      features={features}
      visualPosition="right"
    >
      <div className="conversion-preview">
        <div className="preview-metrics">
          <div className="metric-item">
            <div className="metric-icon">
              <AdIcon icon="mdi:cursor-default-click" />
            </div>
            <div className="metric-info">
              <span className="metric-value">+47%</span>
              <span className="metric-label">
                {t('features-conversion-metric-clicks')}
              </span>
            </div>
          </div>
          <div className="metric-item">
            <div className="metric-icon">
              <AdIcon icon="mdi:account-plus" />
            </div>
            <div className="metric-info">
              <span className="metric-value">+89%</span>
              <span className="metric-label">
                {t('features-conversion-metric-leads')}
              </span>
            </div>
          </div>
          <div className="metric-item highlight-metric">
            <div className="metric-icon">
              <AdIcon icon="mdi:cash-multiple" />
            </div>
            <div className="metric-info">
              <span className="metric-value">+62%</span>
              <span className="metric-label">
                {t('features-conversion-metric-revenue')}
              </span>
            </div>
          </div>
        </div>
        <div className="preview-cta-demo">
          <div className="cta-example">
            <span className="cta-label">{t('features-conversion-before')}</span>
            <div className="cta-button old">
              {t('features-conversion-old-cta')}
            </div>
          </div>
          <div className="cta-arrow">
            <AdIcon icon="mdi:arrow-right" />
          </div>
          <div className="cta-example">
            <span className="cta-label">{t('features-conversion-after')}</span>
            <div className="cta-button new">
              <AdIcon icon="mdi:rocket-launch" />
              {t('features-conversion-new-cta')}
            </div>
          </div>
        </div>
      </div>
    </NucFeatureTemplate>
  )
}

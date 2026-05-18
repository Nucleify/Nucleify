'use client'

import type { JSX } from 'react'

import { AdIcon, t } from 'nucleify'

import type { FeatureItemInterface } from '../Template'
import { NucFeatureTemplate } from '../Template'
import './_index.scss'

export function NucSupport(): JSX.Element {
  const features: FeatureItemInterface[] = [
    {
      icon: 'mdi:clock-check-outline',
      label: t('features-support-feat-response'),
    },
    { icon: 'mdi:wrench-outline', label: t('features-support-feat-updates') },
    {
      icon: 'mdi:shield-check-outline',
      label: t('features-support-feat-monitoring'),
    },
  ]

  return (
    <NucFeatureTemplate
      sectionId="support"
      badge={t('features-support-badge')}
      headingPrefix={t('features-support-heading-prefix')}
      headingHighlight={t('features-support-heading-highlight')}
      description={t('features-support-description')}
      features={features}
      visualPosition="right"
    >
      <div className="support-preview">
        <div className="support-header">
          <AdIcon icon="mdi:headset" />
          <span>{t('features-support-inbox-title')}</span>
          <span className="support-status">
            <span className="status-dot" />
            {t('features-support-inbox-online')}
          </span>
        </div>

        <div className="support-messages">
          <div className="support-msg">
            <div className="msg-avatar resolved">
              <AdIcon icon="mdi:check" />
            </div>
            <div className="msg-content">
              <div className="msg-top">
                <span className="msg-sender">
                  {t('features-support-msg-1-sender')}
                </span>
                <span className="msg-time">2 min</span>
              </div>
              <span className="msg-text">
                {t('features-support-msg-1-text')}
              </span>
              <span className="msg-tag resolved">
                {t('features-support-tag-resolved')}
              </span>
            </div>
          </div>

          <div className="support-msg active">
            <div className="msg-avatar active">
              <AdIcon icon="mdi:message-reply-text" />
            </div>
            <div className="msg-content">
              <div className="msg-top">
                <span className="msg-sender">
                  {t('features-support-msg-2-sender')}
                </span>
                <span className="msg-time">15 min</span>
              </div>
              <span className="msg-text">
                {t('features-support-msg-2-text')}
              </span>
              <span className="msg-tag active">
                {t('features-support-tag-replied')}
              </span>
            </div>
          </div>

          <div className="support-msg">
            <div className="msg-avatar resolved">
              <AdIcon icon="mdi:check" />
            </div>
            <div className="msg-content">
              <div className="msg-top">
                <span className="msg-sender">
                  {t('features-support-msg-3-sender')}
                </span>
                <span className="msg-time">1h</span>
              </div>
              <span className="msg-text">
                {t('features-support-msg-3-text')}
              </span>
              <span className="msg-tag resolved">
                {t('features-support-tag-resolved')}
              </span>
            </div>
          </div>
        </div>

        <div className="support-footer">
          <AdIcon icon="mdi:clock-fast" />
          <span>{t('features-support-avg-response')}</span>
        </div>
      </div>
    </NucFeatureTemplate>
  )
}

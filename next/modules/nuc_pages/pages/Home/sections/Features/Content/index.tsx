'use client'

import type { JSX } from 'react'

import { AdIcon, t } from 'nucleify'

import type { FeatureItemInterface } from '../Template'
import { NucFeatureTemplate } from '../Template'
import './_index.scss'

export function NucContent(): JSX.Element {
  const features: FeatureItemInterface[] = [
    { icon: 'mdi:pencil-outline', label: t('features-content-feat-edit') },
    {
      icon: 'mdi:image-plus-outline',
      label: t('features-content-feat-images'),
    },
    {
      icon: 'mdi:rocket-launch-outline',
      label: t('features-content-feat-publish'),
    },
  ]

  return (
    <NucFeatureTemplate
      sectionId="content-management"
      badge={t('features-content-badge')}
      headingPrefix={t('features-content-heading-prefix')}
      headingHighlight={t('features-content-heading-highlight')}
      description={t('features-content-description')}
      features={features}
      visualPosition="left"
    >
      <div className="content-preview">
        <div className="preview-header">
          <div className="preview-dot" />
          <div className="preview-dot" />
          <div className="preview-dot" />
        </div>
        <div className="preview-body">
          <div className="preview-sidebar">
            <div className="sidebar-item active">
              <AdIcon icon="mdi:file-document-outline" />
            </div>
            <div className="sidebar-item">
              <AdIcon icon="mdi:image-outline" />
            </div>
            <div className="sidebar-item">
              <AdIcon icon="mdi:cog-outline" />
            </div>
          </div>
          <div className="preview-content">
            <div className="content-block title" />
            <div className="content-block text" />
            <div className="content-block text short" />
            <div className="content-block image" />
          </div>
        </div>
      </div>
    </NucFeatureTemplate>
  )
}

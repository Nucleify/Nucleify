'use client'

import type { JSX, ReactNode } from 'react'

import { AdCard, AdIcon } from 'nucleify'

import type { FeatureTemplateInterface } from './interfaces'
import './_index.scss'

interface Props extends FeatureTemplateInterface {
  children: ReactNode
}

export function NucFeatureTemplate({
  sectionId,
  badge,
  headingPrefix,
  headingHighlight,
  description,
  features,
  visualPosition = 'right',
  children,
}: Props): JSX.Element {
  const sectionClassName =
    visualPosition === 'left'
      ? 'feature-section visual-left'
      : 'feature-section'

  return (
    <section id={sectionId} className={sectionClassName}>
      <div className="feature-container container">
        <div className="feature-info">
          <span className="feature-badge">{badge}</span>
          <h2 className="feature-heading">
            {headingPrefix}
            <span className="highlight"> {headingHighlight}</span>
          </h2>
          <p className="feature-description">{description}</p>
          <div className="feature-list">
            {features.map((feature) => (
              <div key={feature.label} className="feature-item">
                <AdIcon icon={feature.icon} />
                <span>{feature.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="feature-visual">
          <AdCard className="nuc-card-base feature-card">{children}</AdCard>
        </div>
      </div>
    </section>
  )
}

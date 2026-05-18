'use client'

import type { JSX } from 'react'

import { AdIcon, t } from 'nucleify'
import './_index.scss'

export function NucDevHighlights(): JSX.Element {
  const overridePoints = [
    t('dev-hl-overrides-p1'),
    t('dev-hl-overrides-p2'),
    t('dev-hl-overrides-p3'),
  ]
  const backofficePoints = [
    t('dev-hl-backoffice-p1'),
    t('dev-hl-backoffice-p2'),
    t('dev-hl-backoffice-p3'),
  ]
  const themingPoints = [
    t('dev-hl-theming-p1'),
    t('dev-hl-theming-p2'),
    t('dev-hl-theming-p3'),
  ]
  const responsivePoints = [
    t('dev-hl-responsive-p1'),
    t('dev-hl-responsive-p2'),
    t('dev-hl-responsive-p3'),
  ]
  const palettePrimary = ['#1d4ed8', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd']
  const paletteSecondary = [
    '#0f172a',
    '#172554',
    '#1e3a8a',
    '#1d4ed8',
    '#2563eb',
  ]

  return (
    <section id="dev-highlights" className="dev-highlights">
      <div className="dev-hl-bg">
        <div className="dev-hl-grid-pattern" />
        <div className="dev-hl-orb dev-hl-orb-1" />
        <div className="dev-hl-orb dev-hl-orb-2" />
      </div>

      <div className="container">
        <div className="dev-hl-bento">
          <div className="dev-hl-card dev-hl-card-wide dev-hl-card-1">
            <div className="dev-hl-card-content">
              <span className="dev-hl-tag">{t('dev-hl-overrides-title')}</span>
              <h3>{t('dev-hl-overrides-desc')}</h3>
              <ul className="dev-hl-list">
                {overridePoints.map((point) => (
                  <li key={point}>
                    <AdIcon icon="mdi:chevron-right" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dev-hl-visual dev-hl-visual-layers">
              <div className="dev-hl-layer dev-hl-layer-3">
                <span className="dev-hl-layer-label">your-app/</span>
                <div className="dev-hl-layer-line" />
                <div className="dev-hl-layer-line dev-hl-layer-line-short" />
              </div>
              <div className="dev-hl-layer dev-hl-layer-2">
                <span className="dev-hl-layer-label">overrides/</span>
                <div className="dev-hl-layer-line" />
                <div className="dev-hl-layer-line" />
              </div>
              <div className="dev-hl-layer dev-hl-layer-1">
                <span className="dev-hl-layer-label">core/</span>
                <div className="dev-hl-layer-line" />
                <div className="dev-hl-layer-line dev-hl-layer-line-short" />
                <div className="dev-hl-layer-line" />
              </div>
            </div>
          </div>

          <div className="dev-hl-card dev-hl-card-2">
            <div className="dev-hl-visual dev-hl-visual-dash">
              <div className="dev-hl-dash-sidebar">
                <div className="dev-hl-dash-dot" />
                <div className="dev-hl-dash-dot" />
                <div className="dev-hl-dash-dot" />
                <div className="dev-hl-dash-dot" />
              </div>
              <div className="dev-hl-dash-main">
                <div className="dev-hl-dash-bar-row">
                  <div className="dev-hl-dash-bar" style={{ width: '80%' }} />
                  <div className="dev-hl-dash-bar" style={{ width: '55%' }} />
                  <div className="dev-hl-dash-bar" style={{ width: '70%' }} />
                </div>
                <div className="dev-hl-dash-cards">
                  <div />
                  <div />
                  <div />
                </div>
              </div>
            </div>
            <div className="dev-hl-card-content">
              <span className="dev-hl-tag">{t('dev-hl-backoffice-title')}</span>
              <p>{t('dev-hl-backoffice-desc')}</p>
              <ul className="dev-hl-list">
                {backofficePoints.map((point) => (
                  <li key={point}>
                    <AdIcon icon="mdi:chevron-right" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="dev-hl-card dev-hl-card-3">
            <div className="dev-hl-visual dev-hl-visual-palette">
              <div className="dev-hl-swatch-row">
                {palettePrimary.map((color) => (
                  <div
                    key={color}
                    className="dev-hl-swatch"
                    style={{ background: color }}
                  />
                ))}
              </div>
              <div className="dev-hl-swatch-row">
                {paletteSecondary.map((color) => (
                  <div
                    key={color}
                    className="dev-hl-swatch"
                    style={{ background: color }}
                  />
                ))}
              </div>
              <div className="dev-hl-mode-toggle">
                <AdIcon icon="mdi:white-balance-sunny" />
                <div className="dev-hl-mode-track">
                  <div className="dev-hl-mode-thumb" />
                </div>
                <AdIcon icon="mdi:moon-waning-crescent" />
              </div>
            </div>
            <div className="dev-hl-card-content">
              <span className="dev-hl-tag">{t('dev-hl-theming-title')}</span>
              <p>{t('dev-hl-theming-desc')}</p>
              <ul className="dev-hl-list">
                {themingPoints.map((point) => (
                  <li key={point}>
                    <AdIcon icon="mdi:chevron-right" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="dev-hl-card dev-hl-card-wide dev-hl-card-4">
            <div className="dev-hl-card-content">
              <span className="dev-hl-tag">{t('dev-hl-responsive-title')}</span>
              <h3>{t('dev-hl-responsive-desc')}</h3>
              <ul className="dev-hl-list">
                {responsivePoints.map((point) => (
                  <li key={point}>
                    <AdIcon icon="mdi:chevron-right" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dev-hl-visual dev-hl-visual-devices">
              <div className="dev-hl-device dev-hl-device-desktop">
                <div className="dev-hl-device-bar">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="dev-hl-device-screen">
                  <div />
                  <div />
                  <div />
                </div>
              </div>
              <div className="dev-hl-device dev-hl-device-tablet">
                <div className="dev-hl-device-screen">
                  <div />
                  <div />
                </div>
              </div>
              <div className="dev-hl-device dev-hl-device-phone">
                <div className="dev-hl-device-screen">
                  <div />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

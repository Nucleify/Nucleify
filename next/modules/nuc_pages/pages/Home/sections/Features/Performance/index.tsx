'use client'

import { type JSX, useEffect, useState } from 'react'

import { t } from 'nucleify'

import { NucFeatureTemplate } from '../Template'

import type { FeatureItemInterface } from '../Template/interfaces'
import './_index.scss'

interface Metric {
  id: string
  label: string
  score: number
}

function getScoreColor(score: number): string {
  if (score >= 90) return '#3b82f6'
  if (score >= 50) return '#eab308'
  return '#ef4444'
}

function getIsDarkMode(): boolean {
  if (typeof document === 'undefined') return true

  const html = document.documentElement
  if (html.classList.contains('p-dark')) return true
  if (html.classList.contains('p-light')) return false

  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? true
}

export function NucPerformance(): JSX.Element {
  const [isDark, setIsDark] = useState<boolean>(getIsDarkMode)

  useEffect(() => {
    const html = document.documentElement
    setIsDark(getIsDarkMode())

    const observer = new MutationObserver(() => {
      setIsDark(getIsDarkMode())
    })

    observer.observe(html, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  const trackColor = isDark ? 'rgba(59, 130, 246, 0.35)' : '#bfdbfe'

  const features: FeatureItemInterface[] = [
    { icon: 'mdi:server-network', label: t('features-performance-feat-cdn') },
    { icon: 'mdi:cached', label: t('features-performance-feat-cache') },
    {
      icon: 'mdi:cellphone-check',
      label: t('features-performance-feat-mobile'),
    },
  ]

  const metrics: Metric[] = [
    {
      id: 'performance',
      label: t('features-performance-metric-perf'),
      score: 97,
    },
    {
      id: 'accessibility',
      label: t('features-performance-metric-a11y'),
      score: 100,
    },
    {
      id: 'best-practices',
      label: t('features-performance-metric-bp'),
      score: 100,
    },
    { id: 'seo', label: t('features-performance-metric-seo'), score: 100 },
  ]

  return (
    <NucFeatureTemplate
      sectionId="performance"
      badge={t('features-performance-badge')}
      headingPrefix={t('features-performance-heading-prefix')}
      headingHighlight={t('features-performance-heading-highlight')}
      description={t('features-performance-description')}
      features={features}
      visualPosition="left"
    >
      <div className="speedometers-grid">
        {metrics.map((metric) => (
          <div key={metric.id} className="speedometer-item">
            <div className="mini-speedometer">
              <svg viewBox="0 0 100 60" className="speedometer-svg">
                <path
                  d="M 10 55 A 40 40 0 0 1 90 55"
                  fill="none"
                  stroke={trackColor}
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M 10 55 A 40 40 0 0 1 90 55"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={125.6}
                  strokeDashoffset={125.6 * (1 - metric.score / 100)}
                />
              </svg>
              <span
                className="speedometer-value"
                style={{ color: getScoreColor(metric.score) }}
              >
                {metric.score}
              </span>
            </div>
            <span className="speedometer-label">{metric.label}</span>
          </div>
        ))}
      </div>
    </NucFeatureTemplate>
  )
}

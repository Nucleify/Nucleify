'use client'

import { usePathname } from 'next/navigation'
import type { JSX } from 'react'
import { useMemo, useState } from 'react'

import {
  AdIcon,
  demoLogin,
  NucGridBackground,
  NucSubmitButton,
  navigateToUrl,
  t,
} from 'nucleify'
import './_index.scss'

export function NucDevStart(): JSX.Element {
  const pathname = usePathname()
  const [demoLoading, setDemoLoading] = useState(false)
  const lang = useMemo(
    () => pathname.split('/').filter(Boolean)[0] || 'en',
    [pathname]
  )

  const features = [
    {
      icon: 'mdi:puzzle-outline',
      title: t('dev-feature-modules-title'),
      desc: t('dev-feature-modules-desc'),
    },
    {
      icon: 'mdi:view-dashboard-edit-outline',
      title: t('dev-feature-pagebuilder-title'),
      desc: t('dev-feature-pagebuilder-desc'),
    },
    {
      icon: 'mdi:atom-variant',
      title: t('dev-feature-atomic-title'),
      desc: t('dev-feature-atomic-desc'),
    },
  ]

  async function handleDemoLogin(): Promise<void> {
    setDemoLoading(true)
    try {
      await demoLogin()
    } finally {
      setDemoLoading(false)
    }
  }

  return (
    <section id="dev-start" className="dev-start">
      <NucGridBackground className="dev-start-grid" />
      <div className="container dev-start-inner">
        <div className="dev-start-left">
          <h1 className="dev-start-heading">{t('dev-header')}</h1>
          <p className="dev-start-description">{t('dev-description')}</p>

          <div className="dev-start-features">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="dev-feature-item"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="dev-feature-icon">
                  <AdIcon icon={feature.icon} />
                </div>
                <div className="dev-feature-content">
                  <span>{feature.title}</span>
                  <p>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="dev-start-cta">
            <NucSubmitButton
              variant="primary"
              disabled={demoLoading}
              icon={demoLoading ? 'mdi:loading' : 'mdi:play-circle-outline'}
              label={t('dev-cta-demo')}
              onClick={() => {
                void handleDemoLogin()
              }}
            />
            <NucSubmitButton
              variant="secondary"
              icon="mdi:arrow-right"
              label={t('dev-cta-pricing')}
              onClick={() => navigateToUrl(`/${lang}/offer`)}
            />
          </div>
        </div>

        <div className="dev-start-right">
          <div className="dev-terminal">
            <div className="dev-terminal-header">
              <div className="dev-terminal-dots">
                <span />
                <span />
                <span />
              </div>
              <span className="dev-terminal-title">terminal</span>
            </div>
            <div className="dev-terminal-body">
              <div className="dev-terminal-line">
                <span className="dev-terminal-prompt">$</span>
                <span className="dev-terminal-cmd">make next</span>
              </div>
              <div className="dev-terminal-line dev-terminal-output">
                <span>{t('dev-terminal-creating')}</span>
              </div>
              <div className="dev-terminal-line dev-terminal-output">
                <span>{t('dev-terminal-installing')}</span>
              </div>
              <div className="dev-terminal-line dev-terminal-output">
                <AdIcon icon="mdi:docker" />
                <span>{t('dev-terminal-docker')}</span>
              </div>
              <div className="dev-terminal-line dev-terminal-output dev-terminal-success">
                <AdIcon icon="mdi:check-circle" />
                <span>{t('dev-terminal-ready')}</span>
              </div>
              <div className="dev-terminal-line dev-terminal-output dev-terminal-success">
                <AdIcon icon="mdi:rocket-launch" />
                <span>http://localhost:3000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

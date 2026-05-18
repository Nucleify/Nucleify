'use client'

import { usePathname, useRouter } from 'next/navigation'
import type { JSX } from 'react'

import { NucGridBackground as NucGridBackgroundBase, t } from 'nucleify'

import './_index.scss'

const NucGridBackground = NucGridBackgroundBase as unknown as () => JSX.Element

export function NucError404Page(): JSX.Element {
  const pathname = usePathname()
  const router = useRouter()

  const getHomeUrl = (): string => {
    const lang = pathname?.split('/').filter(Boolean)[0] || 'en'
    return `/${lang}/home`
  }

  const goHome = (): void => {
    router.push(getHomeUrl())
  }

  const goBack = (): void => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back()
      return
    }
    router.push(getHomeUrl())
  }

  return (
    <div id="error-404">
      <div className="error-404-container">
        <NucGridBackground />
        <div className="error-404-content container">
          <div className="error-404-number">404</div>
          <h1 className="error-404-title">{t('error-404-title')}</h1>
          <p className="error-404-message">{t('error-404-message')}</p>
          <div className="error-404-actions">
            <button
              className="nuc-submit-button"
              onClick={goHome}
              type="button"
            >
              {t('error-404-back-home')}
            </button>
            <button
              className="nuc-submit-button"
              onClick={goBack}
              type="button"
            >
              {t('error-404-go-back')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { usePathname, useRouter } from 'next/navigation'
import type { JSX } from 'react'

import { AdIcon, NucGridBackground, NucSubmitButton, t } from 'nucleify'

import './_index.scss'

export function NucThankYouPage(): JSX.Element {
  const pathname = usePathname()
  const router = useRouter()

  const navigateToHome = (): void => {
    const lang = pathname?.split('/').filter(Boolean)[0] || 'en'
    router.push(`/${lang}/home`)
  }

  return (
    <div id="thank-you">
      <div className="thank-you-container">
        <NucGridBackground />
        <div className="thank-you-content container">
          <div className="thank-you-icon">
            <AdIcon icon="mdi:check-circle" />
          </div>
          <h1 className="thank-you-title">{t('thank-you-title')}</h1>
          <p className="thank-you-message">{t('thank-you-message')}</p>
          <div className="thank-you-actions">
            <NucSubmitButton
              label={t('thank-you-back-home')}
              icon="mdi:home"
              className="thank-you-button"
              onClick={navigateToHome}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

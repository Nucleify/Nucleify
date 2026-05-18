'use client'

import type { JSX } from 'react'

import { NucSectionContact, NucSectionFaq, t } from 'nucleify'

import { NucHomeFeatures, NucHomeResults, NucHomeStart } from './sections'

import './_index.scss'

export function NucHomePage(): JSX.Element {
  return (
    <div className="home-container">
      <NucHomeStart />
      <NucHomeResults />
      <NucSectionFaq site="home" />
      <NucHomeFeatures />
      <NucSectionContact />
      <span style={{ display: 'none' }}>{t('home')}</span>
    </div>
  )
}

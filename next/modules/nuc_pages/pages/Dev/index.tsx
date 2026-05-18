'use client'

import type { JSX } from 'react'

import { NucSectionContact, t } from 'nucleify'

import { NucDevStart } from './sections'
import { NucDevDX } from './sections/DX'
import { NucDevHighlights } from './sections/Highlights'
import { NucDevModules } from './sections/Modules'
import { NucDevStack } from './sections/Stack'
import './_index.scss'

export function NucDevPage(): JSX.Element {
  return (
    <div className="dev-container">
      <NucDevStart />
      <NucDevStack />
      <NucDevHighlights />
      <NucDevDX />
      <NucDevModules />
      <NucSectionContact />
      <span style={{ display: 'none' }}>{t('dev')}</span>
    </div>
  )
}

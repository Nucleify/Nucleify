'use client'

import type { JSX } from 'react'

import { t } from 'nucleify'

import { NucStructureAnimation } from './'
import './_index.scss'

export function NucStructure(): JSX.Element {
  return (
    <section id="structure">
      <div className="structure-container">
        <div className="content">
          <div className="animation-container">
            <NucStructureAnimation />
          </div>
          <div className="description-container">
            <h3 className="title">
              <span className="shiny">
                {t('innovations-structure-title-highlight')}&nbsp;
              </span>
              <span>{t('innovations-structure-title')}</span>
            </h3>
            <p className="description">
              {t('innovations-structure-description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

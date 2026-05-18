'use client'

import type { JSX } from 'react'

import { NucSectionContact } from 'nucleify'

import {
  NucProcessGuarantees,
  NucProcessStart,
  NucProcessSteps,
} from './sections'
import './_index.scss'

export function NucProcessPage(): JSX.Element {
  return (
    <div className="process-container">
      <NucProcessStart />
      <NucProcessSteps />
      <NucProcessGuarantees />
      <NucSectionContact />
    </div>
  )
}

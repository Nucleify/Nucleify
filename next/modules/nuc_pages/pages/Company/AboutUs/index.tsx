'use client'

import type { JSX } from 'react'

import { NucSectionContact } from 'nucleify'

import {
  NucAboutMission,
  NucAboutProcess,
  NucAboutStart,
  NucAboutValues,
} from './sections'
import './_index.scss'

export function NucAboutUsPage(): JSX.Element {
  return (
    <div className="about-us-container">
      <NucAboutStart />
      <NucAboutMission />
      <NucAboutValues />
      <NucAboutProcess />
      <NucSectionContact />
    </div>
  )
}

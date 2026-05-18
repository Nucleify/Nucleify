'use client'

import type { JSX } from 'react'

import { NucContent } from './Content'
import { NucConversion } from './Conversion'
import { NucPerformance } from './Performance'
import { NucSupport } from './Support'
import './_index.scss'

export function NucFeatures(): JSX.Element {
  return (
    <section id="features">
      <NucContent />
      <NucConversion />
      <NucPerformance />
      <NucSupport />
    </section>
  )
}

'use client'

import type { JSX } from 'react'

import { NucStructure, NucTechnologies } from './'
import './_index.scss'

export function NucInnovations(): JSX.Element {
  return (
    <section id="innovations">
      <NucTechnologies />
      <NucStructure />
    </section>
  )
}

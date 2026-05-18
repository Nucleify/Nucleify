'use client'

import type { JSX } from 'react'

import './_index.scss'

export function NucStructureAnimation(): JSX.Element {
  return (
    <div className="nuc-structure-animation">
      <div className="nuc-structure-animation-core" />
      <div className="nuc-structure-animation-ring" />
      <div className="nuc-structure-animation-ring nuc-structure-animation-ring-alt" />
    </div>
  )
}

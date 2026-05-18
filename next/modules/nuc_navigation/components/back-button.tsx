'use client'

import { useRouter } from 'next/navigation'
import type { ReactElement } from 'react'

import { AdButton } from 'nucleify'
import './_index.scss'

export function NucNavigationBackButton(): ReactElement {
  const router = useRouter()

  return (
    <AdButton
      onClick={() => router.back()}
      icon="prime:chevron-left"
      className="back-button"
      rounded
      text
    />
  )
}

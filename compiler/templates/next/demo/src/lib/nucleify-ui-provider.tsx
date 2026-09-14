'use client'

import { useEffect } from 'react'
import { setupNui } from '../../../../portable/nui'

export function NucleifyUiProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    setupNui({ palette: 'next', mode: 'light' })
  }, [])
  return children
}

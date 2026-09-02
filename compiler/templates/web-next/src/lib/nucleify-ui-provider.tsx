'use client'

import { useEffect } from 'react'
import { setupNui } from 'portable/nui'

/** Only after mount — early setupNui reorders html/body classes and breaks hydration. */
export function NucleifyUiProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    setupNui({ palette: 'next', mode: 'dark' })
  }, [])

  return (
    <>
      <nui-toast position="top-right" />
      {children}
    </>
  )
}

'use client'

import { PrimeReactProvider } from 'primereact/api'
import { useEffect } from 'react'

import {
  AdLogoSymbol,
  AdToast,
  colorsClientPlugin,
  initNucGlobals,
} from 'nucleify'

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initNucGlobals()
    colorsClientPlugin()
  }, [])

  return (
    <PrimeReactProvider value={{ ripple: true }}>
      <AdLogoSymbol />
      <AdToast />
      {children}
    </PrimeReactProvider>
  )
}

'use client'

import { PrimeReactProvider } from 'primereact/api'
import { useEffect } from 'react'

import {
  AdLogoSymbol,
  AdToast,
  colorsClientPlugin,
  initNucGlobals,
} from 'nucleify'

import { initNuiRegistry } from '../../.config/nui-registry'

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initNucGlobals()
    colorsClientPlugin()
    void initNuiRegistry('next')
  }, [])

  return (
    <PrimeReactProvider value={{ ripple: true }}>
      <AdLogoSymbol />
      <AdToast />
      {children}
    </PrimeReactProvider>
  )
}

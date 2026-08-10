'use client'

import { useEffect } from 'react'
import { applyTheme } from 'nucleify-ui/theme'
import 'nucleify-ui/styles/variables.css'
import 'nucleify-ui/styles/global.css'
import 'nucleify-ui/components/nui-button'
import 'nucleify-ui/components/nui-icon'

export function NucleifyUiProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    applyTheme('next', 'light')
  }, [])
  return children
}

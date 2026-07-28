'use client'

import { useEffect } from 'react'

import { applyTheme, type ThemeMode } from 'nucleify-ui/theme'

import 'nucleify-ui/styles/variables.css'
import 'nucleify-ui/styles/global.css'

import 'nucleify-ui/components/nui-button'
import 'nucleify-ui/components/nui-card'
import 'nucleify-ui/components/nui-dialog'
import 'nucleify-ui/components/nui-heading'
import 'nucleify-ui/components/nui-icon'
import 'nucleify-ui/components/nui-logo'
import 'nucleify-ui/components/nui-toast'

function resolveThemeMode(): ThemeMode {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.classList.contains('p-dark')
    ? 'dark'
    : 'light'
}

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    applyTheme('next', resolveThemeMode())

    const observer = new MutationObserver(() => {
      applyTheme('next', resolveThemeMode())
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <nui-toast position="top-right" />
      {children}
    </>
  )
}

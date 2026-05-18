'use client'

import type { JSX } from 'react'

import { AdButton } from 'nucleify'

import { useDarkMode } from '../../utils'

import './_index.scss'

export function NucDarkModeToggler(): JSX.Element {
  const { isDark, toggleDarkMode } = useDarkMode()

  return (
    <AdButton
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="nuc-dark-mode-toggler"
      icon={isDark ? 'prime:moon' : 'prime:sun'}
      rounded
      severity="secondary"
      text
      onClick={toggleDarkMode}
    />
  )
}

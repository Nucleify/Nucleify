'use client'

import type { JSX } from 'react'
import { useEffect, useState } from 'react'

import { AdButton } from 'nucleify'

const COOKIE_KEY = 'nuc-dark-mode'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365
const COOKIE_REGEX = /(?:^|;\s*)nuc-dark-mode=([^;]*)/

const DARK_CLASS = 'p-dark'

function readBrowserCookie(): boolean {
  const match = document.cookie.match(COOKIE_REGEX)
  return match ? match[1] !== 'false' : true
}

function writeCookie(value: boolean): void {
  document.cookie = `${COOKIE_KEY}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`
}

function applyDarkMode(value: boolean): void {
  const html = document.documentElement
  if (value) {
    html.classList.add(DARK_CLASS)
  } else {
    html.classList.remove(DARK_CLASS)
  }
}

export function NucNavbarDarkModeToggler(): JSX.Element {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const actual = readBrowserCookie()
    setIsDark(actual)
    applyDarkMode(actual)
  }, [])

  function toggleDarkMode(): void {
    setIsDark((prev) => {
      const next = !prev
      writeCookie(next)
      applyDarkMode(next)
      return next
    })
  }

  return (
    <AdButton
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="navbar-dark-mode-toggler"
      icon={isDark ? 'prime:moon' : 'prime:sun'}
      rounded
      severity="secondary"
      text
      onClick={toggleDarkMode}
    />
  )
}

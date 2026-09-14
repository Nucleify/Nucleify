'use client'

import type { UseDarkModeInterface } from 'nucleify'
import { applyDarkMode } from 'nucleify'

import { useCallback, useEffect, useState } from 'react'

const COOKIE_KEY = 'nuc-dark-mode'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365
const COOKIE_REGEX = /(?:^|;\s*)nuc-dark-mode=([^;]*)/

function readBrowserCookie(): boolean {
  const match = document.cookie.match(COOKIE_REGEX)
  return match ? match[1] !== 'false' : true
}

function writeBrowserCookie(value: boolean): void {
  document.cookie = `${COOKIE_KEY}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`
}

export function useDarkMode(): UseDarkModeInterface {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const actual = readBrowserCookie()
    setIsDark(actual)
    applyDarkMode(actual)
  }, [])

  const toggleDarkMode = useCallback((): void => {
    setIsDark((prev) => {
      const next = !prev
      writeBrowserCookie(next)
      applyDarkMode(next)
      return next
    })
  }, [])

  return { isDark, toggleDarkMode }
}

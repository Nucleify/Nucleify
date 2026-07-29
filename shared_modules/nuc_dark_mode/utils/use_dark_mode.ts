import { useCookie } from 'nuxt/app'
import type { Ref } from 'vue'
import { watch } from 'vue'

import type { UseDarkModeInterface } from 'nucleify'
import { applyDarkMode } from 'nucleify'

const COOKIE_KEY = 'nuc-dark-mode'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365
const COOKIE_REGEX = /(?:^|;\s*)nuc-dark-mode=([^;]*)/

let clientWatchRegistered = false

function readBrowserCookie(): boolean {
  const match = document.cookie.match(COOKIE_REGEX)
  return match ? match[1] !== 'false' : true
}

export function useDarkMode(): UseDarkModeInterface {
  const isDark = useCookie<boolean>(COOKIE_KEY, {
    default: () => true,
    maxAge: COOKIE_MAX_AGE,
    path: '/',
    sameSite: 'lax',
  }) as unknown as Ref<boolean>

  if (import.meta.client) {
    const actual = readBrowserCookie()
    if (isDark.value !== actual) {
      isDark.value = actual
    }

    applyDarkMode(isDark.value)

    if (!clientWatchRegistered) {
      watch(isDark, (value) => {
        applyDarkMode(value)
      })
      clientWatchRegistered = true
    }
  }

  function toggleDarkMode(): void {
    isDark.value = !isDark.value
  }

  return { isDark, toggleDarkMode }
}

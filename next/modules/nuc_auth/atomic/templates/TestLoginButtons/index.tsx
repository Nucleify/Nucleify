'use client'

import type { JSX } from 'react'

import { getCurrentLang, navigateToUrl, testLogin } from 'nucleify'

export function NucTestLoginButtons(): JSX.Element {
  async function loginAndGo(role: 'admin' | 'user'): Promise<void> {
    await testLogin(role)
    const lang = getCurrentLang()
    navigateToUrl(`/${lang}/settings#modules`)
  }

  return (
    <div>
      <button type="button" onClick={() => void loginAndGo('admin')}>
        Admin
      </button>
      <button type="button" onClick={() => void loginAndGo('user')}>
        User
      </button>
    </div>
  )
}

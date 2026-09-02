import { describe, expect, it } from 'vitest'

import * as nucleify from 'nucleify'
import { setColorWithUserSuffix } from 'nucleify'

describe('setColorWithUserSuffix', (): void => {
  it('should set cookie and localStorage with user suffix', (): void => {
    const key = 'task-c'
    const value = '#ff0000'
    const userKey = `${key}-u`
    const storageKey = nucleify.getColorStorageKey(userKey)

    nucleify.cookieSetItem(storageKey, '')
    nucleify.localStorageSetItem(storageKey, '')

    setColorWithUserSuffix(key, value)

    expect(document.cookie.includes(`${storageKey}=${value}`)).toBe(true)
    expect(localStorage.getItem(storageKey)).toBe(value)
  })
})

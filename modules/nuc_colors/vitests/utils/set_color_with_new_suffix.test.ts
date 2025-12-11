import { describe, expect, it } from 'vitest'

import * as atomic from 'atomic'
import { setColorWithNewSuffix } from 'atomic'

describe('setColorWithNewSuffix', (): void => {
  it('should set cookie, localStorage, and CSS variable with new suffix', (): void => {
    const key = 'task-item-color'
    const value = '#ff0000'
    const newKey = `${key}-new`

    atomic.cookieSetItem(newKey, '')
    atomic.localStorageSetItem(newKey, '')
    document.documentElement.style.removeProperty(`--${newKey}`)

    setColorWithNewSuffix(key, value)

    expect(document.cookie.includes(`${newKey}=${value}`)).toBe(true)

    expect(localStorage.getItem(newKey)).toBe(value)

    const cssValue = getComputedStyle(document.documentElement)
      .getPropertyValue(`--${newKey}`)
      .trim()

    expect(cssValue).toBe(value)
  })
})

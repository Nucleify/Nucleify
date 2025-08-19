import { beforeEach, describe, expect, it } from 'vitest'

import * as atomic from 'atomic'

describe('localStorage.setItem', (): void => {
  beforeEach((): void => {
    globalThis.__TEST_CLIENT__ = true

    localStorage.clear()
  })

  it('sets the item', (): void => {
    atomic.localStorageSetItem('key', 'value')

    const storedValue = localStorage.getItem('key')

    expect(storedValue).toBe('value')
  })
})

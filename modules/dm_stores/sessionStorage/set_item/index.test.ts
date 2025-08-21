import { beforeEach, describe, expect, it } from 'vitest'

import * as atomic from 'atomic'

describe('sessionStorageSetItem', (): void => {
  beforeEach((): void => {
    globalThis.__TEST_CLIENT__ = true

    sessionStorage.clear()
  })

  it('sets the item', (): void => {
    atomic.sessionStorageSetItem('key', 'value')

    const storedValue = sessionStorage.getItem('key')

    expect(storedValue).toBe('value')
  })
})

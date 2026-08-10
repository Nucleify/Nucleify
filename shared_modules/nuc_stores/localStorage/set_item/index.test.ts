import { beforeEach, describe, expect, it } from 'vitest'

import * as nucleify from 'nucleify'

describe('localStorageSetItem', (): void => {
  beforeEach((): void => {
    globalThis.__TEST_CLIENT__ = true

    localStorage.clear()
  })

  it('sets the item', (): void => {
    nucleify.localStorageSetItem('key', 'value')

    const storedValue = localStorage.getItem('key')

    expect(storedValue).toBe('value')
  })
})

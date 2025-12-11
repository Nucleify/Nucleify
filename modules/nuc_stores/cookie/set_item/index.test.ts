import { beforeEach, describe, expect, it } from 'vitest'

import * as atomic from 'atomic'

describe('cookieSetItem', (): void => {
  beforeEach((): void => {
    globalThis.__TEST_CLIENT__ = true

    document.cookie = ''
  })

  it('sets the item', (): void => {
    atomic.cookieSetItem('key', 'value')

    const storedValue = document.cookie

    expect(storedValue).toBe('key=value')
  })
})

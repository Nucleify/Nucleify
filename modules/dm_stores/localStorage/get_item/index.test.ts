import { beforeEach, describe, expect, it } from 'vitest'

import * as atomic from 'atomic'

describe('localStorageGetItem', (): void => {
  beforeEach((): void => {
    globalThis.__TEST_CLIENT__ = true

    localStorage.clear()
  })

  it('returns value when key exists', (): void => {
    localStorage.setItem('key', 'stored')

    const result = atomic.localStorageGetItem('key')

    expect(result).toBe('stored')
  })

  it('returns undefined when key is missing', (): void => {
    const result = atomic.localStorageGetItem('missing')

    expect(result).toBeUndefined()
  })
})

import { beforeEach, describe, expect, it } from 'vitest'

import * as atomic from 'atomic'

describe('sessionStorageGetItem', (): void => {
  beforeEach((): void => {
    globalThis.__TEST_CLIENT__ = true

    sessionStorage.clear()
  })

  it('returns value when key exists', (): void => {
    sessionStorage.setItem('key', 'stored')

    const result = atomic.sessionStorageGetItem('key')

    expect(result).toBe('stored')
  })

  it('returns undefined when key is missing', (): void => {
    const result = atomic.sessionStorageGetItem('missing')

    expect(result).toBeUndefined()
  })
})

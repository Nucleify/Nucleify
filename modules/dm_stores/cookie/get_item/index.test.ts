import { beforeEach, describe, expect, it } from 'vitest'

import * as atomic from 'atomic'

describe('cookieGetItem', (): void => {
  beforeEach((): void => {
    globalThis.__TEST_CLIENT__ = true

    document.cookie = 'key=stored'
  })

  it('returns value when key exists', (): void => {
    document.cookie = 'key=stored'

    const result = atomic.cookieGetItem('key')

    expect(result).toBe('stored')
  })

  it('returns undefined when key is missing', (): void => {
    const result = atomic.cookieGetItem('missing')

    expect(result).toBeUndefined()
  })
})

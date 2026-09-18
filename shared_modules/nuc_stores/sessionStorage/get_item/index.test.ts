import { beforeEach, describe, expect, it } from 'vitest'

import * as nucleify from 'nucleify'

describe('sessionStorageGetItem', (): void => {
  beforeEach((): void => {
    globalThis.__TEST_CLIENT__ = true

    sessionStorage.clear()
  })

  it('returns value when key exists', (): void => {
    sessionStorage.setItem('key', 'stored')

    const result = nucleify.sessionStorageGetItem('key')

    expect(result).toBe('stored')
  })

  it('returns undefined when key is missing', (): void => {
    const result = nucleify.sessionStorageGetItem('missing')

    expect(result).toBeUndefined()
  })
})

import { beforeEach, describe, expect, it } from 'vitest'

import * as nucleify from 'nucleify'

describe('cookieSetItem', (): void => {
  beforeEach((): void => {
    globalThis.__TEST_CLIENT__ = true

    document.cookie = ''
  })

  it('sets the item', (): void => {
    nucleify.cookieSetItem('key', 'value')

    const storedValue = document.cookie

    expect(storedValue).toBe('i18n_redirected=undefined; key=value')
  })
})

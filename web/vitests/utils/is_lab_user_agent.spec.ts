import { describe, expect, it } from 'vitest'

import { isLabUserAgent } from '../../src/utils/is_lab_user_agent'

describe('isLabUserAgent', () => {
  it('detects PageSpeed / Lighthouse request UAs', () => {
    expect(
      isLabUserAgent(
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Chrome-Lighthouse'
      )
    ).toBe(true)
    expect(
      isLabUserAgent(
        'Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 HeadlessChromium/153.0.8010.36'
      )
    ).toBe(true)
  })

  it('ignores stock mobile Chrome (PSI spoofs this in-page)', () => {
    expect(
      isLabUserAgent(
        'Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36'
      )
    ).toBe(false)
  })
})

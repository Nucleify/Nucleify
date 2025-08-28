import { useRoute } from 'nuxt/app'
import type { Mock } from 'vitest'
import { beforeEach, expect, it, vi } from 'vitest'

import * as atomic from 'atomic'

vi.mock('nuxt/app', async (importOriginal): Promise<Mock> => {
  return {
    ...(await importOriginal<typeof import('nuxt/app')>()),
    useRoute: vi.fn(),
  }
})

beforeEach((): void => {
  vi.clearAllMocks()
})

it('returns true when route includes given URL', (): void => {
  ;(useRoute as vi.Mock).mockReturnValue({ path: '/home/dashboard' })

  const testUrl: string = '/home'

  expect(atomic.isCurrentUrl(testUrl)).toBe(true)
})

it('returns false when route does not include given URL', (): void => {
  ;(useRoute as vi.Mock).mockReturnValue({ path: '/about' })

  const testUrl: string = '/home'

  expect(atomic.isCurrentUrl(testUrl)).toBe(false)
})

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

it('returns true when any of the urls matches current route', (): void => {
  ;(useRoute as vi.Mock).mockReturnValue({ path: '/dashboard/settings' })

  const urls: string[] = ['/home', '/dashboard']

  expect(atomic.isAnyCurrentUrl(urls)).toBe(true)
})

it('returns false when none of the urls match current route', (): void => {
  ;(useRoute as vi.Mock).mockReturnValue({ path: '/about' })

  const urls: string[] = ['/home', '/dashboard']

  expect(atomic.isAnyCurrentUrl(urls)).toBe(false)
})

import type { Mock, vi } from 'vitest'

interface VitestContextWithMocking {
  fn: typeof vi.fn
  stubGlobal: typeof vi.stubGlobal
}

export function mockGlobalFetch(
  vi: VitestContextWithMocking,
  response: unknown
): Mock {
  const mockFetch: Mock = vi.fn().mockResolvedValue(response)
  vi.stubGlobal('$fetch', mockFetch)
  return mockFetch
}

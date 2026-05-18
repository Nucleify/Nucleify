import type { Mock, vi } from 'vitest'

interface VitestContextWithMocking {
  fn: typeof vi.fn
  stubGlobal: typeof vi.stubGlobal
}

export function mockGlobalFetch(
  vi: VitestContextWithMocking,
  response: unknown
): Mock {
  const mockFetch: Mock = vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(response),
  })
  vi.stubGlobal('fetch', mockFetch)
  // Also stub $fetch for backward compatibility if needed, but Next uses fetch
  vi.stubGlobal('$fetch', vi.fn().mockResolvedValue(response))
  return mockFetch
}

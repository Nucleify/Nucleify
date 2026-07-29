import type { Mock, vi } from 'vitest'

interface VitestContextWithMocking {
  fn: typeof vi.fn
  stubGlobal: typeof vi.stubGlobal
}

type MockGlobalFetchOptions = {
  ok?: boolean
  status?: number
}

export function mockGlobalFetch(
  vi: VitestContextWithMocking,
  response: unknown,
  options: MockGlobalFetchOptions = {}
): Mock {
  const { ok = true, status = ok ? 200 : 404 } = options

  const mockFetch: Mock = vi.fn().mockImplementation(async () => ({
    ok,
    status,
    statusText: ok ? 'OK' : 'Not Found',
    json: async () => response,
  }))

  vi.stubGlobal('fetch', mockFetch)
  return mockFetch
}

export function getMockFetch(): Mock {
  return globalThis.fetch as unknown as Mock
}

import type { H3Event } from 'h3'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useRuntimeConfig } from 'nitropack/runtime'

vi.mock('nitropack/runtime', () => ({
  useRuntimeConfig: vi.fn(() => ({
    public: { supabaseUrl: process.env.SUPABASE_URL || '' },
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  })),
}))

vi.mock('../../../shared_modules/index.server', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>()
  return {
    ...actual,
    ensureServerEnv: vi.fn(),
  }
})

import handler, {
  _resetSupabaseClientCache,
} from '../../src/server/api/[...slug]'

describe('API Gateway [...slug] handler', () => {
  beforeEach(() => {
    _resetSupabaseClientCache()
    vi.mocked(useRuntimeConfig).mockReset()
    vi.mocked(useRuntimeConfig).mockReturnValue({
      public: { supabaseUrl: process.env.SUPABASE_URL || '' },
      supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
      app: {} as never,
    } as never)
  })
  it('returns ready message for root /api (no slug)', async () => {
    const event = {
      context: {
        params: {},
      },
      method: 'GET',
    } as unknown as H3Event

    const res = await handler(event)
    expect(res).toEqual({ data: { message: 'Supabase API gateway ready.' } })
  })

  it('returns hello world for /api/test', async () => {
    const event = {
      context: {
        params: { slug: 'test' },
      },
      method: 'GET',
    } as unknown as H3Event

    const res = await handler(event)
    expect(res).toEqual({ message: 'Hello World' })
  })

  it('returns hello world when slug is array ["test"]', async () => {
    const event = {
      context: {
        params: { slug: ['test'] },
      },
      method: 'GET',
    } as unknown as H3Event

    const res = await handler(event)
    expect(res).toEqual({ message: 'Hello World' })
  })

  it('throws 503 when Supabase is not configured and accessing non-smoke route', async () => {
    const origEnv = { ...process.env }
    delete process.env.SUPABASE_URL
    delete process.env.SUPABASE_SERVICE_ROLE_KEY
    vi.mocked(useRuntimeConfig).mockReturnValueOnce({
      public: { supabaseUrl: '' },
      supabaseServiceRoleKey: '',
      app: {} as never,
    } as never)

    const event = {
      context: {
        params: { slug: 'custom/route' },
      },
      method: 'GET',
    } as unknown as H3Event

    await expect(handler(event)).rejects.toThrow('Supabase is not configured.')
    process.env = origEnv
  })
})

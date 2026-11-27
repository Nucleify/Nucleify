import { describe, expect, it, vi } from 'vitest'

import { resolveGatewayUserFromAccessToken } from '../supabase/api/gateway_jwt'

describe('resolveGatewayUserFromAccessToken', () => {
  it('maps getClaims throw (forged / missing exp) to 401', async () => {
    const supabase = {
      auth: {
        getClaims: vi.fn(async () => {
          throw new Error('Missing exp claim')
        }),
      },
    }
    const result = await resolveGatewayUserFromAccessToken(
      supabase as never,
      'eyJhbGciOiJub25lIn0.e30.'
    )
    expect(result).toEqual({
      error: 'Missing exp claim',
      status: 401,
    })
  })

  it('maps getClaims error payload to 401', async () => {
    const supabase = {
      auth: {
        getClaims: vi.fn(async () => ({
          data: null,
          error: { message: 'Invalid JWT' },
        })),
      },
    }
    const result = await resolveGatewayUserFromAccessToken(
      supabase as never,
      'bad'
    )
    expect(result).toEqual({ error: 'Invalid JWT', status: 401 })
  })
})

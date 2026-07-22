import { createEvent } from 'h3'

import type { ApiContext, Json } from 'nuc_server'

import { fetchNodeRequestHandler } from 'node-mock-http'
import {
  createServiceRoleSupabaseClient,
  dispatchSupabaseApiGateway,
  parseApiSlug,
} from '../../modules/nuc_api/supabase/api/gateway_dispatch'
import { ensureServerEnv } from '../../modules/nuc_api/supabase/api/server_env'

ensureServerEnv()

async function runGateway(
  request: Request,
  segments: string[]
): Promise<Response> {
  ensureServerEnv()

  let supabase
  try {
    supabase = createServiceRoleSupabaseClient()
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Supabase not configured'
    return Response.json({ error: message }, { status: 503 })
  }

  const url = new URL(request.url)
  const method = request.method.toUpperCase()
  const headers = Object.fromEntries(request.headers.entries())

  let body: ArrayBuffer | undefined
  if (method !== 'GET' && method !== 'HEAD') {
    const buffer = await request.arrayBuffer()
    if (buffer.byteLength > 0) body = buffer
  }

  return fetchNodeRequestHandler(
    async (req, res) => {
      const event = createEvent(req, res)
      const ok = (data: unknown, extra: Json = {}) => ({ data, ...extra })
      const ctx: ApiContext = {
        event,
        method,
        segments,
        supabase,
        ok,
      }
      const result = await dispatchSupabaseApiGateway(ctx)
      res.statusCode = result.status
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(result.body))
    },
    url.pathname + url.search,
    { method, headers, body }
  )
}

export async function handleSupabaseApiRoute(
  request: Request,
  slug: string | string[] | undefined
): Promise<Response> {
  const segments = parseApiSlug(slug)
  return runGateway(request, segments)
}

// @ts-nocheck
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'

serve(() => {
  return new Response(
    JSON.stringify({
      ok: true,
      service: 'nucleify-backend',
      runtime: 'supabase-edge-functions',
    }),
    { headers: { 'content-type': 'application/json' } }
  )
})

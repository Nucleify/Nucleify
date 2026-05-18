// @ts-nocheck
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'

serve(
  () =>
    new Response(JSON.stringify({ message: 'Hello World' }), {
      headers: { 'content-type': 'application/json' },
    })
)

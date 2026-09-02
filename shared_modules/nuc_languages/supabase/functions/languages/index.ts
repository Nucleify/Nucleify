// @ts-nocheck
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'

const corsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-headers':
    'authorization, x-client-info, apikey, content-type',
}

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'content-type': 'application/json' },
  })

serve(async (request) => {
  if (request.method === 'OPTIONS')
    return new Response('ok', { headers: corsHeaders })

  return json(501, {
    error: 'Not implemented',
    module: 'nuc_languages',
    message:
      'TODO: migrate Laravel backend logic to this Supabase Edge Function.',
  })
})

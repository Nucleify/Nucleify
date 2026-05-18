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

const HELP_OUTPUT = [
  'Available commands:',
  '- help',
  '- health',
  '- version',
  '- echo <text>',
].join('\n')

serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (request.method !== 'POST') {
    return json(405, { data: { output: 'Method not allowed.' } })
  }

  try {
    const payload = await request.json()
    const command = String(payload?.command || '').trim()
    const normalized = command.toLowerCase()

    let output = ''
    if (!command || normalized === 'help') {
      output = HELP_OUTPUT
    } else if (normalized === 'health') {
      output = JSON.stringify(
        {
          ok: true,
          service: 'nucleify-backend',
          runtime: 'supabase-edge-functions',
        },
        null,
        2
      )
    } else if (normalized === 'version') {
      output = 'Supabase Edge Runtime'
    } else if (normalized.startsWith('echo ')) {
      output = command.slice(5)
    } else {
      output = `Unsupported command: ${command}`
    }

    return json(200, { data: { output } })
  } catch (error) {
    return json(500, {
      data: {
        output: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      },
    })
  }
})

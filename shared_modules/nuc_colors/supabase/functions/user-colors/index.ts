// @ts-nocheck

import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

type ColorPayload = {
  name: string
  value: string
  new?: boolean
}

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
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
  const publishableKey = Deno.env.get('PUBLISHABLE_SUPABASE_KEY') || ''
  const authHeader = request.headers.get('Authorization') || ''

  if (!supabaseUrl || !publishableKey || !authHeader) {
    return json(401, { error: 'Missing Supabase runtime context.' })
  }

  const supabase = createClient(supabaseUrl, publishableKey, {
    global: { headers: { Authorization: authHeader } },
  })

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return json(401, { error: 'Unauthorized' })
  }

  if (request.method === 'GET') {
    const { data, error } = await supabase
      .from('user_colors')
      .select('*')
      .eq('user_id', user.id)

    if (error) return json(400, { error: error.message })
    return json(200, { data: data || [] })
  }

  if (request.method === 'PUT') {
    const payload = (await request.json()) as { colors?: ColorPayload[] }
    const colors = Array.isArray(payload.colors) ? payload.colors : []

    if (colors.length === 0) {
      return json(200, {
        success: true,
        updated_count: 0,
        created_count: 0,
        message: 'No colors to sync.',
      })
    }

    const rows = colors.map((item) => ({
      user_id: user.id,
      name: item.name,
      value: item.value,
      is_new: Boolean(item.new),
      updated_at: new Date().toISOString(),
    }))

    const { error } = await supabase
      .from('user_colors')
      .upsert(rows, { onConflict: 'user_id,name' })

    if (error) return json(400, { error: error.message })

    return json(200, {
      success: true,
      updated_count: rows.length,
      created_count: 0,
      message: 'User colors synced.',
    })
  }

  return json(405, { error: 'Method not allowed' })
})

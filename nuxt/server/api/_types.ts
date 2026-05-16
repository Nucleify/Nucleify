import type { H3Event } from 'h3'

import type { SupabaseClient } from '@supabase/supabase-js'

export type Json = Record<string, unknown>

export type ApiContext = {
  event: H3Event
  method: string
  segments: string[]
  supabase: SupabaseClient
  ok: (data: unknown, extra?: Json) => Json
}

export type ApiHandlerResult =
  | { handled: false }
  | { handled: true; status?: number; body: unknown }

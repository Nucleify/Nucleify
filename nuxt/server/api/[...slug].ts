import {
  defineEventHandler,
  getMethod,
  getRouterParam,
  setResponseStatus,
} from 'h3'

import { createClient } from '@supabase/supabase-js'
import { useRuntimeConfig } from 'nitropack/runtime'
import { handleActivityApi } from '../../../modules/nuc_activity/supabase/api/handle'
import { handleColorsApi } from '../../../modules/nuc_colors/supabase/api/handle'
import { handleEntitiesApi } from '../../../modules/nuc_entities/supabase/api/handle'
import { handleStructuralApi } from '../../../modules/nuc_entities_structural/supabase/api/handle'
import { handleFilesApi } from '../../../modules/nuc_files/supabase/api/handle'
import { handleFriendshipApi } from '../../../modules/nuc_friendship/supabase/api/handle'
import { handleLanguagesApi } from '../../../modules/nuc_languages/supabase/api/handle'
import { handleModulesApi } from '../../../modules/nuc_modules/supabase/api/handle'
import { handlePagebuilderApi } from '../../../modules/nuc_pagebuilder/supabase/api/handle'
import { handleShareApi } from '../../../modules/nuc_share/supabase/api/handle'
import { handleTerminalApi } from '../../../modules/nuc_terminal/supabase/api/handle'
import { handleUsersApi } from '../../../modules/nuc_users/supabase/api/handle'
import type { ApiContext } from './_types'

const parsePath = (slug: string | undefined): string[] =>
  String(slug || '')
    .split('/')
    .map((s) => s.trim())
    .filter(Boolean)

const ok = (data: unknown, extra: Record<string, unknown> = {}) => ({
  data,
  ...extra,
})

const handlers = [
  handleTerminalApi,
  handleUsersApi,
  handleColorsApi,
  handleEntitiesApi,
  handleStructuralApi,
  handleFilesApi,
  handleActivityApi,
  handleFriendshipApi,
  handleShareApi,
  handleModulesApi,
  handleLanguagesApi,
  handlePagebuilderApi,
]

export default defineEventHandler(async (event) => {
  const method = getMethod(event).toUpperCase()
  const segments = parsePath(getRouterParam(event, 'slug'))
  const config = useRuntimeConfig(event)
  const supabaseUrl = String(config.public.supabaseUrl || '')
  const serviceRoleKey = String(config.supabaseServiceRoleKey || '')
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  if (segments.length === 0)
    return ok({ message: 'Supabase API gateway ready.' })
  if (segments[0] === 'test') return { message: 'Hello World' }

  const ctx: ApiContext = { event, method, segments, supabase, ok }

  for (const handler of handlers) {
    const result = await handler(ctx)
    if (!result.handled) continue
    if (typeof result.status === 'number')
      setResponseStatus(event, result.status)
    return result.body
  }

  setResponseStatus(event, 404)
  return { error: 'Not found' }
})

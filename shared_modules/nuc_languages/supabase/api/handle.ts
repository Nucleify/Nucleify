import { apiMethodNotAllowed, apiNotHandled, dispatchRoutes } from 'nuc_api'
import type { ApiContext, ApiHandlerResult } from 'nuc_server'

import { translationRoutes } from './languages_routes'

export async function handleLanguagesApi(
  ctx: ApiContext
): Promise<ApiHandlerResult> {
  if (ctx.segments[0] !== 'translations') return apiNotHandled()
  const result = await dispatchRoutes(translationRoutes, ctx)
  return result ?? apiMethodNotAllowed()
}

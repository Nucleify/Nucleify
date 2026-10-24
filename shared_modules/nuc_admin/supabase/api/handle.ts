import {
  apiMethodNotAllowed,
  apiNotHandled,
  dispatchAuthRoutes,
  withGatewayUser,
} from 'nuc_api'
import type { ApiAuthRoute } from 'nuc_api'
import type { ApiContext, ApiHandlerResult } from 'nuc_server'

import {
  handleAdminMe,
  handleAdminPermissionsList,
  handleAdminRolePermissionsPut,
  handleAdminRolesList,
} from './admin_handlers'

const adminRoutes: ApiAuthRoute[] = [
  handleAdminMe,
  handleAdminRolePermissionsPut,
  handleAdminPermissionsList,
  handleAdminRolesList,
]

export async function handleAdminApi(
  ctx: ApiContext
): Promise<ApiHandlerResult> {
  if (ctx.segments[0] !== 'admin') return apiNotHandled()
  return withGatewayUser(ctx, async (gatewayCtx, userId) => {
    const result = await dispatchAuthRoutes(adminRoutes, gatewayCtx, userId)
    return result ?? apiMethodNotAllowed()
  })
}

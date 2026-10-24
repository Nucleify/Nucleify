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
import {
  handleAdminCmsCreate,
  handleAdminCmsDelete,
  handleAdminCmsGet,
  handleAdminCmsList,
  handleAdminCmsPatch,
} from './admin_cms_handlers'
import {
  handleAdminCollectionsList,
  handleAdminConfigGet,
  handleAdminDocumentDelete,
  handleAdminDocumentGet,
  handleAdminDocumentPatch,
  handleAdminDocumentPublish,
  handleAdminDocumentsCreate,
  handleAdminDocumentsList,
} from './admin_documents_handlers'
import { handleAdminMePatch } from './admin_settings_handlers'
import {
  handleAdminUserCreate,
  handleAdminUserGet,
  handleAdminUserPatch,
  handleAdminUsersList,
} from './admin_user_handlers'

const adminRoutes: ApiAuthRoute[] = [
  handleAdminMePatch,
  handleAdminMe,
  handleAdminRolePermissionsPut,
  handleAdminPermissionsList,
  handleAdminRolesList,
  handleAdminUserCreate,
  handleAdminUserGet,
  handleAdminUserPatch,
  handleAdminUsersList,
  handleAdminConfigGet,
  handleAdminDocumentPublish,
  handleAdminDocumentGet,
  handleAdminDocumentPatch,
  handleAdminDocumentDelete,
  handleAdminDocumentsCreate,
  handleAdminDocumentsList,
  handleAdminCollectionsList,
  handleAdminCmsCreate,
  handleAdminCmsDelete,
  handleAdminCmsGet,
  handleAdminCmsPatch,
  handleAdminCmsList,
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

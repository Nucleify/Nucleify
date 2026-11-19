import { apiNotHandled, dispatchAuthRoutes, withGatewayUser } from 'nuc_api'
import type { ApiAuthRoute } from 'nuc_api'
import type { ApiContext, ApiHandlerResult } from 'nuc_server'

import {
  handleAdminCmsCreate,
  handleAdminCmsDelete,
  handleAdminCmsGet,
  handleAdminCmsList,
  handleAdminCmsPatch,
} from './admin_cms_handlers'
import {
  handleAdminCommentPatch,
  handleAdminCommentsList,
  handleAdminContactList,
  handleAdminContactPatch,
  handleAdminDashboard,
  handleAdminDocumentsBulk,
  handleAdminDocumentsSearch,
  handleAdminMenuUpsert,
  handleAdminMenusList,
  handleAdminPreviewToken,
  handleAdminRevisionCreate,
  handleAdminRevisionRestore,
  handleAdminRevisionsList,
  handleAdminSchedulePromote,
  handleAdminTermCreate,
  handleAdminTermDelete,
  handleAdminTermsList,
} from './admin_cms_extra_handlers'
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
import {
  handleAdminGlobalGet,
  handleAdminGlobalPatch,
  handleAdminGlobalsList,
} from './admin_globals_handlers'
import {
  handleAdminMediaCreate,
  handleAdminMediaDelete,
  handleAdminMediaList,
  handleAdminMediaPatch,
} from './admin_media_handlers'
import {
  handleAdminRedirectCreate,
  handleAdminRedirectDelete,
  handleAdminRedirectPatch,
  handleAdminRedirectsList,
} from './admin_redirects_handlers'

const cmsAdminRoutes: ApiAuthRoute[] = [
  handleAdminConfigGet,
  handleAdminDashboard,
  handleAdminDocumentsSearch,
  handleAdminSchedulePromote,
  handleAdminGlobalPatch,
  handleAdminGlobalGet,
  handleAdminGlobalsList,
  handleAdminMediaCreate,
  handleAdminMediaPatch,
  handleAdminMediaDelete,
  handleAdminMediaList,
  handleAdminRedirectCreate,
  handleAdminRedirectPatch,
  handleAdminRedirectDelete,
  handleAdminRedirectsList,
  handleAdminMenusList,
  handleAdminMenuUpsert,
  handleAdminCommentsList,
  handleAdminCommentPatch,
  handleAdminContactList,
  handleAdminContactPatch,
  handleAdminTermsList,
  handleAdminTermCreate,
  handleAdminTermDelete,
  handleAdminRevisionRestore,
  handleAdminRevisionsList,
  handleAdminRevisionCreate,
  handleAdminPreviewToken,
  handleAdminDocumentsBulk,
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

/** Authenticated CMS admin routes (`/api/admin/...` document surfaces). */
export async function handleCmsAdminApi(
  ctx: ApiContext
): Promise<ApiHandlerResult> {
  if (ctx.segments[0] !== 'admin') return apiNotHandled()
  return withGatewayUser(ctx, async (gatewayCtx, userId) => {
    const result = await dispatchAuthRoutes(cmsAdminRoutes, gatewayCtx, userId)
    // Fall through to nuc_admin (users / roles / settings) when no CMS route matches.
    return result ?? apiNotHandled()
  })
}

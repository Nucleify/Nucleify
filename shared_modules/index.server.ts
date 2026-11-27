/** Server-only package barrel — Nitro resolves `@shared_modules` here (no Vue / nuxt/app). */

export {
  createServiceRoleSupabaseClient,
  dispatchSupabaseApiGateway,
  getServiceRoleSupabaseClient,
  parseApiSlug,
  supabaseApiGatewayHandlers,
} from './nuc_api/supabase/api/gateway_dispatch'
export { resolveGatewayUserFromAccessToken } from './nuc_api/supabase/api/gateway_jwt'
export {
  ensureServerEnv,
  readServerEnv,
} from './nuc_api/supabase/api/server_env'
export {
  type CmsRedirect,
  clearCmsRedirectCache,
  loadCmsRedirects,
  matchCmsRedirect,
} from './nuc_cms/server/cms_redirects'
export { handleContactFormSubmission } from './nuc_cms/server/handle_contact_form'
export {
  isSmashedSegment,
  redirectTargetForPath,
} from './nuc_cms/utils/smashed_url'

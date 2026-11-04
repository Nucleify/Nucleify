/**
 * Host-safe `@shared_modules` barrel for converted shells (Astro / Next / Solid / Svelte).
 * No Vue plugins or `nuxt/app` — CMS, toast, browser Supabase client, and admin helpers.
 */

export * from './nuc_admin/cms/admin_config'
export * from './nuc_admin/cms/default_pages'
export * from './nuc_admin/cms/defaults/marketing_props'
export * from './nuc_admin/cms/fields/types'
export * from './nuc_admin/cms/merge_props'
export * from './nuc_admin/cms/registry'
export {
  configureSupabaseClient,
  getSupabaseAccessToken,
  getSupabaseClient,
  setBrowserSupabaseClient,
} from './nuc_api/supabase/client'
export { apiRequest, resolveApiUrl } from './nuc_api/utils/api_request'
export {
  closeToast,
  flashToast,
  setToastInstance,
} from './nuc_api/utils/use_toast'

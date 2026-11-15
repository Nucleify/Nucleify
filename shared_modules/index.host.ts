/**
 * Host-safe `@shared_modules` barrel for converted shells (Astro / Next / Solid / Svelte).
 * No Vue plugins or `nuxt/app` — CMS, toast, browser Supabase client, and admin helpers.
 */

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
export * from './nuc_cms/cms/admin_config'
export * from './nuc_cms/cms/default_pages'
export * from './nuc_cms/cms/defaults/marketing_props'
export * from './nuc_cms/cms/fields/types'
export * from './nuc_cms/cms/merge_props'
export * from './nuc_cms/cms/page_templates'
export * from './nuc_cms/cms/registry'

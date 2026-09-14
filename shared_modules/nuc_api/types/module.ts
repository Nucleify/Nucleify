import type { App } from 'vue'

import type { ApiContext, ApiHandlerResult } from 'nuc_server'

/** Canonical module metadata — mirrors modules */
export interface NucModuleConfig {
  name: string
  description: string
  version: string
  category: string
  installed: boolean
  enabled: boolean
}

/** API gateway handler signature used by supabaseApiGatewayHandlers */
export type NucApiHandler = (
  ctx: ApiContext
) => Promise<ApiHandlerResult> | ApiHandlerResult

/**
 * Kernel contract for a Nucleify module.
 * UI modules register Vue components; API modules contribute gateway handlers.
 */
export interface NucModule {
  name: string
  config: NucModuleConfig
  registerVue?: (app: App) => void
  apiHandlers?: readonly NucApiHandler[]
}

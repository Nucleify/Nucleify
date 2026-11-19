import { defineEventHandler } from 'h3'

import { _resetSupabaseClientCache, handleApiGatewayEvent } from '../nuc_server'

export { _resetSupabaseClientCache }
export default defineEventHandler(handleApiGatewayEvent)

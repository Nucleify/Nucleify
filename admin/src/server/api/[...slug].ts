import { defineEventHandler } from 'h3'
import {
  _resetSupabaseClientCache,
  handleApiGatewayEvent,
} from './gateway_dispatch_event'

export { _resetSupabaseClientCache }
export default defineEventHandler(handleApiGatewayEvent)

import { isClient } from './is_client.react'

export function isMobile(): boolean {
  return isClient ? window.screen.width <= 992 : false
}

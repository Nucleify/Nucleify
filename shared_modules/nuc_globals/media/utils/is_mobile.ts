import { isClient } from './is_client'

export function isMobile(): boolean {
  return isClient ? window.screen.width <= 992 : false
}

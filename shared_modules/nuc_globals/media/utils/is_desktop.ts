import { isClient } from './is_client'

export function isDesktop(): boolean {
  return isClient ? window.screen.width > 992 : false
}

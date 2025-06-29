import type { App } from 'vue'

import { isDesktop, isMobile, isClient } from '.'

export function registerDMMedia(app: App<Element>): void {
  app.config.globalProperties.isClient = isClient
  app.config.globalProperties.isMobile = isMobile
  app.config.globalProperties.isDesktop = isDesktop
}

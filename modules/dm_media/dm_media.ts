import type { App } from 'vue'

import { isClient, isDesktop, isMobile } from '.'

export function registerDMMedia(app: App<Element>): void {
  app.config.globalProperties.isClient = isClient
  app.config.globalProperties.isMobile = isMobile
  app.config.globalProperties.isDesktop = isDesktop
}

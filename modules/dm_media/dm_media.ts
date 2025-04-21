import { App } from 'vue'

import { isDesktop, isMobile } from '.'

export function registerDMMedia(app: App<Element>): void {
  app.config.globalProperties.isMobile = isMobile
  app.config.globalProperties.isDesktop = isDesktop
}

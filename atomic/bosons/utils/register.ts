import { App } from 'vue'

import { isDesktop, isMobile } from 'atomic/bosons/utils'

export function registerGlobalUtils(app: App): void {
  app.config.globalProperties.isMobile = isMobile
  app.config.globalProperties.isDesktop = isDesktop
}

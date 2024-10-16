import { AppType } from 'vite'

import { isDesktop, isMobile } from 'atomic/bosons/utils'

export function registerGlobalUtils(app: AppType): void {
  app.config.globalProperties.isMobile = isMobile
  app.config.globalProperties.isDesktop = isDesktop
}

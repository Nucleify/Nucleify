import type { App } from 'vue'

import { DmTooltipBase } from '.'

export function registerDMTooltip(app: App<Element>): void {
  app.directive('tooltip', DmTooltipBase)
}

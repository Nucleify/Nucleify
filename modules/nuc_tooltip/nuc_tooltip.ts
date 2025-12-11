import type { App } from 'vue'

import { NucTooltipBase } from '.'

export function registerNucTooltip(app: App<Element>): void {
  app.directive('tooltip', NucTooltipBase)
}

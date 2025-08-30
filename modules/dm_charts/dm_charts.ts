import type { App } from 'vue'

import { DMChartSettingsCard, DMEntityChart, DMEntityChartCard } from './atomic'

export function registerDMCharts(app: App<Element>): void {
  app
    .component('dm-entity-chart', DMEntityChart)
    .component('dm-entity-chart-card', DMEntityChartCard)
    .component('dm-chart-settings-card', DMChartSettingsCard)
}

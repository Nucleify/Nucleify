import type { App } from 'vue'

import { DMEntityChart, DMEntityChartCard, DMSettingsChartCard } from './atomic'

export function registerDMCharts(app: App<Element>): void {
  app
    .component('dm-entity-chart', DMEntityChart)
    .component('dm-entity-chart-card', DMEntityChartCard)
    .component('dm-settings-chart-card', DMSettingsChartCard)
}

import type { App } from 'vue'

import {
  NucChartSettingsCard,
  NucEntityChart,
  NucEntityChartCard,
} from './atomic'

export function registerNucCharts(app: App<Element>): void {
  app
    .component('nuc-entity-chart', NucEntityChart)
    .component('nuc-entity-chart-card', NucEntityChartCard)
    .component('nuc-chart-settings-card', NucChartSettingsCard)
}

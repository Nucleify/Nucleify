import type { App } from 'vue'

import { NucEntityChart } from './atomic/template/entity-chart'
import { NucEntityChartCard } from './atomic/template/entity-chart-card'

export function registerNucCharts(app: App<Element>): void {
  app
    .component('nuc-entity-chart', NucEntityChart)
    .component('nuc-entity-chart-card', NucEntityChartCard)
}

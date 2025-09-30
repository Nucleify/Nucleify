import { ChartOptions } from 'chart.js'

export function circularChart(options: ChartOptions): ChartOptions {
  options.plugins = {}
  options.plugins.legend = {}
  options.plugins.legend.display = false
  return options
}

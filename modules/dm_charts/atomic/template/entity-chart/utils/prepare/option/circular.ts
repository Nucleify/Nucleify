import { ChartOptions } from 'chart.js'

export function circularChart(options: ChartOptions): ChartOptions {
  if (!options.plugins) options.plugins = {}
  if (!options.plugins.legend) options.plugins.legend = {}
  options.plugins.legend.display = false
  return options
}

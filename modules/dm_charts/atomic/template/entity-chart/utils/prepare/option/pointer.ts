import { ChartOptions } from 'chart.js'

export function pointerChart(
  options: ChartOptions,
  opts?: { withRadius?: boolean }
): ChartOptions {
  if (!options.plugins) options.plugins = {}
  if (!options.plugins.legend) options.plugins.legend = {}
  options.plugins.legend.display = false
  options.scales = {
    x: { type: 'linear', position: 'bottom' },
    y: {},
    ...(opts?.withRadius
      ? {
          r: {
            ticks: { color: '#e6e6e6' },
            grid: { display: true, color: '#39404a50' },
          },
        }
      : {}),
  }
  return options
}

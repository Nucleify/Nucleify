import { ChartOptions } from 'chart.js'

export function stackedBarChart(options: ChartOptions): ChartOptions {
  options.plugins = {}
  options.plugins.legend = {}
  options.plugins.legend.display = false
  options.scales = {
    x: {
      stacked: true,
      ticks: {
        color: '#e6e6e6',
        font: {
          weight: 500,
        },
      },
      grid: {
        display: false,
      },
    },
    y: {
      stacked: true,
      ticks: {
        color: '#e6e6e6',
      },
      grid: {
        display: true,
        color: '#39404a50',
      },
    },
  }
  return options
}

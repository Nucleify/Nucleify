import { ChartOptions } from 'chart.js'

export function cartesianChart(
  options: ChartOptions,
  direction?: 'horizontal'
): ChartOptions {
  if (direction === 'horizontal') {
    options.indexAxis = 'y'
  }
  options.scales = {
    x: {
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

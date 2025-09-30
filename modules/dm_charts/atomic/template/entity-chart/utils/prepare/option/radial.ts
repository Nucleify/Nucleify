import { ChartOptions } from 'chart.js'

export type RadialTweaks = {
  angleLinesDisplay?: boolean
  suggestedMin?: number
  suggestedMax?: number
  gridColor?: string
}

export function radialChart(
  options: ChartOptions,
  tweaks: RadialTweaks = {}
): ChartOptions {
  const { angleLinesDisplay, suggestedMin, suggestedMax, gridColor } = tweaks
  options.plugins = {}
  options.plugins.legend = {}
  options.plugins.legend.display = false
  options.scales = {
    r: {
      ...(angleLinesDisplay !== undefined && {
        angleLines: { display: angleLinesDisplay },
      }),
      ...(suggestedMin !== undefined && { suggestedMin }),
      ...(suggestedMax !== undefined && { suggestedMax }),
      ...(gridColor && { grid: { color: gridColor } }),
    },
  }
  return options
}

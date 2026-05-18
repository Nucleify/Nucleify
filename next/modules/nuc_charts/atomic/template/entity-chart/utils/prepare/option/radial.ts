import type { ChartOptions, RadialLinearScaleOptions } from 'chart.js'

export type RadialTweaks = {
  angleLinesDisplay?: boolean
  suggestedMin?: number
  suggestedMax?: number
  gridColor?: string
  tickColor?: string
}

export function radialChart(
  options: ChartOptions,
  tweaks: RadialTweaks = {}
): ChartOptions {
  const {
    angleLinesDisplay,
    suggestedMin,
    suggestedMax,
    gridColor,
    tickColor,
  } = tweaks
  if (!options.plugins) options.plugins = {}
  if (!options.plugins.legend) options.plugins.legend = {}
  options.plugins.legend.display = false

  const currentScales = (options.scales ?? {}) as Record<string, unknown> & {
    r?: RadialLinearScaleOptions
  }

  options.scales = {
    ...currentScales,
    r: {
      ...(angleLinesDisplay !== undefined && {
        angleLines: { display: angleLinesDisplay },
      }),
      ...(suggestedMin !== undefined && { suggestedMin }),
      ...(suggestedMax !== undefined && { suggestedMax }),
      ...(gridColor && { grid: { color: gridColor } }),
      ...(tickColor && { ticks: { color: tickColor } }),
    },
  }
  return options
}

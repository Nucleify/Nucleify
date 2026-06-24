import { Chart } from 'primereact/chart'
import type { JSX } from 'react'

import type { AdChartInterface } from './types'

export function AdChart({
  className = '',
  chartClass,
  data,
  width,
  height,
  chartMethodType,
  example,
  ...rest
}: AdChartInterface): JSX.Element | null {
  if (!data) return null

  const mergedClassName = ['ad-chart', className, chartClass]
    .filter(Boolean)
    .join(' ')

  const safeWidth = typeof width === 'number' ? `${width}` : width
  const safeHeight = typeof height === 'number' ? `${height}` : height

  return (
    <Chart
      {...rest}
      width={safeWidth}
      height={safeHeight}
      data={data}
      className={mergedClassName || undefined}
    />
  )
}

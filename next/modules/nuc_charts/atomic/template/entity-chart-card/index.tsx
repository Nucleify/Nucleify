'use client'

import React from 'react'

import { AdCard } from 'nucleify'

import { NucEntityChart } from '../entity-chart'

import type { NucDisplayChartsStateInterface } from '../../../types/interfaces'
import { useDisplayChartsStore } from '../../boson/utils/use_display_charts_store'
import type { NucEntityChartCardInterface } from './types/interfaces'
export const NucEntityChartCard: React.FC<NucEntityChartCardInterface> = (
  props
) => {
  const displayCharts = useDisplayChartsStore()

  const isVisible =
    displayCharts[props.entity as keyof NucDisplayChartsStateInterface]

  if (!isVisible) return null

  const chartClassName = `${props.chartClass || ''} ${props.loading ? 'chart-loading' : 'chart-loaded'}`

  return (
    <AdCard className="nuc-card-base entity-chart-card">
      <NucEntityChart
        data={props.data}
        chartMethodType={props.chartMethodType}
        type={props.type}
        direction={props.direction}
        className={chartClassName}
        example={props.example}
      />
    </AdCard>
  )
}

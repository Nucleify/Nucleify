'use client'
import type { ChartData } from 'chart.js'
import React, { useMemo } from 'react'

import { AdChart, type ChartType } from 'nucleify'

import type { NucEntityChartInterface } from './types/interfaces'
import { useChart } from './utils/use_chart'

export const NucEntityChart: React.FC<NucEntityChartInterface> = (props) => {
  const { setChartData, setChartOptions } = useChart()

  const chartOptions = useMemo(() => {
    if (!props.type) return {}

    return setChartOptions(props.type as ChartType, props.direction)
  }, [props.type, props.direction, setChartOptions])

  const chartData: ChartData | undefined = useMemo(() => {
    return (
      setChartData(
        props.chartMethodType,
        props.data?.activity,
        props.data?.article,
        props.data?.contact,
        props.data?.file,
        props.data?.money,
        props.data?.question,
        props.data?.technology,
        props.data?.user,
        props.example
      ) ?? undefined
    )
  }, [
    props.chartMethodType,
    props.data?.activity,
    props.data?.article,
    props.data?.contact,
    props.data?.file,
    props.data?.money,
    props.data?.question,
    props.data?.technology,
    props.data?.user,
    props.example,
    setChartData,
  ])

  return (
    <AdChart
      data={chartData}
      options={chartOptions}
      type={props.type}
      chartMethodType={props.chartMethodType}
      direction={props.direction}
      className={props.chartClass}
      example={props.example}
    />
  )
}

/* eslint-disable */

import { ChartData, ChartOptions } from 'chart.js'
import { useCallback, useMemo } from 'react'

import type { ChartType } from '../../../../../../atomic/organism/chart/types/variables'
import { useColors } from '../../../../../nuc_colors/atomic/boson/utils/use_colors.client'
import { allEntitiesKeys } from '../../../../../nuc_fields/constants/keys/entities'
import type {
  ChartMethodType,
  NucActivityObjectInterface,
  NucArticleObjectInterface,
  NucContactObjectInterface,
  NucFileObjectInterface,
  NucMoneyObjectInterface,
  NucQuestionObjectInterface,
  NucTechnologyObjectInterface,
  NucUserObjectInterface,
} from '../../../../types/interfaces'
import { prepareAnnualData } from './prepare/data/annual'
import { prepareCountData } from './prepare/data/count'
import { cartesianChart } from './prepare/option/cartesian'
import { circularChart } from './prepare/option/circular'
import { pointerChart } from './prepare/option/pointer'
import { radialChart } from './prepare/option/radial'

export function useChart() {
  const { colors } = useColors()

  const exampleColors = useMemo(
    () =>
      Object.fromEntries(
        [
          ['activity', '#FFB600'],
          ['user', '#64748B'],
          ['article', '#1187C7'],
          ['contact', '#10B981'],
          ['file', '#6DB910'],
          ['money', '#11C73B'],
          ['question', '#8CB910'],
          ['technology', '#B95910'],
        ].map(([key, primary]) => [key, { primary, secondary: `${primary}35` }])
      ),
    []
  )

  const generateExampleDataByMonth = useCallback(() => {
    const dataByMonth = Object.fromEntries(
      [...allEntitiesKeys].map((key) => [`${key}`, new Array(12).fill(0)])
    )
    for (let i = 0; i < 12; i++) {
      dataByMonth.article[i] = Math.floor(Math.random() * 100)
      dataByMonth.contact[i] = Math.floor(Math.random() * 100)
    }
    return dataByMonth
  }, [])

  const setChartData = useCallback(
    (
      chartMethodType: ChartMethodType,
      activityLogData?: NucActivityObjectInterface[],
      articleData?: NucArticleObjectInterface[],
      contactData?: NucContactObjectInterface[],
      fileData?: NucFileObjectInterface[],
      moneyData?: NucMoneyObjectInterface[],
      questionData?: NucQuestionObjectInterface[],
      technologyData?: NucTechnologyObjectInterface[],
      userData?: NucUserObjectInterface[],
      example?: boolean
    ): ChartData | null => {
      try {
        const entitiesData = {
          activityLogData,
          articleData,
          contactData,
          fileData,
          moneyData,
          questionData,
          technologyData,
          userData,
        } as Record<string, unknown[]>

        const chartColors = example ? exampleColors : colors
        const exampleDataByMonth = example
          ? generateExampleDataByMonth()
          : undefined
        const stacked = true

        switch (chartMethodType) {
          case 'annual':
            return prepareAnnualData(
              entitiesData,
              chartColors,
              undefined,
              undefined,
              undefined,
              exampleDataByMonth
            ) as ChartData
          case 'annual-stacked':
            return prepareAnnualData(
              entitiesData,
              chartColors,
              stacked,
              undefined,
              undefined,
              exampleDataByMonth
            ) as ChartData
          case 'count':
            return prepareCountData(
              entitiesData,
              chartColors,
              exampleDataByMonth
            ) as ChartData
          default:
            return null
        }
      } catch (error) {
        console.error(error)
        return null
      }
    },
    [colors, exampleColors, generateExampleDataByMonth]
  )

  const setChartOptions = useCallback(
    (chartType: ChartType, direction?: string): ChartOptions => {
      const options: ChartOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: { labels: { color: '#cce4dd' } },
        },
      }

      switch (chartType) {
        case 'bar':
        case 'line':
          return cartesianChart(
            options,
            direction === 'horizontal' ? 'horizontal' : undefined
          )
        case 'bubble':
          return pointerChart(options, { withRadius: true })
        case 'doughnut':
        case 'pie':
          return circularChart(options)
        case 'polarArea':
          return radialChart(options, { gridColor: '#cce4dd' })
        case 'radar':
          return radialChart(options, {
            angleLinesDisplay: false,
            gridColor: '#39404a50',
            tickColor: '#e6e6e6',
          })
        case 'scatter':
          return pointerChart(options)
        default:
          return options
      }
    },
    []
  )

  return { setChartData, setChartOptions }
}

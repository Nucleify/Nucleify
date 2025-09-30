/* eslint-disable */
// @ts-nocheck

import { Ref, ref } from 'vue'

import {
  ActivityLogObjectInterface,
  ArticleObjectInterface,
  allEntitiesKeys,
  allEntitiesLabels,
  CardObjectInterface,
  ChartInterface,
  ChartMethodType,
  ChartType,
  ContactObjectInterface,
  DocumentationObjectInterface,
  FeatureObjectInterface,
  FileObjectInterface,
  LabelItemType,
  LinkObjectInterface,
  MoneyObjectInterface,
  months,
  ObjectType,
  QuestionObjectInterface,
  TaskObjectInterface,
  TechnologyObjectInterface,
  UseColorsInterface,
  UserObjectInterface,
  useColors,
} from 'atomic'

import { ChartOptions } from 'chart.js'
import {
  bubbleChart,
  cartesianChart,
  circularChart,
  prepareAnnualData,
  prepareCountData,
  radialChart,
  scatterChart,
  stackedBarChart,
} from './prepare'
import { pointerChart } from './prepare/option/pointer'

export function useChart() {
  const { colors }: UseColorsInterface = useColors()

  const chartData: Ref<ChartInterface | undefined> = ref<ChartInterface>()

  const exampleColors = Object.fromEntries(
    [
      ['activity', '#FFB600'],
      ['user', '#64748B'],
      ['documentation', '#8b5cf6'],
      ['article', '#1187C7'],
      ['contact', '#10B981'],
      ['card', '#1B10B9'],
      ['feature', '#B91010'],
      ['file', '#6DB910'],
      ['link', '#10B3B9'],
      ['money', '#11C73B'],
      ['question', '#8CB910'],
      ['task', '#1045b9'],
      ['technology', '#B95910'],
      ['user', '#64748B'],
    ].map(([key, primary]) => [key, { primary, secondary: `${primary}35` }])
  )

  const chartLabels: { label: LabelItemType }[] = allEntitiesLabels.map(
    (label) => ({
      label,
    })
  )

  function setChartData(
    chartMethodType: ChartMethodType,
    activityLogData?: ActivityLogObjectInterface[],
    articleData?: ArticleObjectInterface[],
    cardData?: CardObjectInterface[],
    contactData?: ContactObjectInterface[],
    documentationData?: DocumentationObjectInterface[],
    featureData?: FeatureObjectInterface[],
    fileData?: FileObjectInterface[],
    linkData?: LinkObjectInterface[],
    moneyData?: MoneyObjectInterface[],
    questionData?: QuestionObjectInterface[],
    taskData?: TaskObjectInterface[],
    technologyData?: TechnologyObjectInterface[],
    userData?: UserObjectInterface[],
    example?: boolean
  ) {
    try {
      const entitiesData = {
        activityLogData,
        articleData,
        cardData,
        contactData,
        documentationData,
        featureData,
        fileData,
        linkData,
        moneyData,
        questionData,
        taskData,
        technologyData,
        userData,
      } as Record<string, ObjectType[]>

      let labels: string[] = []

      const chartColors = example ? exampleColors : colors

      switch (chartMethodType) {
        case 'annual': {
          return prepareAnnualData(entitiesData, chartColors, example)
        }

        case 'count': {
          return prepareCountData(entitiesData, chartColors, example)
        }
        default:
          return null
      }
    } catch (error) {
      console.error(error)
      return null
    }
  }

  function setChartOptions(
    chartType: ChartType,
    direction?: string
  ): ChartOptions {
    let options: ChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: '#cce4dd',
          },
        },
      },
    }

    switch (chartType) {
      case 'bar':
      case 'line': {
        return cartesianChart(
          options,
          direction === 'horizontal' ? 'horizontal' : undefined
        )
      }
      case 'bubble': {
        return pointerChart(options, { withRadius: true })
      }
      case 'doughnut':
      case 'pie': {
        return circularChart(options)
      }
      case 'polarArea': {
        return radialChart(options, { gridColor: chartColor })
      }
      case 'radar': {
        return radialChart(options, {
          angleLinesDisplay: false,
          suggestedMin: 50,
          suggestedMax: 100,
        })
      }
      case 'scatter': {
        return pointerChart(options)
      }
      case 'stackedBar': {
        return stackedBarChart(options)
      }
    }

    return options
  }

  return { chartData, setChartData, setChartOptions }
}

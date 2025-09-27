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
import { prepareAnnualData } from './prepare'

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
      const entitiesData: ObjectInterface[] = {
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
      }

      let labels: string[] = []

      const chartColors = example ? exampleColors : colors

      switch (chartMethodType) {
        case 'annual': {
          return prepareAnnualData(entitiesData, chartColors, example)
        }

        case 'count': {
          const dataCounts = Object.entries(entitiesData)
            .map(([key, data]) => ({
              label:
                key.charAt(0).toUpperCase() + key.slice(1).replace('Data', ''),
              data,
              count: data?.length || 0,
            }))
            .filter(({ data }) => data && data.length > 0)

          labels = dataCounts.map(({ label }) => label)
          const totals = dataCounts.map(({ count }) => count)

          return {
            labels,
            datasets: [
              {
                data: totals,
                borderWidth: 1.5,
                borderColor: totals.map(
                  (_, i) => Object.values(chartColors)[i]?.primary || '#000000'
                ),
                backgroundColor: totals.map(
                  (_, i) =>
                    Object.values(chartColors)[i]?.secondary || '#000000'
                ),
              },
            ],
          }
        }

        default:
          return null
      }
    } catch (error) {
      console.error('Error processing chart data:', error)
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

    if (chartType === 'pie' || chartType === 'doughnut') {
      options.plugins.legend.display = false
    } else if (direction === 'horizontal') {
      options.indexAxis = 'y'
    }

    if (chartType !== 'pie' && chartType !== 'doughnut') {
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
    }

    return options
  }

  return { chartData, setChartData, setChartOptions }
}

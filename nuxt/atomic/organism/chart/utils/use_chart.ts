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
  FeatureObjectInterface,
  LabelItemType,
  LinkObjectInterface,
  MoneyObjectInterface,
  months,
  QuestionObjectInterface,
  TaskObjectInterface,
  TechnologyObjectInterface,
  UseColorsInterface,
  UserObjectInterface,
  useColors,
} from 'atomic'

import { ChartOptions } from 'chart.js'

export function useChart() {
  const { colors }: UseColorsInterface = useColors()

  const chartData: Ref<ChartInterface | undefined> = ref<ChartInterface>()

  const exampleColors = Object.fromEntries(
    [
      ['activity', '#FFB600'],
      ['article', '#1187C7'],
      ['contact', '#10B981'],
      ['money', '#11C73B'],
      ['user', '#64748B'],
      ['card', '#1B10B9'],
      ['feature', '#B91010'],
      ['link', '#10B3B9'],
      ['question', '#8CB910'],
      ['task', '#1045b9'],
      ['technology', '#B95910'],
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
    featureData?: FeatureObjectInterface[],
    linkData?: LinkObjectInterface[],
    moneyData?: MoneyObjectInterface[],
    questionData?: QuestionObjectInterface[],
    taskData?: TaskObjectInterface[],
    technologyData?: TechnologyObjectInterface[],
    userData?: UserObjectInterface[],
    example?: boolean
  ) {
    try {
      let labels: string[] = []
      const dataByMonth = Object.fromEntries(
        [...allEntitiesKeys].map((key) => [`${key}`, new Array(12).fill(0)])
      )

      const chartColors = example ? exampleColors : colors

      if (example) {
        for (let i = 0; i < 12; i++) {
          dataByMonth.article[i] = Math.floor(Math.random() * 100)
          dataByMonth.contact[i] = Math.floor(Math.random() * 100)
        }
      } else {
        const incrementByMonth = (
          data: { created_at: string }[],
          dataByMonth: number[]
        ) => {
          data?.forEach(
            ({ created_at }) => dataByMonth[new Date(created_at).getMonth()]++
          )
        }

        ;[
          [activityLogData, dataByMonth.activity],
          [articleData, dataByMonth.article],
          [cardData, dataByMonth.card],
          [contactData, dataByMonth.contact],
          [featureData, dataByMonth.feature],
          [linkData, dataByMonth.link],
          [moneyData, dataByMonth.money],
          [questionData, dataByMonth.question],
          [taskData, dataByMonth.task],
          [technologyData, dataByMonth.technology],
          [userData, dataByMonth.user],
        ].forEach(([data, dataByMonth]) =>
          incrementByMonth(data as { created_at: string }[], dataByMonth)
        )
      }

      switch (chartMethodType) {
        case 'annual': {
          const createData = (data, colors) => ({ data, colors })

          const dataMap = Object.fromEntries(
            Object.entries(dataByMonth).map(([key, value]) => [
              key.charAt(0).toUpperCase() + key.slice(1),
              createData(value, chartColors[key]),
            ])
          )

          const dataTypes = Object.keys(dataMap).map((label) => ({
            label,
            ...dataMap[label],
          }))

          return {
            labels: months,
            datasets: dataTypes
              .map(({ label, data, colors }) => ({
                label,
                backgroundColor: colors.secondary,
                borderColor: colors.primary,
                borderWidth: 1.5,
                data,
              }))
              .filter(({ data }) => data.some((count) => count > 0)),
          }
        }

        case 'count': {
          labels = chartLabels
            .filter(
              ({ label }) =>
                ({
                  Activities: activityLogData,
                  Articles: articleData,
                  Contacts: contactData,
                  Money: moneyData,
                  Users: userData,
                  Cards: cardData,
                  Features: featureData,
                  Links: linkData,
                  Question: questionData,
                  Task: taskData,
                  Technology: technologyData,
                })[label]
            )
            .map(({ label }) => label)

          const totals = Object.values(dataByMonth).map((data) =>
            data.reduce((sum, value) => sum + value, 0)
          )

          return {
            labels,
            datasets: [
              {
                data: totals,
                borderWidth: 1.5,
                borderColor: totals.map(
                  (_, i) => Object.values(chartColors)[i].primary
                ),
                backgroundColor: totals.map(
                  (_, i) => Object.values(chartColors)[i].secondary
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

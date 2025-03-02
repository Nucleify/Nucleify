/* eslint-disable */
// @ts-nocheck
import { Ref, ref } from 'vue'
import { ChartOptions } from 'chart.js'

import {
  months,
  ActivityLogInterface,
  ArticleInterface,
  ContactInterface,
  MoneyInterface,
  UserInterface,
  QuestionInterface,
  TechnologyInterface,
  ChartMethodType,
  ChartType,
  ChartInterface,
  LabelItemType,
  UseColorsReturnInterface,
  useColors,
} from 'atomic'

export function useChart() {
  const {
    activityItemColors,
    articleItemColors,
    contactItemColors,
    moneyItemColors,
    questionItemColors,
    technologyItemColors,
    userItemColors,
  }: UseColorsReturnInterface = useColors()

  const chartData: Ref<ChartInterface | undefined> = ref<ChartInterface>()

  const exampleColors = {
    activityItemColors: { primary: '#FFB600', secondary: '#FFB60050' },
    articleItemColors: { primary: '#1187C7', secondary: '#1187C750' },
    contactItemColors: { primary: '#10B981', secondary: '#10B98150' },
    moneyItemColors: { primary: '#11c73b', secondary: '#11c73b50' },
    questionItemColors: { primary: '#8cb910', secondary: '#8cb91050' },
    technologyItemColors: { primary: '#b95910', secondary: '#b9591050' },
    userItemColors: { primary: '#64748B', secondary: '#64748B50' },
  }

  const chartLabels: { label: LabelItemType }[] = [
    { label: 'Articles' },
    { label: 'Contacts' },
    { label: 'Money' },
    { label: 'Questions' },
    { label: 'Users' },
  ]

  function setChartData(
    chartMethodType: ChartMethodType,
    activityLogData?: ActivityLogInterface[],
    articleData?: ArticleInterface[],
    contactData?: ContactInterface[],
    moneyData?: MoneyInterface[],
    questionData?: QuestionInterface[],
    technologyData?: TechnologyInterface[],
    userData?: UserInterface[],
    example?: boolean
  ) {
    try {
      let labels: string[] = []
      const activityLogDataByMonth: number[] = new Array(12).fill(0)
      const articleDataByMonth: number[] = new Array(12).fill(0)
      const contactDataByMonth: number[] = new Array(12).fill(0)
      const moneyDataByMonth: number[] = new Array(12).fill(0)
      const questionDataByMonth: number[] = new Array(12).fill(0)
      const technologyDataByMonth: number[] = new Array(12).fill(0)
      const userDataByMonth: number[] = new Array(12).fill(0)

      const colors = example
        ? exampleColors
        : {
            activityItemColors,
            articleItemColors,
            contactItemColors,
            moneyItemColors,
            questionItemColors,
            technologyItemColors,
            userItemColors,
          }

      if (example) {
        for (let i = 0; i < 12; i++) {
          articleDataByMonth[i] = Math.floor(Math.random() * 100)
          contactDataByMonth[i] = Math.floor(Math.random() * 100)
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
          [activityLogData, activityLogDataByMonth],
          [articleData, articleDataByMonth],
          [contactData, contactDataByMonth],
          [moneyData, moneyDataByMonth],
          [questionData, questionDataByMonth],
          [technologyData, technologyDataByMonth],
          [userData, userDataByMonth],
        ].forEach(([data, dataByMonth]) =>
          incrementByMonth(data as { created_at: string }[], dataByMonth)
        )
      }

      switch (chartMethodType) {
        case 'annual': {
          const createData = (data, colors) => ({ data, colors })

          const dataMap = {
            Activities: createData(
              activityLogDataByMonth,
              colors.activityItemColors
            ),
            Articles: createData(articleDataByMonth, colors.articleItemColors),
            Contacts: createData(contactDataByMonth, colors.contactItemColors),
            Money: createData(moneyDataByMonth, colors.moneyItemColors),
            Question: createData(
              questionDataByMonth,
              colors.questionItemColors
            ),
            Technology: createData(
              technologyDataByMonth,
              colors.technologyItemColors
            ),
            Users: createData(userDataByMonth, colors.userItemColors),
          }

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
                  Articles: articleData,
                  Contacts: contactData,
                  Money: moneyData,
                  Question: questionData,
                  Technology: technologyData,
                  Users: userData,
                })[label]
            )
            .map(({ label }) => label)

          const totals = [
            articleDataByMonth,
            contactDataByMonth,
            moneyDataByMonth,
            questionDataByMonth,
            technologyDataByMonth,
            userDataByMonth,
          ].map((data) => data.reduce((sum, value) => sum + value, 0))

          return {
            labels,
            datasets: [
              {
                data: totals,
                borderWidth: 1.5,
                borderColor: totals.map(
                  (_, i) => Object.values(colors)[i + 1].primary
                ),
                backgroundColor: totals.map(
                  (_, i) => Object.values(colors)[i + 1].secondary
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

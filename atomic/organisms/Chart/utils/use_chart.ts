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
    userItemColors,
  }: UseColorsReturnInterface = useColors()

  const chartData: Ref<ChartInterface | undefined> = ref<ChartInterface>()

  const exampleColors = {
    activityItemColors: { primary: '#FFB600', hover: '#E7A60B' },
    articleItemColors: { primary: '#1187C7', hover: '#0F79B2' },
    contactItemColors: { primary: '#10B981', hover: '#10A674' },
    moneyItemColors: { primary: '#11c73b', hover: '#0eb233' },
    questionItemColors: { primary: '#8cb910', hover: '#8cb910' },
    userItemColors: { primary: '#64748B', hover: '#566479' },
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
    userData?: UserInterface[],
    example?: boolean
  ) {
    try {
      const labels: string[] = []
      const activityLogDataByMonth: number[] = new Array(12).fill(0)
      const articleDataByMonth: number[] = new Array(12).fill(0)
      const contactDataByMonth: number[] = new Array(12).fill(0)
      const moneyDataByMonth: number[] = new Array(12).fill(0)
      const questionDataByMonth: number[] = new Array(12).fill(0)
      const userDataByMonth: number[] = new Array(12).fill(0)

      const colors = example
        ? exampleColors
        : {
            activityItemColors,
            articleItemColors,
            contactItemColors,
            moneyItemColors,
            questionItemColors,
            userItemColors,
          }

      if (example) {
        for (let i = 0; i < 12; i++) {
          articleDataByMonth[i] = Math.floor(Math.random() * 100)
          contactDataByMonth[i] = Math.floor(Math.random() * 100)
          moneyDataByMonth[i] = Math.floor(Math.random() * 100)
          userDataByMonth[i] = Math.floor(Math.random() * 100)
        }
      } else {
        activityLogData?.forEach((activityLog: ActivityLogInterface): void => {
          const monthIndex: number = new Date(activityLog.created_at).getMonth()
          activityLogDataByMonth[monthIndex]++
        })

        articleData?.forEach((article: ArticleInterface): void => {
          const monthIndex: number = new Date(article.created_at).getMonth()
          articleDataByMonth[monthIndex]++
        })

        contactData?.forEach((contact: ContactInterface): void => {
          if (contact.created_at) {
            const monthIndex: number = new Date(contact.created_at).getMonth()
            contactDataByMonth[monthIndex]++
          }
        })

        moneyData?.forEach((money: MoneyInterface): void => {
          if (money.created_at) {
            const monthIndex: number = new Date(money.created_at).getMonth()
            moneyDataByMonth[monthIndex]++
          }
        })

        questionData?.forEach((question: QuestionInterface): void => {
          if (question.created_at) {
            const monthIndex: number = new Date(question.created_at).getMonth()
            questionDataByMonth[monthIndex]++
          }
        })

        userData?.forEach((user: UserInterface): void => {
          if (user.created_at) {
            const monthIndex: number = new Date(user.created_at).getMonth()
            userDataByMonth[monthIndex]++
          }
        })
      }

      switch (chartMethodType) {
        case 'annual':
          const dataTypes = [
            {
              label: 'Activities',
              data: activityLogDataByMonth,
              colors: colors.activityItemColors,
            },
            {
              label: 'Articles',
              data: articleDataByMonth,
              colors: colors.articleItemColors,
            },
            {
              label: 'Contacts',
              data: contactDataByMonth,
              colors: colors.contactItemColors,
            },
            {
              label: 'Money',
              data: moneyDataByMonth,
              colors: colors.moneyItemColors,
            },
            {
              label: 'Question',
              data: questionDataByMonth,
              colors: colors.questionItemColors,
            },
            {
              label: 'Users',
              data: userDataByMonth,
              colors: colors.userItemColors,
            },
          ]

          const datasets = dataTypes
            .map((dataType) => ({
              label: dataType.label,
              backgroundColor: dataType.colors.primary,
              borderColor: dataType.colors.primary,
              hoverBackgroundColor: dataType.colors.hover,
              data: dataType.data,
            }))
            .filter((dataset) => dataset.data.some((count) => count > 0))

          return { labels: months, datasets }

        case 'count':
          chartLabels.forEach(({ label }): void => {
            if (
              (label === 'Articles' && articleData) ||
              (label === 'Contacts' && contactData) ||
              (label === 'Money' && moneyData) ||
              (label === 'Question' && questionData) ||
              (label === 'Users' && userData)
            ) {
              labels.push(label)
            }
          })

          const totalArticles: number = articleDataByMonth.reduce(
            (sum: number, value: number) => sum + value,
            0
          )
          const totalContacts: number = contactDataByMonth.reduce(
            (sum: number, value: number) => sum + value,
            0
          )
          const totalMoney: number = moneyDataByMonth.reduce(
            (sum: number, value: number) => sum + value,
            0
          )
          const totalQuestions: number = questionDataByMonth.reduce(
            (sum: number, value: number) => sum + value,
            0
          )
          const totalUsers: number = userDataByMonth.reduce(
            (sum: number, value: number) => sum + value,
            0
          )

          return {
            labels,
            datasets: [
              {
                data: [
                  totalArticles,
                  totalContacts,
                  totalMoney,
                  totalQuestions,
                  totalUsers,
                ],
                borderColor: '#041E13FF',
                backgroundColor: [
                  colors.articleItemColors.primary,
                  colors.contactItemColors.primary,
                  colors.moneyItemColors.primary,
                  colors.questionItemColors.primary,
                  colors.userItemColors.primary,
                ],
                hoverBackgroundColor: [
                  colors.articleItemColors.hover,
                  colors.contactItemColors.hover,
                  colors.moneyItemColors.hover,
                  colors.questionItemColors.hover,
                  colors.userItemColors.hover,
                ],
              },
            ],
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
            color: '#39404a',
          },
        },
      }
    }

    return options
  }

  return { chartData, setChartData, setChartOptions }
}

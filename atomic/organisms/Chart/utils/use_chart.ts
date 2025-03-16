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
  LinkInterface,
} from 'atomic'

export function useChart() {
  const {
    activityItemColors,
    articleItemColors,
    contactItemColors,
    linkItemColors,
    moneyItemColors,
    questionItemColors,
    technologyItemColors,
    userItemColors,
  }: UseColorsReturnInterface = useColors()

  const chartData: Ref<ChartInterface | undefined> = ref<ChartInterface>()

  const exampleColors = {
    activityItemColors: { primary: '#FFB600', secondary: '#E7A60B35' },
    articleItemColors: { primary: '#1187C7', secondary: '#0F79B235' },
    contactItemColors: { primary: '#10B981', secondary: '#10A67435' },
    linkItemColors: { primary: '#10b3b9', secondary: '#0f93a435' },
    moneyItemColors: { primary: '#11c73b', secondary: '#0eb23335' },
    questionItemColors: { primary: '#8cb910', secondary: '#8cb91035' },
    technologyItemColors: { primary: '#b95910', secondary: '#9b4b0e35' },
    userItemColors: { primary: '#64748B', secondary: '#56647935' },
  }

  const chartLabels: { label: LabelItemType }[] = [
    { label: 'Articles' },
    { label: 'Contacts' },
    { label: 'Links' },
    { label: 'Money' },
    { label: 'Questions' },
    { label: 'Users' },
  ]

  function setChartData(
    chartMethodType: ChartMethodType,
    activityLogData?: ActivityLogInterface[],
    articleData?: ArticleInterface[],
    contactData?: ContactInterface[],
    linkData?: LinkInterface[],
    moneyData?: MoneyInterface[],
    questionData?: QuestionInterface[],
    technologyData?: TechnologyInterface[],
    userData?: UserInterface[],
    example?: boolean
  ) {
    try {
      let labels: string[] = []
      const dataByMonth = Object.fromEntries(
        [
          'activity',
          'article',
          'contact',
          'link',
          'money',
          'question',
          'technology',
          'user',
        ].map((key) => [`${key}`, new Array(12).fill(0)])
      )

      const colors = example
        ? exampleColors
        : {
            activityItemColors,
            articleItemColors,
            contactItemColors,
            linkItemColors,
            moneyItemColors,
            questionItemColors,
            technologyItemColors,
            userItemColors,
          }

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
          [contactData, dataByMonth.contact],
          [linkData, dataByMonth.link],
          [moneyData, dataByMonth.money],
          [questionData, dataByMonth.question],
          [technologyData, dataByMonth.technology],
          [userData, dataByMonth.user],
        ].forEach(([data, dataByMonth]) =>
          incrementByMonth(data as { created_at: string }[], dataByMonth)
        )
      }

      switch (chartMethodType) {
        case 'annual': {
          const createData = (data, colors) => ({ data, colors })

          const dataMap = {
            Activities: createData(
              dataByMonth.activity,
              colors.activityItemColors
            ),
            Articles: createData(dataByMonth.article, colors.articleItemColors),
            Contacts: createData(dataByMonth.contact, colors.contactItemColors),
            Links: createData(dataByMonth.link, colors.linkItemColors),
            Money: createData(dataByMonth.money, colors.moneyItemColors),
            Question: createData(
              dataByMonth.question,
              colors.questionItemColors
            ),
            Technology: createData(
              dataByMonth.technology,
              colors.technologyItemColors
            ),
            Users: createData(dataByMonth.user, colors.userItemColors),
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
                  Links: linkData,
                  Money: moneyData,
                  Question: questionData,
                  Technology: technologyData,
                  Users: userData,
                })[label]
            )
            .map(({ label }) => label)

          const totals = [
            dataByMonth.article,
            dataByMonth.contact,
            dataByMonth.link,
            dataByMonth.money,
            dataByMonth.question,
            dataByMonth.technology,
            dataByMonth.user,
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

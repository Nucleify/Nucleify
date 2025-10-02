import type { ColorItemInterface, EntityColorsInterface } from 'atomic'
import { allEntitiesKeys, months } from 'atomic'

export function prepareAnnualData(
  entitiesData: Record<string, ObjectType[]>,
  chartColors: EntityColorsInterface,
  example?: boolean,
  stacked?: boolean
) {
  const incrementByMonth = (
    data: { created_at: string }[],
    dataByMonth: number[]
  ) => {
    data?.forEach(
      ({ created_at }) => dataByMonth[new Date(created_at).getMonth()]++
    )
  }

  const dataByMonth = Object.fromEntries(
    [...allEntitiesKeys].map((key) => [`${key}`, new Array(12).fill(0)])
  )

  if (example) {
    for (let i = 0; i < 12; i++) {
      dataByMonth.article[i] = Math.floor(Math.random() * 100)
      dataByMonth.contact[i] = Math.floor(Math.random() * 100)
    }
  }

  ;[
    [entitiesData.activityLogData, dataByMonth.activity],
    [entitiesData.articleData, dataByMonth.article],
    [entitiesData.cardData, dataByMonth.card],
    [entitiesData.contactData, dataByMonth.contact],
    [entitiesData.documentationData, dataByMonth.documentation],
    [entitiesData.featureData, dataByMonth.feature],
    [entitiesData.fileData, dataByMonth.file],
    [entitiesData.linkData, dataByMonth.link],
    [entitiesData.moneyData, dataByMonth.money],
    [entitiesData.questionData, dataByMonth.question],
    [entitiesData.taskData, dataByMonth.task],
    [entitiesData.technologyData, dataByMonth.technology],
    [entitiesData.userData, dataByMonth.user],
  ].forEach(([data, dataByMonth]) =>
    incrementByMonth(data as { created_at: string }[], dataByMonth)
  )

  const createData = (data: number[], colors: ColorItemInterface) => ({
    data,
    colors,
  })

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
        ...(stacked && { stack: 'default' }),
      }))
      .filter(({ data }) => data.some((count) => count > 0)),
  }
}

import {
  allEntitiesKeys,
  type ChartType,
  type ColorItemInterface,
  type EntityColorsInterface,
  months,
} from 'atomic'

import {
  createScatterDatasets,
  createStackedDatasets,
  createStandardDatasets,
} from './dataset'

export function prepareAnnualData(
  entitiesData: Record<string, ObjectType[]>,
  chartColors: EntityColorsInterface,
  stacked?: boolean,
  comboTypes?: Record<string, 'bar' | 'line'>,
  chartType?: ChartType,
  exampleDataByMonth?: Record<string, number[]>
) {
  const incrementByMonth = (
    data: { created_at: string }[],
    dataByMonth: number[]
  ) => {
    data?.forEach(
      ({ created_at }) => dataByMonth[new Date(created_at).getMonth()]++
    )
  }

  const dataByMonth =
    exampleDataByMonth ||
    Object.fromEntries(
      [...allEntitiesKeys].map((key) => [`${key}`, new Array(12).fill(0)])
    )

  if (!exampleDataByMonth) {
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
  }

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

  let datasets

  if (chartType === 'scatter') {
    datasets = createScatterDatasets(dataTypes)
  } else if (stacked) {
    datasets = createStackedDatasets(dataTypes)
  } else {
    datasets = createStandardDatasets(dataTypes)
  }

  if (['pie', 'doughnut', 'polarArea'].includes(chartType || '')) {
    return {
      labels: dataTypes.map(({ label }) => label),
      datasets,
    }
  }

  return {
    labels: months,
    datasets,
  }
}

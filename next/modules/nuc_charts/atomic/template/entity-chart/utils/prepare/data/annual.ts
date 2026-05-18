import type { ChartType } from '../../../../../../../../atomic/organism/chart/types/variables'
import type {
  ColorItemInterface,
  EntityColorsInterface,
} from '../../../../../../../../modules/nuc_colors/atomic/boson/types/interfaces'
import { allEntitiesKeys } from '../../../../../../../../modules/nuc_fields/constants/keys/entities'
import { months } from '../../../../../../constants/months'
import { createScatterDatasets } from './dataset/scatter'
import { createStackedDatasets } from './dataset/stacked'
import { createStandardDatasets } from './dataset/standard'

export function prepareAnnualData(
  entitiesData: Record<string, unknown[]>,
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
      [entitiesData.contactData, dataByMonth.contact],
      [entitiesData.fileData, dataByMonth.file],
      [entitiesData.moneyData, dataByMonth.money],
      [entitiesData.questionData, dataByMonth.question],
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

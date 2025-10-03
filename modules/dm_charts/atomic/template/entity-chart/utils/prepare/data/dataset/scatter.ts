import type { ColorItemInterface } from 'atomic'

export function createScatterDatasets(
  dataTypes: Array<{
    label: string
    data: number[]
    colors: ColorItemInterface
  }>
) {
  return dataTypes
    .map(({ label, data, colors }) => ({
      label,
      data: data.map((value, monthIndex) => ({
        x: monthIndex,
        y: value,
      })),
      backgroundColor: colors.primary,
      borderColor: colors.primary,
      pointRadius: 5,
      pointHoverRadius: 7,
      pointBackgroundColor: colors.primary,
      pointBorderColor: colors.secondary,
      pointBorderWidth: 2,
    }))
    .filter(({ data }) => data.some(({ y }) => y > 0))
}

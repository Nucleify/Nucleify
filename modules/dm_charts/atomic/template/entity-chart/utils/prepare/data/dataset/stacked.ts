import type { ColorItemInterface } from 'atomic'

export function createStackedDatasets(
  dataTypes: Array<{
    label: string
    data: number[]
    colors: ColorItemInterface
  }>
) {
  return dataTypes
    .map(({ label, data, colors }) => ({
      label,
      backgroundColor: colors.secondary,
      borderColor: colors.primary,
      borderWidth: 1.5,
      data,
      stack: 'default',
    }))
    .filter(({ data }) => data.some((count) => count > 0))
}

import type { ColorItemInterface } from 'nucleify'

export function createStandardDatasets(
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
    }))
    .filter(({ data }) => data.some((count) => count > 0))
}

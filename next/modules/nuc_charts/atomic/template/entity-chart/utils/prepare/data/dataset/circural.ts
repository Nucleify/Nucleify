import type { ColorItemInterface } from 'nucleify'

export function createCircularDatasets(
  dataTypes: Array<{
    label: string
    data: number[]
    colors: ColorItemInterface
  }>
) {
  return [
    {
      data: dataTypes.map(({ data }) =>
        data.reduce((sum, val) => sum + val, 0)
      ),
      borderColor: dataTypes.map(({ colors }) => colors.secondary),
      borderWidth: 2,
    },
  ].filter((dataset) => dataset.data.some((val) => val > 0))
}

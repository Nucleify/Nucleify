import type { EntityColorsInterface } from 'atomic'

export function prepareCountData(
  entitiesData: Record<string, ObjectType[]>,
  chartColors: EntityColorsInterface,
  example?: boolean
) {
  const dataCounts = Object.entries(entitiesData)
    .map(([key, data]) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1).replace('Data', ''),
      data,
      count: data?.length || 0,
    }))
    .filter(({ data }) => data && data.length > 0)

  const labels = dataCounts.map(({ label }) => label)
  const totals = dataCounts.map(({ count }) => count)

  return {
    labels,
    datasets: [
      {
        data: totals,
        borderWidth: 1.5,
        borderColor: totals.map(
          (_, i) => Object.values(chartColors)[i]?.primary || '#000000'
        ),
        backgroundColor: totals.map(
          (_, i) => Object.values(chartColors)[i]?.secondary || '#000000'
        ),
      },
    ],
  }
}

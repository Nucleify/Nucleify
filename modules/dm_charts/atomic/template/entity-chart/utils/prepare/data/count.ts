import type { EntityColorsInterface } from 'atomic'

export function prepareCountData(
  entitiesData: Record<string, ObjectType[]>,
  chartColors: EntityColorsInterface,
  exampleDataByMonth?: Record<string, number[]>
) {
  let dataCounts

  if (exampleDataByMonth) {
    dataCounts = Object.entries(exampleDataByMonth)
      .map(([key, monthData]) => ({
        label: key.charAt(0).toUpperCase() + key.slice(1),
        key,
        data: monthData,
        count: monthData.reduce((sum, val) => sum + val, 0),
      }))
      .filter(({ count }) => count > 0)
  } else {
    dataCounts = Object.entries(entitiesData)
      .map(([key, data]) => ({
        label: key.charAt(0).toUpperCase() + key.slice(1).replace('Data', ''),
        key: key.replace('Data', ''),
        data,
        count: data?.length || 0,
      }))
      .filter(({ data }) => data && data.length > 0)
  }

  const labels = dataCounts.map(({ label }) => label)
  const totals = dataCounts.map(({ count }) => count)

  return {
    labels,
    datasets: [
      {
        data: totals,
        borderWidth: 1.5,
        borderColor: dataCounts.map(
          ({ key }) => chartColors[key]?.primary || '#000000'
        ),
        backgroundColor: dataCounts.map(
          ({ key }) => chartColors[key]?.secondary || '#000000'
        ),
      },
    ],
  }
}

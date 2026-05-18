import type { ChartSettingsGroupInterface } from '../types/interfaces'
import type { NucDisplayChartsStateKeyType } from '../types/variables'
import { modulesGroups } from './modules'

export function getDisplayChartGroups(): ChartSettingsGroupInterface[] {
  return [
    {
      name: 'nuc_admin',
      items: ['Admin'],
    },
    ...modulesGroups(true),
  ]
}

export function getDisplayChartList(): NucDisplayChartsStateKeyType[] {
  return getDisplayChartGroups().flatMap(
    (group) => group.items || []
  ) as NucDisplayChartsStateKeyType[]
}

export const displayChartGroups: ChartSettingsGroupInterface[] =
  getDisplayChartGroups()
export const displayChartList: NucDisplayChartsStateKeyType[] =
  getDisplayChartList()

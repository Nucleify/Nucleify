import { defineStore } from 'pinia'

import type {
  DMDisplayChartsStateInterface,
  DMDisplayChartsStateKeyType,
} from 'atomic'
import { displayChartList } from 'atomic'

export const useDisplayChartsStore = defineStore('displayCharts', {
  state: (): DMDisplayChartsStateInterface => {
    return displayChartList.reduce<DMDisplayChartsStateInterface>(
      (state, key) => {
        state[key as DMDisplayChartsStateKeyType] = true
        return state
      },
      {} as DMDisplayChartsStateInterface
    )
  },
  actions: {
    toggle(key: DMDisplayChartsStateKeyType): void {
      if (key in this) {
        this[key] = !this[key]
      }
    },
    setAllTrue(): void {
      displayChartList.forEach((key) => {
        this[key] = true
      })
    },
  },
  persist: true,
})

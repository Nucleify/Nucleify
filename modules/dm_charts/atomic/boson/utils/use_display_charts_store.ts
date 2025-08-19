import { defineStore } from 'pinia'

import type {
  DMDisplayChartsStateInterface,
  DMDisplayChartsStateKeyType,
} from 'atomic'
import { displayChartList } from 'atomic'

function initialStoreState(): DMDisplayChartsStateInterface {
  const state: DMDisplayChartsStateInterface = {}

  displayChartList.forEach((key: DMDisplayChartsStateKeyType): void => {
    state[key] = true
  })

  return state
}

export const useDisplayChartsStore = defineStore('displayCharts', {
  state: initialStoreState,
  actions: {
    toggle(key: DMDisplayChartsStateKeyType): void {
      if (key in this) {
        this[key] = !this[key]
      }
    },
    setAllTrue(): void {
      displayChartList.forEach((key: DMDisplayChartsStateKeyType): void => {
        this[key] = true
      })
    },
  },
  persist: true,
})

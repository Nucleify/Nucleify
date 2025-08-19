import { defineStore } from 'pinia'

import type {
  DMDisplayChartsStateInterface,
  DMDisplayChartsStateKeyType,
} from 'atomic'
import {
  displayChartList,
  initialStoreState,
  setAllStatesTo,
  toggleState,
} from 'atomic'

export const useDisplayChartsStore = defineStore('displayCharts', {
  state: (): DMDisplayChartsStateInterface =>
    initialStoreState(displayChartList, true),
  actions: {
    toggle(key: DMDisplayChartsStateKeyType): void {
      this[key] = toggleState(this[key])
    },
    setAllTo(value: boolean): void {
      this.$state = setAllStatesTo(this, value)
    },
  },
  persist: true,
})

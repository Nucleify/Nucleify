import { defineStore } from 'pinia'

import type {
  NucDisplayChartsStateInterface,
  NucDisplayChartsStateKeyType,
} from 'atomic'
import {
  displayChartList,
  initialStoreState,
  setAllStatesTo,
  toggleState,
} from 'atomic'

export const useDisplayChartsStore = defineStore('displayCharts', {
  state: (): NucDisplayChartsStateInterface =>
    initialStoreState(displayChartList, true),
  actions: {
    toggle(key: NucDisplayChartsStateKeyType): void {
      this[key] = toggleState(this[key])
    },
    setAllTo(value: boolean): void {
      this.$state = setAllStatesTo(this, value)
    },
  },
  persist: true,
})

import { defineStore } from 'pinia'

import type { DMDisplayChartsStateInterface } from 'atomic'

export const useDisplayChartsStore = defineStore('displayCharts', {
  state: (): DMDisplayChartsStateInterface => ({
    Activity: true,
    Admin: true,
    Article: true,
    Card: true,
    Contact: true,
    Entities: true,
    Feature: true,
    File: true,
    Link: true,
    Money: true,
    Question: true,
    Structural: true,
    Task: true,
    Technology: true,
  }),
  actions: {
    toggle(key: keyof DMDisplayChartsStateInterface) {
      this[key] = !this[key]
    },
    setAllTrue() {
      ;(Object.keys(this) as (keyof DMDisplayChartsStateInterface)[]).forEach(
        (k) => {
          this[k] = true
        }
      )
    },
  },
  persist: true,
})

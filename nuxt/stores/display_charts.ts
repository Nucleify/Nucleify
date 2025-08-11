import { defineStore } from 'pinia'

interface DisplayChartsState {
  Activity: boolean
  Admin: boolean
  Article: boolean
  Card: boolean
  Contact: boolean
  Entities: boolean
  Feature: boolean
  File: boolean
  Link: boolean
  Money: boolean
  Question: boolean
  Structural: boolean
  Task: boolean
  Technology: boolean
}

export const useDisplayChartsStore = defineStore('displayCharts', {
  state: (): DisplayChartsState => ({
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
    toggle(key: keyof DisplayChartsState) {
      this[key] = !this[key]
    },
    setAllTrue() {
      ;(Object.keys(this) as (keyof DisplayChartsState)[]).forEach((k) => {
        this[k] = true
      })
    },
  },
  persist: true,
})

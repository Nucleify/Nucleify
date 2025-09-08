export interface DmTimeCountdownInterface {
  date: Date | number | string
}

export interface DmTimeCalculateCountdownInterface {
  days: number
  hours: number
  minutes: number
  seconds: number
  finished: boolean
  expired: boolean
}

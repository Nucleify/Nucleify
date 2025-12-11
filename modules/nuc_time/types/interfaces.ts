export interface NucTimeCountdownInterface {
  date: Date | number | string
}

export interface NucTimeCalculateCountdownInterface {
  days: number
  hours: number
  minutes: number
  seconds: number
  finished: boolean
  expired: boolean
}

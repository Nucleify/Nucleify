import type { NucTimeCalculateCountdownInterface } from '../types/interfaces'
import { daysLeft } from './days_left'
import { hoursLeft } from './hours_left'
import { minutesLeft } from './minutes_left'
import { secondsLeft } from './seconds_left'

export function calculateCountdown(
  target: Date | number | string
): NucTimeCalculateCountdownInterface {
  const targetDate = new Date(target)
  const now = new Date()
  const diff = targetDate.getTime() - now.getTime()

  const isExpired = diff < 0
  const total = Math.abs(diff)

  const days = daysLeft(total)
  const hours = hoursLeft(total)
  const minutes = minutesLeft(total)
  const seconds = secondsLeft(total)

  return {
    days,
    hours,
    minutes,
    seconds,
    finished: total === 0,
    expired: isExpired,
  }
}

import type { NucTimeCalculateCountdownInterface } from 'atomic'
import { daysLeft, hoursLeft, minutesLeft, secondsLeft } from 'atomic'

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

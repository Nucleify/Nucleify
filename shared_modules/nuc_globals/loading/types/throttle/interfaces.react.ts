import type { IsThrottledType } from './variables.react'

export interface UseThrottleInterface {
  isThrottled: IsThrottledType
  throttle: (callback: () => void, delay: number) => void
}

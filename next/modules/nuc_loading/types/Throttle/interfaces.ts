import type { IsThrottledType } from './variables'

export interface UseThrottleInterface {
  isThrottled: IsThrottledType
  throttle: (callback: () => void, delay: number) => void
}

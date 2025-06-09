import type { IsThrottledType } from 'atomic'

export interface UseThrottleInterface {
  isThrottled: IsThrottledType
  throttle: (callback: () => void, delay: number) => void
}

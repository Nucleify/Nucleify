import { IsThrottledType } from 'atomic/bosons/types'

export interface UseThrottleInterface {
  isThrottled: IsThrottledType
  throttle: (callback: () => void, delay: number) => void
}

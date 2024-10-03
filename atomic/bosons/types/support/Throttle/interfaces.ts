import { IsThrottledType } from 'atomic/bosons/variables'

export interface UseThrottleInterface {
    isThrottled: IsThrottledType
    throttle: (callback: () => void, delay: number) => void
}

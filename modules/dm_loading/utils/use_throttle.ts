import type { Ref } from 'vue'
import { ref } from 'vue'

import type { UseThrottleInterface } from 'atomic'

export function useThrottle(): UseThrottleInterface {
  const isThrottled: Ref<boolean> = ref(false)

  function throttle(callback: () => void, delay: number): void {
    isThrottled.value = true
    setTimeout(callback, delay)
  }

  return { isThrottled, throttle }
}

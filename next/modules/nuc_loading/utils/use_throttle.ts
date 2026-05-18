'use client'

import { useState } from 'react'

import type { UseThrottleInterface } from 'nucleify'

export function useThrottle(): UseThrottleInterface {
  const [isThrottled, setIsThrottled] = useState(false)

  function throttle(callback: () => void, delay: number): void {
    setIsThrottled(true)
    setTimeout(callback, delay)
  }

  return { isThrottled, throttle }
}

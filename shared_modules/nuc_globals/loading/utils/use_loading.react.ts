'use client'

import { useState } from 'react'
import type { UseLoadingInterface } from '../types/loading/interfaces.react'
import type { LoadingType } from '../types/loading/variables.react'

export function useLoading(): UseLoadingInterface {
  const [loading, setLoadingState] = useState<LoadingType>(false)

  function setLoading(state: boolean, timeout?: number): void {
    if (timeout) {
      setTimeout(() => {
        setLoadingState(state)
      }, timeout)
    } else {
      setLoadingState(state)
    }
  }

  return {
    loading,
    setLoading,
  }
}

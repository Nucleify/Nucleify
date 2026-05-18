'use client'

import { useState } from 'react'

import type { LoadingRefType, UseLoadingInterface } from 'nucleify'

export function useLoading(): UseLoadingInterface {
  const [loading, setLoadingState] = useState<LoadingRefType>(false)

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

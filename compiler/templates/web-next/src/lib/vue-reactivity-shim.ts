'use client'

import { useCallback, useRef, useState } from 'react'

/** Minimal `reactive()` for migrated Vue setup scripts (product convert). */
export function useReactive<T extends Record<string, unknown>>(initial: T): T {
  const stateRef = useRef({ ...initial })
  const [, tick] = useState(0)
  const bump = useCallback(() => tick((n) => n + 1), [])

  return useRef(
    new Proxy(stateRef.current, {
      get(_target, prop: string) {
        return stateRef.current[prop as keyof T]
      },
      set(_target, prop: string, value) {
        stateRef.current = { ...stateRef.current, [prop]: value }
        bump()
        return true
      },
      deleteProperty(_target, prop: string) {
        const next = { ...stateRef.current }
        delete next[prop as keyof T]
        stateRef.current = next
        bump()
        return true
      },
    }),
  ).current
}

/** @deprecated use useReactive — kept for import compatibility */
export const reactive = useReactive

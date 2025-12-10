import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

import * as atomic from 'atomic'

import { testCases } from './cases'

describe('useDisplayChartsStore > state', (): void => {
  let store: atomic.NucDisplayChartsStateInterface
  let keys: atomic.NucDisplayChartsStateKeyType[]

  beforeEach((): void => {
    setActivePinia(createPinia())

    store = atomic.useDisplayChartsStore()
    keys = Object.keys(store.$state)
  })

  it('returns expected values for all state keys', (): void => {
    for (const key of keys) {
      for (const testCase of testCases) {
        store[key] = testCase.value

        expect(store[key]).toBe(testCase.value)
      }
    }
  })
})

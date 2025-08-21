import { describe, expect, it } from 'vitest'

import * as atomic from 'atomic'

import { testCases } from './cases'
import { testStateKeys } from './keys'

describe('initialStoreState', (): void => {
  testCases.forEach(({ value, description }): void => {
    it(`sets and returns > ${description}`, (): void => {
      const state: atomic.StoreStatesInterface<atomic.StoreStateType> =
        atomic.initialStoreState<atomic.StoreStateType>(testStateKeys, value)

      expect(Object.keys(state)).toHaveLength(testStateKeys.length)

      testStateKeys.forEach((key: atomic.StoreStateKeyType): void => {
        expect(state[key]).toBe(value)
      })
    })
  })
})

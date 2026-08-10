import { describe, expect, it } from 'vitest'

import * as nucleify from 'nucleify'

import { testCases } from './cases'
import { testStateKeys } from './keys'

describe('initialStoreState', (): void => {
  testCases.forEach(({ value, description }): void => {
    it(`sets and returns > ${description}`, (): void => {
      const state: nucleify.StoreStatesInterface<nucleify.StoreStateType> =
        nucleify.initialStoreState<nucleify.StoreStateType>(
          testStateKeys,
          value
        )

      expect(Object.keys(state)).toHaveLength(testStateKeys.length)

      testStateKeys.forEach((key: nucleify.StoreStateKeyType): void => {
        expect(state[key]).toBe(value)
      })
    })
  })
})

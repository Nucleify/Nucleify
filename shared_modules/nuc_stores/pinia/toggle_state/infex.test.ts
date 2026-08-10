import { describe, expect, it } from 'vitest'

import * as nucleify from 'nucleify'

import { testCases } from './cases'

describe('toggleState', (): void => {
  testCases.forEach(({ value, description }): void => {
    it(description, (): void => {
      if (typeof value === 'boolean') {
        expect(nucleify.toggleState(value)).toBe(!value)
      } else {
        expect(nucleify.toggleState(value)).toBe(value)
      }
    })
  })
})

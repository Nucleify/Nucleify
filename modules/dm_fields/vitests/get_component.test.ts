import { expect, it } from 'vitest'

import * as atomic from 'atomic'

it('returns AdTextarea for "textarea"', (): void => {
  expect(atomic.getComponent('textarea')).toBe(atomic.AdTextarea)
})

it('returns AdInputText for "input-text"', (): void => {
  expect(atomic.getComponent('input-text')).toBe(atomic.AdInputText)
})

it('returns AdDatePicker for "date-picker"', (): void => {
  expect(atomic.getComponent('date-picker')).toBe(atomic.AdDatePicker)
})

it('returns AdSelect for "select"', (): void => {
  expect(atomic.getComponent('select')).toBe(atomic.AdSelect)
})

it('returns AdPassword for "password"', (): void => {
  expect(atomic.getComponent('password')).toBe(atomic.AdPassword)
})

it('returns AdInputText for unknown types', (): void => {
  expect(
    atomic.getComponent('unknown-type' as unknown as atomic.ComponentType)
  ).toBe(atomic.AdInputText)
})

it('returns AdInputText for empty string', (): void => {
  expect(atomic.getComponent('' as unknown as atomic.ComponentType)).toBe(
    atomic.AdInputText
  )
})

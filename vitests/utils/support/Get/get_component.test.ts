import { it, expect } from 'vitest'

import { getComponent } from 'atomic/bosons/utils'

it('returns "ad-textarea" for "textarea"', (): void => {
  expect(getComponent('textarea')).toBe('ad-textarea')
})

it('returns "ad-input-text" for "input-text"', (): void => {
  expect(getComponent('input-text')).toBe('ad-input-text')
})

it('returns "ad-calendar" for "calendar"', (): void => {
  expect(getComponent('calendar')).toBe('ad-calendar')
})

it('returns "Dropdown" for "dropdown"', (): void => {
  expect(getComponent('dropdown')).toBe('Dropdown')
})

it('returns "ad-password" for "password"', (): void => {
  expect(getComponent('password')).toBe('ad-password')
})

it('returns "ad-input-text" for unknown types', (): void => {
  expect(getComponent('unknown-type')).toBe('ad-input-text')
})

it('returns "ad-input-text" for empty string', (): void => {
  expect(getComponent('')).toBe('ad-input-text')
})

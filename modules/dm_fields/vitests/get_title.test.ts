import { expect, it } from 'vitest'

import * as atomic from 'atomic'

it('returns undefined for undefined input', (): void => {
  expect(atomic.getTitle(undefined)).toBe('Unknown Entity')
})

it('returns title if "title" is present', (): void => {
  const selectedObject = { title: 'Example' } as unknown as atomic.ObjectType
  expect(atomic.getTitle(selectedObject)).toBe('Example')
})

it('returns title if "name" is present', (): void => {
  const selectedObject = { name: 'Example' } as unknown as atomic.ObjectType
  expect(atomic.getTitle(selectedObject)).toBe('Example')
})

it('returns title if "first_name" and "last_name" are present', (): void => {
  const selectedObject = {
    first_name: 'Example',
    last_name: 'Example',
  } as unknown as atomic.ObjectType
  expect(atomic.getTitle(selectedObject)).toBe('Example Example')
})

it('returns "Unknown Entity" if no relevant properties are present', (): void => {
  const selectedObject = { age: 23 } as unknown as atomic.ObjectType
  expect(atomic.getTitle(selectedObject)).toBe('Unknown Entity')
})

it('prioritizes title over other properties', (): void => {
  const selectedObject = {
    title: 'Title',
    name: 'Name',
    first_name: 'First Name',
    last_name: 'Last Name',
  } as unknown as atomic.ObjectType
  expect(atomic.getTitle(selectedObject)).toBe('Title')
})

it('prioritizes name over full name if both are present', (): void => {
  const selectedObject = {
    name: 'Name',
    first_name: 'Fist Name',
    last_name: 'Last Name',
  } as unknown as atomic.ObjectType
  expect(atomic.getTitle(selectedObject)).toBe('Name')
})

it('returns "Unknown Entity" for empty object', (): void => {
  const selectedObject = {} as unknown as atomic.ObjectType
  expect(atomic.getTitle(selectedObject)).toBe('Unknown Entity')
})

import { it, expect } from 'vitest'

import { getTitle } from 'atomic/bosons/utils'
import { ObjectType } from 'atomic/bosons/types'

it('returns undefined for undefined input', (): void => {
  expect(getTitle(undefined)).toBeUndefined()
})

it('returns title if "title" is present', (): void => {
  const selectedObject: ObjectType = { title: 'Example' }
  expect(getTitle(selectedObject)).toBe('Example')
})

it('returns title if "name" is present', (): void => {
  const selectedObject: ObjectType = { name: 'Example' }
  expect(getTitle(selectedObject)).toBe('Example')
})

it('returns title if "first_name" and "last_name" are present', (): void => {
  const selectedObject: ObjectType = {
    first_name: 'Example',
    last_name: 'Example',
  }
  expect(getTitle(selectedObject)).toBe('Example Example')
})

it('returns "Unknown Entity" if no relevant properties are present', (): void => {
  const selectedObject: ObjectType = { age: 23 }
  expect(getTitle(selectedObject)).toBe('Unknown Entity')
})

it('prioritizes title over other properties', (): void => {
  const selectedObject: ObjectType = {
    title: 'Title',
    name: 'Name',
    first_name: 'First Name',
    last_name: 'Last Name',
  }
  expect(getTitle(selectedObject)).toBe('Title')
})

it('prioritizes name over full name if both are present', (): void => {
  const selectedObject: ObjectType = {
    name: 'Name',
    first_name: 'Fist Name',
    last_name: 'Last Name',
  }
  expect(getTitle(selectedObject)).toBe('Name')
})

it('returns "Unknown Entity" for empty object', (): void => {
  const selectedObject: ObjectType = {}
  expect(getTitle(selectedObject)).toBe('Unknown Entity')
})

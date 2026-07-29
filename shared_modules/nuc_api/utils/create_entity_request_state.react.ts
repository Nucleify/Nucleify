'use client'

import type { AppFramework } from './app_framework'
import { assertAppFramework } from './app_framework'

import { useState } from 'react'
import type {
  EntityCollectionState,
  EntityRequestState,
  EntityScalarState,
} from '../types/entity/interfaces.react'

export function createEntityRequestState<T>(
  framework: AppFramework
): EntityRequestState<T> {
  assertAppFramework(framework, 'next')

  const [results, setResults] = useState<T[]>([])
  const [createdLastWeek, setCreatedLastWeek] = useState<number>(0)

  return {
    results,
    createdLastWeek,
    setResults,
    setCreatedLastWeek,
  }
}

export function createEntityCollectionState<T>(
  framework: AppFramework
): EntityCollectionState<T> {
  assertAppFramework(framework, 'next')

  const [items, setItems] = useState<T[]>([])

  return {
    items,
    setItems,
  }
}

export function createEntityScalarState<T>(
  framework: AppFramework,
  initial: T
): EntityScalarState<T> {
  assertAppFramework(framework, 'next')

  const [value, setValue] = useState(initial)

  return {
    value,
    setValue,
  }
}

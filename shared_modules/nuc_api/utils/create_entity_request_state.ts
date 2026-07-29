import { ref } from 'vue'

import type { AppFramework } from './app_framework'
import { assertAppFramework } from './app_framework'

import type {
  EntityCollectionState,
  EntityRequestState,
  EntityScalarState,
} from '../types/entity/interfaces'

export function createEntityRequestState<T>(
  framework: AppFramework
): EntityRequestState<T> {
  assertAppFramework(framework, 'nuxt')

  const results = ref<T[]>([])
  const createdLastWeek = ref(0)

  return {
    results: results as EntityRequestState<T>['results'],
    createdLastWeek,
    setResults: (items) => {
      results.value = items
    },
    setCreatedLastWeek: (count) => {
      createdLastWeek.value = count
    },
  }
}

export function createEntityCollectionState<T>(
  framework: AppFramework
): EntityCollectionState<T> {
  assertAppFramework(framework, 'nuxt')

  const items = ref<T[]>([])

  return {
    items: items as EntityCollectionState<T>['items'],
    setItems: (value) => {
      items.value = value
    },
  }
}

export function createEntityScalarState<T>(
  framework: AppFramework,
  initial: T
): EntityScalarState<T> {
  assertAppFramework(framework, 'nuxt')

  const value = ref(initial)

  return {
    value: value as EntityScalarState<T>['value'],
    setValue: (next) => {
      value.value = next
    },
  }
}

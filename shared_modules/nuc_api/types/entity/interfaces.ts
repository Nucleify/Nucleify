import type { EntityCountResultsType, EntityResultsType } from './variables'

export type EntityRequestState<T> = {
  results: EntityResultsType<T>
  createdLastWeek: EntityCountResultsType
  setResults: (items: T[]) => void
  setCreatedLastWeek: (count: number) => void
}

export type EntityCollectionState<T> = {
  items: EntityResultsType<T>
  setItems: (items: T[]) => void
}

export type EntityScalarState<T> = {
  value: T extends number ? EntityCountResultsType : T
  setValue: (value: T) => void
}

import type {
  AuthFormSetFields,
  EntityCountResultsType,
  EntityResultsType,
} from 'nucleify'

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
  value: T
  setValue: AuthFormSetFields<T>
}

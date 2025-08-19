import type { StoreKeyType } from './variables'

export interface StoreStatesInterface<T> {
  [key: StoreKeyType]: T
}

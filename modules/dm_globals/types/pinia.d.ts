import type { PersistedStateOptions } from 'pinia-plugin-persistedstate'

declare module 'pinia' {
  export interface DefineStoreOptionsBase<
    S extends StateTree = StateTree,
    Store = unknown,
  > {
    persist?: boolean | PersistedStateOptions
  }
}

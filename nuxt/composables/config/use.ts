import { runtime } from './runtime'

export const useConfig = () => ({
  get: (key: string) => runtime.get(key),
})

export const apiUrl = () => useConfig().get('apiUrl')

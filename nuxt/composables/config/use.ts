import { runtime } from './runtime'

export const useConfig = () => ({
  get: (key: string) => runtime.get(key),
})

export const apiUrl = () => useConfig().get('apiUrl')
export const appUrl = () => useConfig().get('appUrl')
export const appEnv = () => useConfig().get('appEnv')

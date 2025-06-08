import type { useRuntimeConfig } from 'nuxt/app'

export type ConfigValueType = string | number | boolean | object | null
export type ConfigGetterType = () => ConfigValueType
export type ConfigMapType = Record<string, ConfigGetterType>

export type RuntimeConfigType = ReturnType<typeof useRuntimeConfig> | null

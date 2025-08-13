import { useRuntimeConfig } from 'nuxt/app'
import type { ConfigMapType, ConfigValueType, RuntimeConfigType } from './types'

class RuntimeConfig {
  private static instance: RuntimeConfig
  private config: ConfigMapType = {}
  private runtime: RuntimeConfigType | null = null

  private constructor() {}

  private init(): void {
    if (!this.runtime) {
      this.runtime = useRuntimeConfig()
      this.registerAll(this.runtime.public, 'public')
      this.registerAll(this.runtime, 'private')
    }
  }

  private registerAll(obj: Record<string, unknown>, prefix: string): void {
    for (const [key, value] of Object.entries(obj)) {
      const path = prefix === 'public' ? key : `${prefix}.${key}`
      this.config[path] = () => value as ConfigValueType

      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        this.registerAll(value as Record<string, unknown>, path)
      }
    }
  }

  static getInstance(): RuntimeConfig {
    if (!this.instance) {
      this.instance = new RuntimeConfig()
    }
    return this.instance
  }

  get(key: string): ConfigValueType | null {
    this.init()
    return this.config[key]?.() ?? null
  }

  get [Symbol.iterator](): IterableIterator<string> {
    this.init()
    return Object.keys(this.config)[Symbol.iterator]()
  }
}

export const runtime = new Proxy(RuntimeConfig.getInstance(), {
  get(
    target,
    prop: string
  ): ConfigValueType | null | RuntimeConfig[keyof RuntimeConfig] {
    if (prop in target) return target[prop as keyof typeof target]
    return target.get(prop)
  },
})

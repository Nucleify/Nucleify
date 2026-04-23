import { afterEach } from 'vitest'

type TimerCallback = (...args: unknown[]) => void

const activeTimeouts = new Set<NodeJS.Timeout>()
const activeIntervals = new Set<NodeJS.Timeout>()
const activeRafIds = new Set<number>()

const originalSetTimeout = globalThis.setTimeout
const originalClearTimeout = globalThis.clearTimeout
const originalSetInterval = globalThis.setInterval
const originalClearInterval = globalThis.clearInterval

const createMemoryStorage = (): Storage => {
  const store = new Map<string, string>()

  return {
    get length(): number {
      return store.size
    },
    clear(): void {
      store.clear()
    },
    getItem(key: string): string | null {
      return store.has(key) ? (store.get(key) ?? null) : null
    },
    key(index: number): string | null {
      return Array.from(store.keys())[index] ?? null
    },
    removeItem(key: string): void {
      store.delete(key)
    },
    setItem(key: string, value: string): void {
      store.set(key, String(value))
    },
  }
}

const storage = createMemoryStorage()

Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: storage,
})

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    value: storage,
  })
}

const trackedSetTimeout = (
  callback: TimerCallback,
  delay?: number,
  ...args: unknown[]
) => {
  const id = originalSetTimeout(() => {
    activeTimeouts.delete(id)
    callback(...args)
  }, delay)
  activeTimeouts.add(id)
  return id
}

const trackedClearTimeout = (id?: NodeJS.Timeout) => {
  if (id) {
    activeTimeouts.delete(id)
    originalClearTimeout(id)
  }
}

const trackedSetInterval = (
  callback: TimerCallback,
  delay?: number,
  ...args: unknown[]
) => {
  const id = originalSetInterval(callback, delay, ...args)
  activeIntervals.add(id)
  return id
}

const trackedClearInterval = (id?: NodeJS.Timeout) => {
  if (id) {
    activeIntervals.delete(id)
    originalClearInterval(id)
  }
}

const raf = (callback: FrameRequestCallback): number => {
  const id = trackedSetTimeout(
    () => callback(Date.now()),
    16
  ) as unknown as number
  activeRafIds.add(id)
  return id
}

const cancelRaf = (id: number) => {
  activeRafIds.delete(id)
  trackedClearTimeout(id as unknown as NodeJS.Timeout)
}

globalThis.setTimeout = trackedSetTimeout as typeof setTimeout
globalThis.clearTimeout = trackedClearTimeout as typeof clearTimeout
globalThis.setInterval = trackedSetInterval as typeof setInterval
globalThis.clearInterval = trackedClearInterval as typeof clearInterval
globalThis.requestAnimationFrame ??= raf
globalThis.cancelAnimationFrame ??= cancelRaf

if (typeof global !== 'undefined') {
  global.setTimeout = trackedSetTimeout as typeof global.setTimeout
  global.clearTimeout = trackedClearTimeout as typeof global.clearTimeout
  global.setInterval = trackedSetInterval as typeof global.setInterval
  global.clearInterval = trackedClearInterval as typeof global.clearInterval
  global.requestAnimationFrame = raf as typeof global.requestAnimationFrame
  global.cancelAnimationFrame = cancelRaf as typeof global.cancelAnimationFrame
}

if (typeof window !== 'undefined') {
  window.setTimeout = trackedSetTimeout as typeof window.setTimeout
  window.clearTimeout = trackedClearTimeout as typeof window.clearTimeout
  window.setInterval = trackedSetInterval as typeof window.setInterval
  window.clearInterval = trackedClearInterval as typeof window.clearInterval
  window.requestAnimationFrame ??= raf
  window.cancelAnimationFrame ??= cancelRaf
}

afterEach(() => {
  activeTimeouts.forEach((id) => originalClearTimeout(id))
  activeTimeouts.clear()
  activeIntervals.forEach((id) => originalClearInterval(id))
  activeIntervals.clear()
  activeRafIds.forEach((id) => cancelRaf(id))
  activeRafIds.clear()
})

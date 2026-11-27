import { onBeforeUnmount, onMounted } from 'vue'

import { isAutomatedAudit } from '../utils/is_lab'

type Options = {
  /** Skip start when prefers-reduced-motion or automated audit. */
  respectReducedMotion?: boolean
}

/**
 * Client-only interval that respects reduced motion / audit and clears on unmount.
 * Returns start/stop for callers that need to restart the clock.
 */
export function useRespectfulInterval(
  tick: () => void,
  intervalMs: number | undefined,
  options: Options = {}
) {
  const { respectReducedMotion = true } = options
  let timer: number | undefined
  let enabled = false

  function clear(): void {
    if (timer) {
      window.clearInterval(timer)
      timer = undefined
    }
  }

  function start(): void {
    clear()
    if (!enabled || !intervalMs || !import.meta.client) return
    timer = window.setInterval(tick, intervalMs)
  }

  function stop(): void {
    enabled = false
    clear()
  }

  onMounted(() => {
    if (!intervalMs || !import.meta.client) return
    if (
      respectReducedMotion &&
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        isAutomatedAudit())
    ) {
      return
    }
    enabled = true
    start()
  })

  onBeforeUnmount(stop)

  return { start, stop, clear }
}

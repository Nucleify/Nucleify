import { type MaybeRefOrGetter, ref, toValue } from 'vue'

import { useRespectfulInterval } from './use_respectful_interval'

type Options = {
  length: MaybeRefOrGetter<number>
  intervalMs: number
  respectReducedMotion?: boolean
}

/** Shared carousel index: pause on hover / lock after click. */
export function useAutoRotateIndex(options: Options) {
  const activeIndex = ref(0)
  const paused = ref(false)
  const hovering = ref(false)

  function select(index: number, lock = false): void {
    activeIndex.value = index
    if (lock) paused.value = true
  }

  function tick(): void {
    if (paused.value || hovering.value) return
    const len = toValue(options.length)
    if (len === 0) return
    activeIndex.value = (activeIndex.value + 1) % len
  }

  useRespectfulInterval(tick, options.intervalMs, {
    respectReducedMotion: options.respectReducedMotion,
  })

  return { activeIndex, paused, hovering, select, tick }
}

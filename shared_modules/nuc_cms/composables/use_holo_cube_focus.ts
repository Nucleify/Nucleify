import { ref } from 'vue'

import { useRespectfulInterval } from './use_respectful_interval'

import type { NucHomeModuleLaneId } from '../cms/defaults/content/home'
import { HOLO_CUBE_LANES } from '../utils/holo_cube_faces'

type Options = {
  /** When set, cycle focus while not paused/hovering. */
  intervalMs?: number
  initial?: NucHomeModuleLaneId
  /** Lock auto-rotate after a manual face click (default true). */
  pauseOnFocus?: boolean
  /** Respect prefers-reduced-motion / audit (default true when interval set). */
  respectReducedMotion?: boolean
}

/** Shared holo-cube focus + optional auto-rotate. */
export function useHoloCubeFocus(options: Options = {}) {
  const {
    intervalMs,
    initial = 'sdk',
    pauseOnFocus = true,
    respectReducedMotion = true,
  } = options

  const focusId = ref<NucHomeModuleLaneId>(initial)
  const paused = ref(false)
  const hovering = ref(false)

  function onFocus(id: NucHomeModuleLaneId): void {
    focusId.value = id
    if (pauseOnFocus) paused.value = true
  }

  function nextLane(): void {
    if (paused.value || hovering.value) return
    const i = HOLO_CUBE_LANES.indexOf(focusId.value)
    const idx = i < 0 ? 0 : (i + 1) % HOLO_CUBE_LANES.length
    focusId.value = HOLO_CUBE_LANES[idx]!
  }

  useRespectfulInterval(nextLane, intervalMs, { respectReducedMotion })

  return { focusId, paused, hovering, onFocus, nextLane }
}

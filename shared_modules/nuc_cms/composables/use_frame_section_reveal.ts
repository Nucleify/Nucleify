import { nextTick, onBeforeUnmount, onMounted, type Ref } from 'vue'

import {
  type FrameSectionRevealSpec,
  scheduleShellSectionReveal,
} from '../utils/frame_section_reveal'
/**
 * Bind scroll reveal for this section once the shell marks scroll-ready.
 * Pass the section root ref and a co-located motion spec.
 */
export function useFrameSectionReveal(
  rootRef: Ref<HTMLElement | null | undefined>,
  spec: FrameSectionRevealSpec,
  compactMaxWidth = 960
): void {
  let stop: (() => void) | undefined

  onMounted(() => {
    void nextTick(() => {
      const el = rootRef.value
      if (!el) return
      stop = scheduleShellSectionReveal(el, spec, compactMaxWidth)
    })
  })

  onBeforeUnmount(() => {
    stop?.()
    stop = undefined
  })
}

import { computed, type MaybeRefOrGetter, toValue } from 'vue'

import type { BreakpointVisibility } from '../cms/merge_props'
import {
  anyBreakpointOn,
  breakpointShowClasses,
  dealPanelClasses,
  heroPanelOffClasses,
  resolveBreakpointVisibility,
} from '../utils/breakpoint_panel'

/** Cube-only visibility (thank-you, etc.). */
export function useCubeVisibility(
  raw: MaybeRefOrGetter<unknown>,
  fallback: BreakpointVisibility
) {
  const showCube = computed(() =>
    resolveBreakpointVisibility(toValue(raw), fallback)
  )
  const showAnyCube = computed(() => anyBreakpointOn(showCube.value))
  const cubeClasses = computed(() =>
    breakpointShowClasses('cube', showCube.value)
  )
  return { showCube, showAnyCube, cubeClasses }
}

/** Cube + glance panel used by hero / intro / module board. */
export function useBreakpointPanel(
  cubeRaw: MaybeRefOrGetter<unknown>,
  glanceRaw: MaybeRefOrGetter<unknown>,
  cubeFallback: BreakpointVisibility,
  glanceFallback: BreakpointVisibility
) {
  const showCube = computed(() =>
    resolveBreakpointVisibility(toValue(cubeRaw), cubeFallback)
  )
  const showGlance = computed(() =>
    resolveBreakpointVisibility(toValue(glanceRaw), glanceFallback)
  )
  const showAnyCube = computed(() => anyBreakpointOn(showCube.value))
  const showAnyGlance = computed(() => anyBreakpointOn(showGlance.value))
  const showAnyPanel = computed(() => showAnyCube.value || showAnyGlance.value)
  const panelClasses = computed(() =>
    dealPanelClasses(showCube.value, showGlance.value)
  )
  const layoutClasses = computed(() =>
    heroPanelOffClasses(showCube.value, showGlance.value)
  )

  return {
    showCube,
    showGlance,
    showAnyCube,
    showAnyGlance,
    showAnyPanel,
    panelClasses,
    /** Alias for deal / slice panels that share the same class map. */
    visibilityClasses: panelClasses,
    layoutClasses,
  }
}

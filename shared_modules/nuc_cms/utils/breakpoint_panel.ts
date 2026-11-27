import type { BreakpointVisibility } from '../cms/merge_props'
import { coalesceBreakpointVisibility } from '../cms/merge_props'

/** Investor / company deal panel — cube hidden on mobile by default. */
export const DEFAULT_SHOW_CUBE: BreakpointVisibility = {
  mobile: false,
  tablet: true,
  desktop: true,
}

export const DEFAULT_SHOW_GLANCE: BreakpointVisibility = {
  mobile: true,
  tablet: false,
  desktop: true,
}

/** Home hero module board — cube on every breakpoint. */
export const DEFAULT_SHOW_CUBE_HOME: BreakpointVisibility = {
  mobile: true,
  tablet: true,
  desktop: true,
}

export const DEFAULT_SHOW_GLANCE_HOME: BreakpointVisibility = {
  mobile: false,
  tablet: false,
  desktop: true,
}

export function anyBreakpointOn(v: BreakpointVisibility): boolean {
  return v.mobile || v.tablet || v.desktop
}

export function resolveBreakpointVisibility(
  raw: unknown,
  fallback: BreakpointVisibility
): BreakpointVisibility {
  return coalesceBreakpointVisibility(raw, fallback)
}

/** CSS hooks: `show-cube-mobile`, `show-glance-tablet`, … */
export function breakpointShowClasses(
  kind: 'cube' | 'glance',
  v: BreakpointVisibility
): Record<string, boolean> {
  return {
    [`show-${kind}-mobile`]: v.mobile,
    [`show-${kind}-tablet`]: v.tablet,
    [`show-${kind}-desktop`]: v.desktop,
  }
}

export function dealPanelClasses(
  cube: BreakpointVisibility,
  glance: BreakpointVisibility
): Record<string, boolean> {
  return {
    ...breakpointShowClasses('cube', cube),
    ...breakpointShowClasses('glance', glance),
  }
}

/** Hero layout: collapse side panel when cube+glance are off at a breakpoint. */
export function heroPanelOffClasses(
  cube: BreakpointVisibility,
  glance: BreakpointVisibility
): Record<string, boolean> {
  const panelOn = (bp: keyof BreakpointVisibility) => cube[bp] || glance[bp]
  return {
    'is-cube-off-tablet': !panelOn('tablet'),
    'is-cube-off-desktop': !panelOn('desktop'),
  }
}

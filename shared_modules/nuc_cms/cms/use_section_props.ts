import {
  type ComputedRef,
  computed,
  getCurrentInstance,
  onMounted,
  onUpdated,
  useAttrs,
  watch,
} from 'vue'

import {
  applyLegacyTitleLines,
  coalesceArray,
  coalesceBoolean,
  coalesceBreakpointVisibility,
  coalesceNumber,
  coalesceString,
  coalesceStringFields,
  coalesceStringRows,
  isPlainObject,
  mergeCopyBag,
  pickCopy,
  restoreMultilineDefaults,
} from './merge_props'

import {
  NUC_HOME_COMPILER_NODES,
  NUC_HOME_COPY,
  NUC_HOME_INSTALL_STEPS,
  NUC_HOME_MODULES,
  NUC_HOME_PILLARS,
  NUC_HOME_PULSE_SHELLS,
  NUC_HOME_STACK,
  type NucHomeCompilerNode,
  type NucHomeModule,
  type NucHomePillar,
  type NucHomeStackItem,
} from './defaults/content/home'
import { NUC_INVESTOR_COPY } from './defaults/content/investor'

export type { BreakpointVisibility } from './merge_props'

export { useAutoRotateIndex } from '../composables/use_auto_rotate_index'
export {
  useBreakpointPanel,
  useCubeVisibility,
} from '../composables/use_breakpoint_panel'
export { useContactFormPanel } from '../composables/use_contact_form_panel'
export { useHoloCubeFocus } from '../composables/use_holo_cube_focus'
export { useRespectfulInterval } from '../composables/use_respectful_interval'
export {
  anyBreakpointOn,
  breakpointShowClasses,
  DEFAULT_SHOW_CUBE,
  DEFAULT_SHOW_CUBE_HOME,
  DEFAULT_SHOW_GLANCE,
  DEFAULT_SHOW_GLANCE_HOME,
  dealPanelClasses,
  heroPanelOffClasses,
  resolveBreakpointVisibility,
} from '../utils/breakpoint_panel'
export { scrollFrameTo } from '../utils/frame_scroll'
export {
  HOLO_CUBE_LANES,
  type HoloCubeFace,
  holoCubeFaces,
} from '../utils/holo_cube_faces'
export {
  applyLegacyTitleLines,
  coalesceArray,
  coalesceBoolean,
  coalesceBreakpointVisibility,
  coalesceNumber,
  coalesceString,
  coalesceStringFields,
  coalesceStringRows,
  isPlainObject,
  mergeCopyBag,
  pickCopy,
  restoreMultilineDefaults,
}

const HOME_LEGACY_TITLES = [
  ['headline', 'headlineLead', 'headlineTrail'],
  ['cloneTitle', 'cloneTitleLead', 'cloneTitleTrail'],
  ['compilerTitle', 'compilerTitleLead', 'compilerTitleTrail'],
  ['pulseTitle', 'pulseTitleLead', 'pulseTitleTrail'],
] as const

const HOME_MULTILINE_TITLE_KEYS = [
  'headline',
  'pillarsTitle',
  'stackTitle',
  'pulseTitle',
  'cloneTitle',
  'compilerTitle',
  'closeTitle',
] as const

const INVESTOR_MULTILINE_TITLE_KEYS = [
  'headline',
  'thesisTitle',
  'savingsTitle',
  'wedgeTitle',
  'surfaceTitle',
  'askTitle',
] as const

/** Flat CMS props from layout `v-bind` — pair with `defineOptions({ inheritAttrs: false })`. */
export function useCmsAttrs(): Record<string, unknown> {
  return useAttrs() as Record<string, unknown>
}

/**
 * DOM id for scroll rail / observeActiveSection.
 * FrameSections passes unique `anchorId` / `id` + `data-section-id`.
 * Also stamps `data-section-id` on the host root (attrs alone do not, with
 * inheritAttrs: false) so the rail observer can find the panel.
 */
export function useSectionDomId(fallback: string): ComputedRef<string> {
  const attrs = useAttrs()
  const instance = getCurrentInstance()
  const domId = computed(() => {
    const anchor = attrs.anchorId
    if (typeof anchor === 'string' && anchor.trim()) return anchor.trim()
    const id = attrs.id
    if (typeof id === 'string' && id.trim()) return id.trim()
    return fallback
  })

  function stampHost(): void {
    const raw = instance?.proxy?.$el ?? instance?.vnode?.el
    const el = raw as HTMLElement | null | undefined
    if (!el || el.nodeType !== 1) return
    el.id = domId.value
    const sectionId = attrs['data-section-id']
    if (typeof sectionId === 'string' && sectionId.trim()) {
      el.setAttribute('data-section-id', sectionId.trim())
    }
  }

  onMounted(stampHost)
  onUpdated(stampHost)
  watch(domId, stampHost)

  return domId
}

/** Vue-friendly merge of string copy keys from flat CMS props. */
export function useMergedCopy<T extends Record<string, string>>(
  defaults: T,
  props: Record<string, unknown>,
  keys: (keyof T & string)[]
): ComputedRef<T> {
  return computed(() => mergeCopyBag(defaults, props, keys))
}

/** Home marketing copy: CMS overrides on top of `NUC_HOME_COPY` defaults. */
export function useHomeCmsCopy(): ComputedRef<Record<string, string>> {
  const cms = useCmsAttrs()
  // String fields only — bags also hold arrays like `thankYouProof`.
  const defaults = { ...NUC_HOME_COPY } as unknown as Record<string, string>
  return computed(() =>
    restoreMultilineDefaults(
      applyLegacyTitleLines(
        mergeCopyBag(defaults, cms, Object.keys(defaults)),
        cms,
        HOME_LEGACY_TITLES
      ),
      defaults,
      HOME_MULTILINE_TITLE_KEYS
    )
  )
}

/** Investor pitch copy: CMS overrides on top of `NUC_INVESTOR_COPY`. */
export function useInvestorCmsCopy(): ComputedRef<Record<string, string>> {
  const cms = useCmsAttrs()
  const defaults = { ...NUC_INVESTOR_COPY } as unknown as Record<string, string>
  return computed(() =>
    restoreMultilineDefaults(
      mergeCopyBag(defaults, cms, Object.keys(defaults)),
      defaults,
      INVESTOR_MULTILINE_TITLE_KEYS
    )
  )
}

export function cmsHomeModules(cms: Record<string, unknown>): NucHomeModule[] {
  return coalesceArray(cms.modules, NUC_HOME_MODULES) as NucHomeModule[]
}

export function cmsHomePillars(cms: Record<string, unknown>): NucHomePillar[] {
  return coalesceArray(cms.items, NUC_HOME_PILLARS) as NucHomePillar[]
}

export function cmsHomeStack(cms: Record<string, unknown>): NucHomeStackItem[] {
  const items = coalesceArray(cms.items, NUC_HOME_STACK) as NucHomeStackItem[]
  return items.map((item) => {
    const command = String(item.command ?? '')
    const target =
      command.match(/--target=([a-z0-9-]+)/i)?.[1]?.toLowerCase() ??
      command.match(/-t=([a-z0-9-]+)/i)?.[1]?.toLowerCase() ??
      command.match(/TARGET=([a-z0-9-]+)/i)?.[1]?.toLowerCase()
    const adminCommand =
      typeof item.adminCommand === 'string' && item.adminCommand.length > 0
        ? item.adminCommand
        : target
          ? `make admin --target=${target}`
          : command.replace(/^make web\b/, 'make admin')
    const cliCommand =
      typeof item.cliCommand === 'string' && item.cliCommand.length > 0
        ? item.cliCommand
        : target
          ? `nuc emit ./Button.vue --target=${target}`
          : command
    return { ...item, command, adminCommand, cliCommand }
  })
}

export function cmsHomeInstallSteps(cms: Record<string, unknown>): string[] {
  return coalesceStringRows(cms.installSteps, NUC_HOME_INSTALL_STEPS)
}

export function cmsHomePulseShells(cms: Record<string, unknown>): string[] {
  return coalesceStringRows(cms.shells, NUC_HOME_PULSE_SHELLS)
}

function normalizeSnippet(raw: unknown, fallback: readonly string[]): string[] {
  if (Array.isArray(raw) && raw.length > 0) return raw.map(String)
  if (typeof raw === 'string' && raw.length > 0) return raw.split('\n')
  return [...fallback]
}

/** Compiler emit nodes — CMS may store `snippet` as a multiline string. */
export function cmsHomeCompilerNodes(
  cms: Record<string, unknown>
): NucHomeCompilerNode[] {
  const raw = cms.nodes
  if (!Array.isArray(raw) || raw.length === 0) {
    return NUC_HOME_COMPILER_NODES.map((n) => ({
      ...n,
      snippet: [...n.snippet],
    }))
  }
  return raw.map((item, index) => {
    const fb = NUC_HOME_COMPILER_NODES[index] ?? NUC_HOME_COMPILER_NODES[0]!
    if (!isPlainObject(item)) {
      return { ...fb, snippet: [...fb.snippet] }
    }
    return {
      id: coalesceString(item.id, fb.id),
      label: coalesceString(item.label, fb.label),
      icon: coalesceString(item.icon, fb.icon),
      color: coalesceString(item.color, fb.color),
      command: coalesceString(item.command, fb.command),
      file: coalesceString(item.file, fb.file),
      snippet: normalizeSnippet(item.snippet, fb.snippet),
      x: coalesceNumber(item.x, fb.x),
      y: coalesceNumber(item.y, fb.y),
    }
  })
}

export function snippetLines(
  override: unknown,
  fallback: readonly string[]
): string[] {
  if (typeof override === 'string' && override.length) {
    return override.split('\n')
  }
  if (Array.isArray(override) && override.length) {
    if (typeof override[0] === 'string') return override as string[]
    return coalesceStringRows(override, fallback)
  }
  return [...fallback]
}

/** Whether a CMS section should mount on the public page. */
export function isSectionVisible(
  props: Record<string, unknown> | null | undefined
): boolean {
  const value = props?.showSection
  if (value === false || value === 0 || value === '0' || value === 'false') {
    return false
  }
  return true
}

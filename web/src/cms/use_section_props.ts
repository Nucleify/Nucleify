import { type ComputedRef, computed, useAttrs } from 'vue'

import {
  coalesceArray,
  coalesceBoolean,
  coalesceNumber,
  coalesceString,
  coalesceStringRows,
  isPlainObject,
  mergeCopyBag,
  NUC_HOME_COMPILER_NODES,
  NUC_HOME_COPY,
  NUC_HOME_INSTALL_STEPS,
  NUC_HOME_MODULES,
  NUC_HOME_PILLARS,
  NUC_HOME_PULSE_SHELLS,
  NUC_HOME_STACK,
  NUC_INVESTOR_COPY,
  type NucHomeCompilerNode,
  type NucHomeModule,
  type NucHomePillar,
  type NucHomeStackItem,
  pickCopy,
} from '@shared_modules'

export {
  coalesceArray,
  coalesceBoolean,
  coalesceNumber,
  coalesceString,
  coalesceStringRows,
  isPlainObject,
  mergeCopyBag,
  pickCopy,
}

/** Flat CMS props from layout `v-bind` — pair with `defineOptions({ inheritAttrs: false })`. */
export function useCmsAttrs(): Record<string, unknown> {
  return useAttrs() as Record<string, unknown>
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
  return computed(() => mergeCopyBag(defaults, cms, Object.keys(defaults)))
}

/** Investor pitch copy: CMS overrides on top of `NUC_INVESTOR_COPY`. */
export function useInvestorCmsCopy(): ComputedRef<Record<string, string>> {
  const cms = useCmsAttrs()
  const defaults = { ...NUC_INVESTOR_COPY } as unknown as Record<string, string>
  return computed(() => mergeCopyBag(defaults, cms, Object.keys(defaults)))
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

export function layoutPanelSide(
  props: Record<string, unknown>
): 'left' | 'right' | 'hidden' {
  const show = props.showPanel
  if (show === false) return 'hidden'
  const side = props.panelSide
  if (side === 'left' || side === 'right' || side === 'hidden') return side
  return 'right'
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

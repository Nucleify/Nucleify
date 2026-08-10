/**
 * Authoring runtime for `*.nuc.tsx`.
 * Host-agnostic: description only — emit targets materialise the UI.
 */

export type PropDef = {
  type: 'string' | 'number' | 'boolean' | 'unknown'
  optional?: boolean
  default?: unknown
}

export type ComponentDesc = {
  name: string
  props?: Record<string, PropDef>
  handlers?: Record<string, (...args: never[]) => unknown>
  styles?: { css?: string }
  render: (...args: never[]) => unknown
}

/** Declare a portable component. Compiler parses the call site; runtime is a no-op identity. */
export function component<T extends ComponentDesc>(desc: T): T {
  return desc
}

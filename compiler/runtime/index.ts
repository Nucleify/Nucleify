/**
 * Authoring runtime for `*.nuc.tsx`.
 * Host-agnostic markers — emit targets materialise the UI.
 * These helpers are compile-time only and must not appear in emitted bundles.
 */

export type PropDef = {
  type: 'string' | 'number' | 'boolean' | 'unknown'
  optional?: boolean
  default?: unknown
}

/** Reactive cell used in authoring as `count.value` / `count.set(...)`. */
export type StateCell<T> = {
  value: T
  set: (next: T) => void
}

/** Derived cell used in authoring as `double.value`. */
export type DerivedCell<T> = {
  value: T
}

export type ComponentDesc = {
  name: string
  props?: Record<string, PropDef>
  handlers?: Record<string, (...args: never[]) => unknown>
  styles?: { css?: string }
  /** v0 form — mutually exclusive with `setup`. */
  render?: (...args: never[]) => unknown
  /** Faza 7 form — mutually exclusive with `render` / top-level `handlers`. */
  setup?: (props: never) => unknown
}

/** Declare a portable component. Compiler parses the call site; runtime is a no-op identity. */
export function component<T extends ComponentDesc>(desc: T): T {
  return desc
}

/** Authoring marker for mutable state. Compiler parses call sites; runtime is a stub. */
export function state<T>(initial: T): StateCell<T> {
  return {
    value: initial,
    set(_next: T) {
      /* compile-time only */
    },
  }
}

/** Authoring marker for derived values. Compiler parses call sites; runtime is a stub. */
export function derived<T>(compute: () => T): DerivedCell<T> {
  return { value: compute() }
}

/** Authoring marker for event handlers. Compiler parses call sites; runtime is identity. */
export function handler<T extends (...args: never[]) => unknown>(fn: T): T {
  return fn
}

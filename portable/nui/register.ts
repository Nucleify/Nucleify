/**
 * Client-only Lit element registration for nucleify-ui `nui-*` tags.
 * Use `ensureNuiRegistered()` — never static-import components (SSR would double-register).
 */
let registered = false
let loading: Promise<void> | undefined

export function ensureNuiRegistered(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (registered) return Promise.resolve()
  if (!loading) {
    loading = Promise.all([
      import('nucleify-ui/components/nui-button'),
      import('nucleify-ui/components/nui-dialog'),
      import('nucleify-ui/components/nui-icon'),
      import('nucleify-ui/components/nui-input-text'),
      import('nucleify-ui/components/nui-select'),
      import('nucleify-ui/components/nui-toast'),
    ]).then(() => {
      registered = true
    })
  }
  return loading
}

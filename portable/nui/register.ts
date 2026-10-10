/**
 * Client-only Lit element registration for nucleify-ui `nui-*` tags.
 * Use `ensureNuiRegistered()` — never static-import components (SSR would double-register).
 *
 * Hero CTAs need `nui-button` ASAP (empty host until define → layout jump). Load
 * button + icon first; defer dialog/input/select/toast.
 */
let registered = false
let loading: Promise<void> | undefined

export function ensureNuiRegistered(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (registered) return Promise.resolve()
  if (!loading) {
    loading = import('nucleify-ui/components/nui-button')
      .then(() => import('nucleify-ui/components/nui-icon'))
      .then(() => {
        registered = true
        void Promise.all([
          import('nucleify-ui/components/nui-dialog'),
          import('nucleify-ui/components/nui-input-text'),
          import('nucleify-ui/components/nui-select'),
          import('nucleify-ui/components/nui-toast'),
        ])
      })
  }
  return loading
}

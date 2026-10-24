/**
 * Client-only Lit element registration for nucleify-ui `nui-*` tags.
 * Use `ensureNuiRegistered()` - never static-import components (SSR would double-register).
 *
 * Resolves only after every listed tag is defined (customElements.whenDefined)
 * and constructable shadow stylesheets have settled (nucleify-ui applies a
 * temporary `:host { visibility: hidden }` sheet until CSS loads). Shells that
 * gate first paint on this promise avoid input/button layout jumps.
 */
const NUI_TAGS = [
  'nui-button',
  'nui-icon',
  'nui-checkbox',
  'nui-dialog',
  'nui-input-text',
  'nui-select',
  'nui-textarea',
  'nui-toast',
] as const

let registered = false
let loading: Promise<void> | undefined

type LitHost = HTMLElement & { updateComplete?: Promise<unknown> }

function shadowCssText(root: ShadowRoot): string {
  try {
    return root.adoptedStyleSheets
      .flatMap((sheet) =>
        Array.from(sheet.cssRules).map((rule) => rule.cssText)
      )
      .join('')
  } catch {
    return ''
  }
}

/** True while nucleify-ui still has the pending-host placeholder sheet. */
function isPendingShadow(root: ShadowRoot | null): boolean {
  if (!root || root.adoptedStyleSheets.length === 0) return true
  const css = shadowCssText(root)
  if (!css) return false
  return css.includes('visibility: hidden') && css.length < 120
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | undefined> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(undefined), ms)
    promise.then(
      (value) => {
        clearTimeout(timer)
        resolve(value)
      },
      () => {
        clearTimeout(timer)
        resolve(undefined)
      }
    )
  })
}

async function waitForStyledShadow(el: LitHost, deadlineMs = 1500): Promise<void> {
  if (el.updateComplete) {
    await withTimeout(Promise.resolve(el.updateComplete), deadlineMs)
  }
  const deadline = performance.now() + deadlineMs
  while (performance.now() < deadline) {
    if (!isPendingShadow(el.shadowRoot)) return
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
  }
}

/**
 * Connect form-facing tags once off-screen so `styles.sync()` finishes before reveal.
 * Shares the module-level stylesheet cache with later real mounts.
 */
async function warmNuiShadowStyles(): Promise<void> {
  if (typeof document === 'undefined') return
  // Only warm controls that cause CLS on first paint (skip dialog/toast/icon).
  const warmTags = [
    'nui-button',
    'nui-checkbox',
    'nui-input-text',
    'nui-select',
    'nui-textarea',
  ] as const

  const park = document.createElement('div')
  park.setAttribute('aria-hidden', 'true')
  park.style.cssText =
    'position:fixed;inset:0;width:0;height:0;overflow:hidden;visibility:hidden;pointer-events:none'
  document.documentElement.appendChild(park)

  const hosts = warmTags.map((tag) => {
    const el = document.createElement(tag) as LitHost
    park.appendChild(el)
    return el
  })

  try {
    await withTimeout(Promise.all(hosts.map((el) => waitForStyledShadow(el))), 2000)
  } finally {
    park.remove()
  }
}

export function ensureNuiRegistered(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (registered) return Promise.resolve()
  if (!loading) {
    loading = Promise.all([
      import('nucleify-ui/components/nui-button'),
      import('nucleify-ui/components/nui-icon'),
      import('nucleify-ui/components/nui-checkbox'),
      import('nucleify-ui/components/nui-dialog'),
      import('nucleify-ui/components/nui-input-text'),
      import('nucleify-ui/components/nui-select'),
      import('nucleify-ui/components/nui-textarea'),
      import('nucleify-ui/components/nui-toast'),
    ])
      .then(() =>
        Promise.all(NUI_TAGS.map((tag) => customElements.whenDefined(tag)))
      )
      .then(() => warmNuiShadowStyles())
      .then(() => {
        registered = true
      })
  }
  return loading
}

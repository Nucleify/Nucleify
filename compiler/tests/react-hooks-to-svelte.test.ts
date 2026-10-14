import { describe, expect, it } from 'vitest'
import {
  reactHooksToSvelteRunes,
  reactScriptPartToSvelte,
} from '../src/sync/react-hooks-to-svelte'

describe('reactHooksToSvelteRunes', () => {
  it('strips react imports and use client', () => {
    const out = reactHooksToSvelteRunes(
      [
        "'use client'",
        "import { useState, useMemo } from 'react'",
        "import type { ReactNode } from 'react'",
        "const [open, setOpen] = useState(false)",
      ].join('\n'),
    )
    expect(out).not.toContain('use client')
    expect(out).not.toContain("from 'react'")
    expect(out).toContain('let open = $state(false)')
  })

  it('rewrites useState + setters (value and functional)', () => {
    const out = reactHooksToSvelteRunes(
      [
        'const [n, setN] = useState(0)',
        'const [name, setName] = useState("")',
        'setN(1)',
        'setN((v) => v + 1)',
        'setName(state.name)',
      ].join('\n'),
    )
    expect(out).toContain('let n = $state(0)')
    expect(out).toContain('let name = $state("")')
    expect(out).toContain('n = 1')
    expect(out).toContain('n = ((v) => v + 1)(n)')
    expect(out).toContain('name = state.name')
    expect(out).not.toContain('setN(')
    expect(out).not.toContain('setName(')
  })

  it('preserves useState generics', () => {
    const out = reactHooksToSvelteRunes(
      "const [focusId, setFocusId] = useState<NucHomeModuleLaneId>('sdk')",
    )
    expect(out).toContain("let focusId = $state('sdk')")
    expect(out).not.toContain('useState')
  })

  it('rewrites useMemo with nested parens into $derived', () => {
    const out = reactHooksToSvelteRunes(
      [
        'const traditionalCost = useMemo(() => Math.max(shellsActive, 0), [shellsActive])',
        'const nucleifyCost = useMemo(() => (shellsActive > 0 ? 1 : 0), [shellsActive])',
        "const docsHref = useMemo(() => homeDocsHref(lang, 'intro'), [lang])",
      ].join('\n'),
    )
    expect(out).toContain('let traditionalCost = $derived(Math.max(shellsActive, 0))')
    expect(out).toContain('let nucleifyCost = $derived((shellsActive > 0 ? 1 : 0))')
    expect(out).toContain("let docsHref = $derived(homeDocsHref(lang, 'intro'))")
    expect(out).not.toContain('useMemo')
    expect(out).not.toContain(', [')
  })

  it('rewrites useEffect into $effect and drops dep arrays', () => {
    const out = reactHooksToSvelteRunes(
      [
        'useEffect(() => {',
        '  console.log(n)',
        '  return () => cleanup()',
        '}, [n, open])',
      ].join('\n'),
    )
    expect(out).toContain('$effect(() => {')
    expect(out).not.toContain('useEffect')
    expect(out).not.toContain(', [n, open])')
    expect(out).toContain('return () => cleanup()')
  })

  it('rewrites useRef to $state and strips .current', () => {
    const out = reactHooksToSvelteRunes(
      [
        'const rootEl = useRef<HTMLDivElement | null>(null)',
        'const box = useRef(0)',
        'rootEl.current = el',
        'box.current += 1',
      ].join('\n'),
    )
    expect(out).toContain('let rootEl = $state(null)')
    expect(out).toContain('let box = $state(0)')
    expect(out).toContain('rootEl = el')
    expect(out).toContain('box += 1')
    expect(out).not.toContain('.current')
    expect(out).not.toContain('useRef')
  })

  it('unwraps useCallback', () => {
    const out = reactHooksToSvelteRunes(
      [
        'const onClick = useCallback(() => {',
        '  setN(1)',
        '}, [n])',
        'const id = useCallback((x: number) => x + 1, [])',
      ].join('\n'),
    )
    expect(out).not.toContain('useCallback')
    expect(out).toContain('const onClick = (() => {')
    expect(out).toContain('const id = ((x: number) => x + 1)')
  })

  it('does not rewrite setProperty as a state setter', () => {
    const out = reactHooksToSvelteRunes(
      [
        'const [n, setN] = useState(0)',
        'el.style.setProperty("--home-iris", "165%")',
      ].join('\n'),
    )
    expect(out).toContain('el.style.setProperty("--home-iris", "165%")')
    expect(out).toContain('let n = $state(0)')
  })
})

describe('reactScriptPartToSvelte', () => {
  it('drops react imports and rewrites next/navigation', () => {
    const part = reactScriptPartToSvelte({
      imports: [
        "import { useState, useMemo } from 'react'",
        "import { useParams } from 'next/navigation'",
        "import { NUC_HOME_COPY } from './content'",
      ],
      body: [
        'const params = useParams()',
        "const [open, setOpen] = useState(false)",
        "const lang = useMemo(() => (params.lang as string) || 'en', [params])",
      ],
      propNames: [],
      emitFields: [],
      emitHandlers: [],
    })
    expect(part.imports.join('\n')).not.toContain("from 'react'")
    expect(part.imports.join('\n')).toContain("from '@/lib/svelte-navigation'")
    expect(part.body.join('\n')).toContain('let open = $state(false)')
    expect(part.body.join('\n')).toContain('let lang = $derived((params.lang as string) || \'en\')')
  })

  it('hoists lazy() to a static import', () => {
    const part = reactScriptPartToSvelte({
      imports: ["import { lazy, Suspense } from 'react'"],
      body: ["const Pillars = lazy(() => import('./sections/pillars/index.vue'))"],
      propNames: [],
      emitFields: [],
      emitHandlers: [],
    })
    expect(part.imports.join('\n')).toContain(
      "import Pillars from './sections/pillars/index.vue'",
    )
    expect(part.body.join('\n')).not.toContain('lazy')
  })

  it('injects useId shim when useId() is used without import', () => {
    const part = reactScriptPartToSvelte({
      imports: ["import { useId } from 'react'"],
      body: ['const uid = `h${useId().replace(/[^a-zA-Z0-9]/g, "")}`'],
      propNames: [],
      emitFields: [],
      emitHandlers: [],
    })
    expect(part.imports.join('\n')).toContain(
      "import { useId } from '@/lib/svelte-react-shims'",
    )
    expect(part.body.join('\n')).toContain('useId()')
  })

  it('keeps useReactive import when it was split from the react import block', () => {
    const part = reactScriptPartToSvelte({
      imports: [
        "import { useState } from 'react'",
        "import { useReactive } from '@/lib/vue-reactivity-shim'",
      ],
      body: [
        'const errors = useReactive<{ email?: string }>({})',
        "const [email, setEmail] = useState('')",
      ],
      propNames: [],
      emitFields: [],
      emitHandlers: [],
    })
    expect(part.imports.join('\n')).toContain('vue-reactivity-shim')
    expect(part.body.join('\n')).toContain('useReactive<{ email?: string }>({})')
    expect(part.body.join('\n')).toContain("let email = $state('')")
  })

  it('reinjects useReactive when the react multi-import ate the shim line', () => {
    // Legacy shape: react + shim were one imports[] entry; stripping react drops both.
    const part = reactScriptPartToSvelte({
      imports: [
        "import { useState } from 'react'\nimport { useReactive } from '@/lib/vue-reactivity-shim'",
      ],
      body: ['const errors = useReactive<{ email?: string }>({})'],
      propNames: [],
      emitFields: [],
      emitHandlers: [],
    })
    expect(part.imports.join('\n')).toContain(
      "import { useReactive } from '@/lib/vue-reactivity-shim'",
    )
  })
})

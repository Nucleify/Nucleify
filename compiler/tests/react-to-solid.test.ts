import { describe, expect, it } from 'vitest'
import { reactTsxToSolidBody } from '../src/sync/react-to-solid'

describe('reactTsxToSolidBody', () => {
  it('strips use client and rewrites className / useState', () => {
    const input = `'use client'

import { useState } from 'react'

export default function Box() {
  const [open, setOpen] = useState(false)
  return <div className="box">{open}</div>
}
`
    const out = reactTsxToSolidBody(input)
    expect(out).not.toContain('use client')
    expect(out).not.toContain('className')
    expect(out).toContain('createSignal')
    expect(out).toContain('class="box"')
    expect(out).toContain('{open()}')
  })

  it('rewrites useMemo with nested parens without dropping closers', () => {
    const input = `import { useMemo, useState } from 'react'

export default function Pulse() {
  const [shellsActive, setShellsActive] = useState(0)
  const traditionalCost = useMemo(() => Math.max(shellsActive, 0), [shellsActive])
  const nucleifyCost = useMemo(() => (shellsActive > 0 ? 1 : 0), [shellsActive])
  const docsHref = useMemo(() => homeDocsHref(lang, 'intro'), [lang])
  return <div>{traditionalCost}</div>
}
`
    const out = reactTsxToSolidBody(input)
    expect(out).toContain('createMemo(() => Math.max(shellsActive(), 0))')
    expect(out).toContain('createMemo(() => (shellsActive() > 0 ? 1 : 0))')
    expect(out).toContain("createMemo(() => homeDocsHref(lang, 'intro'))")
    expect(out).toContain('{traditionalCost()}')
    expect(out).not.toMatch(/createMemo\([^)]*\[[^\]]*$/m)
    expect(out).not.toContain(', [')
  })

  it('injects useRef / useParams compat imports', () => {
    const input = `import { useState } from 'react'

export default function Page() {
  const params = useParams()
  const el = useRef(null)
  const [n, setN] = useState(0)
  return <div ref={el}>{n}</div>
}
`
    const out = reactTsxToSolidBody(input)
    expect(out).toContain("import { useRef } from '@/lib/react-compat'")
    expect(out).toContain("import { useParams } from '@solidjs/router'")
    expect(out).toContain('{n()}')
  })

  it('rewrites lazy+Suspense to eager imports for product scroll shells', () => {
    const input = `import { useEffect, Suspense, lazy } from 'react'

const Child = lazy(() => import('./child'))

export default function Page() {
  useEffect(() => {
    console.log('mount')
  }, [])
  return (
    <div>
      <ul>{items.map((item) => <li key={item.id}>{item.name}</li>)}</ul>
      <div key={\`\${active.id}:\${focused.id}\`} className="readout" />
      <Suspense fallback={null}>
        <Child />
      </Suspense>
    </div>
  )
}
`
    const out = reactTsxToSolidBody(input)
    expect(out).toContain("import Child from './child'")
    expect(out).not.toContain('lazy')
    expect(out).not.toContain('Suspense')
    expect(out).toContain("from 'solid-js'")
    expect(out).toContain('onMount(() => {')
    expect(out).not.toMatch(/onMount\([^)]*,\s*\[/)
    expect(out).not.toContain('key=')
    expect(out).not.toContain(':${focused')
    expect(out).toContain('class="readout"')
    expect(out).toContain('<Child />')
  })

  it('does not unwrap property keys, dotted names, strings, or JSX attrs', () => {
    const input = `import { useState, useMemo } from 'react'

export default function Form() {
  const params = useParams()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const lang = useMemo(() => (params.lang as string) || 'en', [params])
  const errors = useReactive<{ email?: string }>({})
  setEmail(state.email)
  return <nui-input-text value={name} name="name" placeholder={\`Hi \${name}\`} />
}
`
    const out = reactTsxToSolidBody(input)
    expect(out).toContain('(params.lang as string)')
    expect(out).toContain('email?: string')
    expect(out).toContain('state.email')
    expect(out).toContain('name="name"')
    expect(out).toContain('value={name()}')
    expect(out).toContain('${name()}')
    expect(out).toContain("createMemo(() => (params.lang as string) || 'en')")
  })

  it('folds SVG stop-color attrs into style so CSS vars paint gradients', () => {
    const input = `export default function Cube() {
  return (
    <radialGradient>
      <stop offset="0%" stopColor="hsl(var(--rainbow-hue) 88% 68%)" stopOpacity="0.22" />
      <stop offset="100%" stop-color="red" stop-opacity={0} />
    </radialGradient>
  )
}
`
    const out = reactTsxToSolidBody(input)
    expect(out).toContain('style="stop-color: hsl(var(--rainbow-hue) 88% 68%); stop-opacity: 0.22"')
    expect(out).toContain('style="stop-color: red; stop-opacity: 0"')
    expect(out).not.toMatch(/stopColor=/)
    expect(out).not.toMatch(/stop-color="/)
  })
})

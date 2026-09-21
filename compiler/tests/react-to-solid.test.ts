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
})

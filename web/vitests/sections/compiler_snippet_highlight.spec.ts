import { describe, expect, it } from 'vitest'

import { highlightSnippetLine } from '../../src/sections/compiler_demo/highlight'

function kinds(line: string): string[] {
  return highlightSnippetLine(line).map((t) => `${t.kind}:${t.text}`)
}

describe('highlightSnippetLine', () => {
  it('colors imports, strings, and hooks', () => {
    const tokens = kinds("import { useState, useMemo } from 'react'")
    expect(tokens.some((t) => t.startsWith('kw:import'))).toBe(true)
    expect(tokens.some((t) => t.startsWith("str:'react'"))).toBe(true)
    expect(tokens.some((t) => t.startsWith('fn:useState'))).toBe(true)
  })

  it('colors JSX tags and attributes', () => {
    const tokens = kinds('    <NuiButton variant="filled"')
    expect(tokens.some((t) => t.startsWith('tag:NuiButton'))).toBe(true)
    expect(tokens.some((t) => t.startsWith('attr:variant'))).toBe(true)
    expect(tokens.some((t) => t.startsWith('str:"filled"'))).toBe(true)
  })

  it('marks Astro fences and comments', () => {
    expect(kinds('---')[0]).toMatch(/^punct:/)
    expect(kinds('// note')[0]).toMatch(/^comment:/)
  })
})

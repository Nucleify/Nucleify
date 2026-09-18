import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { irDocumentSchema, parseIrDocument } from '../src/ir/schema'

const fixturesDir = join(dirname(fileURLToPath(import.meta.url)), 'fixtures/ir')

function loadFixture(name: string): unknown {
  return JSON.parse(readFileSync(join(fixturesDir, `${name}.json`), 'utf8'))
}

describe('IR v0.1 schema', () => {
  for (const name of ['hello', 'button', 'list'] as const) {
    it(`parses compiler/tests/fixtures/ir/${name}.json`, () => {
      const raw = loadFixture(name)
      const doc = parseIrDocument(raw)
      expect(doc.irVersion).toBe('0.1.0')
      expect(doc.portable).toBe(true)
      expect(doc.name.length).toBeGreaterThan(0)
    })
  }

  it('rejects wrong irVersion', () => {
    const hello = loadFixture('hello') as Record<string, unknown>
    expect(() =>
      irDocumentSchema.parse({ ...hello, irVersion: '0.0.0' }),
    ).toThrow()
  })

  it('rejects portable: false', () => {
    const hello = loadFixture('hello') as Record<string, unknown>
    expect(() =>
      irDocumentSchema.parse({ ...hello, portable: false }),
    ).toThrow()
  })
})

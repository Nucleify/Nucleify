import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { IR_VERSION } from '../src/ir/types'
import { irDocumentSchema } from '../src/ir/schema'

const fixturesDir = join(dirname(fileURLToPath(import.meta.url)), 'fixtures/ir')

describe('IR_VERSION sync', () => {
  it('schema literal matches IR_VERSION constant', () => {
    const lit = irDocumentSchema.shape.irVersion
    expect(lit.value).toBe(IR_VERSION)
  })

  it('every fixtures/ir/*.json uses IR_VERSION', () => {
    const files = readdirSync(fixturesDir).filter((f) => f.endsWith('.json'))
    expect(files.length).toBeGreaterThan(0)
    for (const file of files) {
      const raw = JSON.parse(readFileSync(join(fixturesDir, file), 'utf8')) as {
        irVersion?: string
      }
      expect(raw.irVersion, file).toBe(IR_VERSION)
    }
  })
})

import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { parseIrDocument } from '../src/ir/schema'
import { writeOutputs } from '../src/sync/write-outputs'

const fixtures = join(dirname(fileURLToPath(import.meta.url)), 'fixtures')

describe('product sibling emit', () => {
  it('writes vue/react/css next to web authoring even without demo apps', async () => {
    const ir = parseIrDocument(
      JSON.parse(readFileSync(join(fixtures, 'ir/button.json'), 'utf8')),
    )
    const tmp = mkdtempSync(join(tmpdir(), 'nuc-product-'))
    try {
      const sourcePath = join(tmp, 'web/src/pages/home/sections/demo/demo.nuc.tsx')
      mkdirSync(dirname(sourcePath), { recursive: true })
      writeFileSync(sourcePath, '//')
      const { written } = await writeOutputs({
        cwd: tmp,
        sourcePath,
        ir,
        target: 'all',
      })
      const rel = written.map((p) => p.replace(/\\/g, '/'))
      expect(rel.some((p) => p.endsWith('web/src/pages/home/sections/demo/demo.vue'))).toBe(true)
      expect(rel.some((p) => p.endsWith('web/src/pages/home/sections/demo/demo.tsx'))).toBe(true)
      expect(rel.some((p) => p.endsWith('web/src/pages/home/sections/demo/demo.css'))).toBe(true)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  }, 60_000)
})

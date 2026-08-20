import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { parseIrDocument } from '../src/ir/schema'
import { parseVueToIr } from '../src/parse/vue'
import { emitNucTsx } from '../src/emit/nuc'
import { parseTsxToIr } from '../src/parse/tsx'
import { checkWorkspace } from '../src/sync/check'
import { isDirty } from '../src/sync/fingerprint'
import { runImport } from '../src/sync/import'

const monorepo = join(dirname(fileURLToPath(import.meta.url)), '../..')
const fixtures = join(monorepo, 'portable/fixtures')

describe('parseVueToIr roundtrip', () => {
  for (const name of ['hello', 'button', 'counter'] as const) {
    it(`parses golden emit/vue/${name}.vue`, () => {
      const vue = readFileSync(join(fixtures, `emit/vue/${name}.vue`), 'utf8')
      const expected = parseIrDocument(
        JSON.parse(readFileSync(join(fixtures, `ir/${name}.json`), 'utf8')),
      )
      const actual = parseVueToIr(vue, join(fixtures, `emit/vue/${name}.vue`), { name: expected.name })
      expect(actual.name).toBe(expected.name)
      expect(actual.props).toEqual(expected.props)
      expect(actual.state).toEqual(expected.state)
      expect(actual.derived).toEqual(expected.derived)
      expect(actual.handlers).toEqual(expected.handlers)
      expect(actual.template).toEqual(expected.template)
      if (expected.styles?.css) {
        expect(actual.styles?.css).toBe(expected.styles.css)
      }
    })
  }

  it('emitNucTsx → parseTsxToIr preserves hello IR', () => {
    const ir = parseIrDocument(JSON.parse(readFileSync(join(fixtures, 'ir/hello.json'), 'utf8')))
    const nuc = emitNucTsx(ir)
    const round = parseTsxToIr(nuc, 'hello.nuc.tsx')
    expect({ ...round, meta: ir.meta }).toEqual(ir)
  })
})

describe('import vue', () => {
  it('imports edited vue back to nuc.tsx and refreshes siblings', async () => {
    const tmp = mkdtempSync(join(tmpdir(), 'nuc-import-'))
    try {
      const dir = join(tmp, 'portable')
      mkdirSync(dir, { recursive: true })
      const nucPath = join(dir, 'hello.nuc.tsx')
      const vuePath = join(dir, 'hello.vue')
      const sourceNuc = readFileSync(join(fixtures, 'source/hello.nuc.tsx'), 'utf8')
      const sourceVue = readFileSync(join(fixtures, 'emit/vue/hello.vue'), 'utf8')
      writeFileSync(nucPath, sourceNuc, 'utf8')
      writeFileSync(vuePath, sourceVue.replace('class="hello"', 'class="hello edited"'), 'utf8')

      expect(isDirty(readFileSync(vuePath, 'utf8'), 'vue')).toBe(true)

      const { nucPath: outNuc } = await runImport({
        cwd: tmp,
        path: 'portable/hello.vue',
        from: 'vue',
      })
      expect(outNuc).toBe(nucPath)
      expect(readFileSync(nucPath, 'utf8')).toContain('hello edited')
      expect(isDirty(readFileSync(vuePath, 'utf8'), 'vue')).toBe(false)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  }, 60_000)
})

describe('checkWorkspace', () => {
  it('reports clean portable fixtures as ok', () => {
    const { dirty } = checkWorkspace(monorepo)
    const portableDirty = dirty.filter((p) => p.startsWith('portable/'))
    expect(portableDirty).toEqual([])
  })
})

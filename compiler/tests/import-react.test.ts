import { mkdirSync, readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { parseIrDocument } from '../src/ir/schema'
import { parseReactToIr } from '../src/parse/react'
import { checkWorkspace } from '../src/sync/check'
import { isDirty } from '../src/sync/fingerprint'
import { inferImportFrom, runImport } from '../src/sync/import'
import {
  contentHash,
  normalizeBody,
  reactHeader,
  stripEmitHeaders,
  vueHeader,
} from '../src/sync/fingerprint'
import { biomeFormat } from '../src/sync/biome-format'
import { emitReact } from '../src/emit/react'
import { emitVue } from '../src/emit/vue'

const monorepo = join(dirname(fileURLToPath(import.meta.url)), '../..')
const fixtures = join(monorepo, 'portable/fixtures')

describe('parseReactToIr roundtrip', () => {
  for (const name of ['hello', 'button', 'counter', 'list'] as const) {
    it(`parses golden emit/react/${name}.tsx`, () => {
      const tsx = readFileSync(join(fixtures, `emit/react/${name}.tsx`), 'utf8')
      const expected = parseIrDocument(
        JSON.parse(readFileSync(join(fixtures, `ir/${name}.json`), 'utf8')),
      )
      const actual = parseReactToIr(tsx, join(fixtures, `emit/react/${name}.tsx`), {
        name: expected.name,
      })
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
})

describe('import react', () => {
  it('imports edited tsx back to nuc.tsx and refreshes siblings', async () => {
    const tmp = mkdtempSync(join(tmpdir(), 'nuc-import-react-'))
    try {
      const dir = join(tmp, 'portable')
      mkdirSync(dir, { recursive: true })
      const nucPath = join(dir, 'hello.nuc.tsx')
      const tsxPath = join(dir, 'hello.tsx')
      const vuePath = join(dir, 'hello.vue')
      writeFileSync(nucPath, readFileSync(join(fixtures, 'source/hello.nuc.tsx'), 'utf8'))
      writeFileSync(
        tsxPath,
        readFileSync(join(fixtures, 'emit/react/hello.tsx'), 'utf8').replace(
          'className="hello"',
          'className="hello edited"',
        ),
      )
      writeFileSync(vuePath, readFileSync(join(fixtures, 'emit/vue/hello.vue'), 'utf8'))

      expect(isDirty(readFileSync(tsxPath, 'utf8'), 'react')).toBe(true)

      const result = await runImport({
        cwd: tmp,
        path: 'portable/hello.tsx',
        from: 'react',
      })
      expect(result.from).toBe('react')
      expect(readFileSync(nucPath, 'utf8')).toContain('hello edited')
      expect(isDirty(readFileSync(tsxPath, 'utf8'), 'react')).toBe(false)
      expect(readFileSync(vuePath, 'utf8')).toContain('hello edited')
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  }, 60_000)

  it('infers --from when only one emit is dirty', async () => {
    const tmp = mkdtempSync(join(tmpdir(), 'nuc-infer-'))
    try {
      const dir = join(tmp, 'portable')
      mkdirSync(dir, { recursive: true })
      const nucPath = join(dir, 'hello.nuc.tsx')
      writeFileSync(nucPath, readFileSync(join(fixtures, 'source/hello.nuc.tsx'), 'utf8'))
      writeFileSync(join(dir, 'hello.vue'), readFileSync(join(fixtures, 'emit/vue/hello.vue'), 'utf8'))
      writeFileSync(
        join(dir, 'hello.tsx'),
        readFileSync(join(fixtures, 'emit/react/hello.tsx'), 'utf8').replace(
          'className="hello"',
          'className="hello react"',
        ),
      )
      expect(inferImportFrom(tmp, 'portable/hello.tsx')).toBe('react')
      const result = await runImport({ cwd: tmp, path: 'portable/hello.tsx' })
      expect(result.from).toBe('react')
      expect(readFileSync(nucPath, 'utf8')).toContain('hello react')
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  }, 60_000)

  it('requires --from when both vue and tsx are dirty', () => {
    const tmp = mkdtempSync(join(tmpdir(), 'nuc-conflict-'))
    try {
      const dir = join(tmp, 'portable')
      mkdirSync(dir, { recursive: true })
      writeFileSync(join(dir, 'hello.nuc.tsx'), '//')
      writeFileSync(
        join(dir, 'hello.vue'),
        readFileSync(join(fixtures, 'emit/vue/hello.vue'), 'utf8').replace(
          'class="hello"',
          'class="a"',
        ),
      )
      writeFileSync(
        join(dir, 'hello.tsx'),
        readFileSync(join(fixtures, 'emit/react/hello.tsx'), 'utf8').replace(
          'className="hello"',
          'className="b"',
        ),
      )
      expect(() => inferImportFrom(tmp, 'portable/hello.vue')).toThrow(/both .* dirty/)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })
})

describe('check css dirty', () => {
  it('detects dirty sibling css', () => {
    const css = readFileSync(join(fixtures, 'emit/css/button.css'), 'utf8')
    expect(isDirty(css, 'css')).toBe(false)
    expect(isDirty(css.replace('pointer', 'wait'), 'css')).toBe(true)
  })
})

describe('fresh emit biome idempotent', () => {
  it('vue and react emit are stable under biome --write', async () => {
    const ir = parseIrDocument(JSON.parse(readFileSync(join(fixtures, 'ir/hello.json'), 'utf8')))
    for (const [kind, emit, header] of [
      ['vue', emitVue(ir), vueHeader] as const,
      ['react', emitReact(ir), reactHeader] as const,
    ]) {
      let body = normalizeBody(await biomeFormat(emit, `hello.${kind === 'vue' ? 'vue' : 'tsx'}`, monorepo))
      let assembled = `${header('x', contentHash(body))}${body}\n`
      assembled = (await biomeFormat(assembled, `hello.${kind === 'vue' ? 'vue' : 'tsx'}`, monorepo)).replace(
        /\r\n/g,
        '\n',
      )
      const again = (
        await biomeFormat(assembled, `hello.${kind === 'vue' ? 'vue' : 'tsx'}`, monorepo)
      ).replace(/\r\n/g, '\n')
      expect(again).toBe(assembled)
      expect(isDirty(assembled, kind)).toBe(false)
      expect(normalizeBody(stripEmitHeaders(assembled, kind))).toBe(body)
    }
  }, 60_000)
})

describe('checkWorkspace', () => {
  it('reports no portable dirty in monorepo fixtures path', () => {
    const { dirty } = checkWorkspace(monorepo)
    expect(dirty.filter((p) => p.includes('portable/fixtures'))).toEqual([])
  })
})

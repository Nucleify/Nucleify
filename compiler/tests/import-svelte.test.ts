import { mkdirSync, readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { parseIrDocument } from '../src/ir/schema'
import { parseSvelteToIr } from '../src/parse/svelte'
import { isDirty } from '../src/sync/fingerprint'
import { inferImportFrom, runImport } from '../src/sync/import'
import {
  contentHash,
  normalizeBody,
  svelteHeader,
  stripEmitHeaders,
} from '../src/sync/fingerprint'
import { biomeFormat } from '../src/sync/biome-format'
import { emitSvelte } from '../src/emit/svelte'

const monorepo = join(dirname(fileURLToPath(import.meta.url)), '../..')
const fixtures = join(monorepo, 'compiler/tests/fixtures')

describe('parseSvelteToIr roundtrip', () => {
  for (const name of ['hello', 'button', 'counter', 'list'] as const) {
    it(`parses golden emit/svelte/${name}.svelte`, () => {
      const svelte = readFileSync(join(fixtures, `emit/svelte/${name}.svelte`), 'utf8')
      const expected = parseIrDocument(
        JSON.parse(readFileSync(join(fixtures, `ir/${name}.json`), 'utf8')),
      )
      const actual = parseSvelteToIr(svelte, join(fixtures, `emit/svelte/${name}.svelte`), {
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

describe('import svelte', () => {
  it('imports edited .svelte back to nuc.tsx and refreshes siblings', async () => {
    const tmp = mkdtempSync(join(tmpdir(), 'nuc-import-svelte-'))
    try {
      const dir = join(tmp, 'portable')
      mkdirSync(dir, { recursive: true })
      const nucPath = join(dir, 'hello.nuc.tsx')
      const sveltePath = join(dir, 'hello.svelte')
      const vuePath = join(dir, 'hello.vue')
      writeFileSync(nucPath, readFileSync(join(fixtures, 'source/hello.nuc.tsx'), 'utf8'))
      writeFileSync(
        sveltePath,
        readFileSync(join(fixtures, 'emit/svelte/hello.svelte'), 'utf8').replace(
          'class="hello"',
          'class="hello edited"',
        ),
      )
      writeFileSync(vuePath, readFileSync(join(fixtures, 'emit/vue/hello.vue'), 'utf8'))

      expect(isDirty(readFileSync(sveltePath, 'utf8'), 'svelte')).toBe(true)

      const result = await runImport({
        cwd: tmp,
        path: 'portable/hello.svelte',
        from: 'svelte',
      })
      expect(result.from).toBe('svelte')
      expect(readFileSync(nucPath, 'utf8')).toContain('hello edited')
      expect(isDirty(readFileSync(sveltePath, 'utf8'), 'svelte')).toBe(false)
      expect(readFileSync(vuePath, 'utf8')).toContain('hello edited')
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  }, 60_000)

  it('infers --from=svelte when only svelte emit is dirty', async () => {
    const tmp = mkdtempSync(join(tmpdir(), 'nuc-infer-svelte-'))
    try {
      const dir = join(tmp, 'portable')
      mkdirSync(dir, { recursive: true })
      const nucPath = join(dir, 'hello.nuc.tsx')
      writeFileSync(nucPath, readFileSync(join(fixtures, 'source/hello.nuc.tsx'), 'utf8'))
      writeFileSync(join(dir, 'hello.vue'), readFileSync(join(fixtures, 'emit/vue/hello.vue'), 'utf8'))
      writeFileSync(
        join(dir, 'hello.svelte'),
        readFileSync(join(fixtures, 'emit/svelte/hello.svelte'), 'utf8').replace(
          'class="hello"',
          'class="hello svelte"',
        ),
      )
      expect(inferImportFrom(tmp, 'portable/hello.svelte')).toBe('svelte')
      const result = await runImport({ cwd: tmp, path: 'portable/hello.svelte' })
      expect(result.from).toBe('svelte')
      expect(readFileSync(nucPath, 'utf8')).toContain('hello svelte')
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  }, 60_000)

  it('requires --from when vue and svelte are both dirty', () => {
    const tmp = mkdtempSync(join(tmpdir(), 'nuc-conflict-svelte-'))
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
        join(dir, 'hello.svelte'),
        readFileSync(join(fixtures, 'emit/svelte/hello.svelte'), 'utf8').replace(
          'class="hello"',
          'class="b"',
        ),
      )
      expect(() => inferImportFrom(tmp, 'portable/hello.svelte')).toThrow(/multiple emits dirty/)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })
})

describe('fresh svelte emit biome idempotent', () => {
  it('svelte emit is stable under biome --write', async () => {
    const ir = parseIrDocument(JSON.parse(readFileSync(join(fixtures, 'ir/hello.json'), 'utf8')))
    let body = normalizeBody(await biomeFormat(emitSvelte(ir), 'hello.svelte', monorepo))
    let assembled = `${svelteHeader('x', contentHash(body))}${body}\n`
    assembled = (await biomeFormat(assembled, 'hello.svelte', monorepo)).replace(/\r\n/g, '\n')
    const again = (await biomeFormat(assembled, 'hello.svelte', monorepo)).replace(/\r\n/g, '\n')
    expect(again).toBe(assembled)
    expect(isDirty(assembled, 'svelte')).toBe(false)
    expect(normalizeBody(stripEmitHeaders(assembled, 'svelte'))).toBe(body)
  }, 60_000)
})

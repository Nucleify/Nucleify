import { mkdirSync, readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { parseIrDocument } from '../src/ir/schema'
import { parseSolidToIr } from '../src/parse/solid'
import { isDirty } from '../src/sync/fingerprint'
import { inferImportFrom, runImport } from '../src/sync/import'
import { isSolidEmitSource } from '../src/sync/paths'

const monorepo = join(dirname(fileURLToPath(import.meta.url)), '../..')
const fixtures = join(monorepo, 'compiler/tests/fixtures')

describe('parseSolidToIr roundtrip', () => {
  for (const name of ['hello', 'button', 'counter', 'list'] as const) {
    it(`parses golden emit/solid/${name}.tsx`, () => {
      const solid = readFileSync(join(fixtures, `emit/solid/${name}.tsx`), 'utf8')
      const expected = parseIrDocument(
        JSON.parse(readFileSync(join(fixtures, `ir/${name}.json`), 'utf8')),
      )
      const actual = parseSolidToIr(solid, join(fixtures, `emit/solid/${name}.tsx`), {
        name: expected.name,
      })
      expect(actual.name).toBe(expected.name)
      expect(actual.props).toEqual(expected.props)
      expect(actual.state).toEqual(expected.state)
      expect(actual.derived).toEqual(expected.derived)
      expect(actual.handlers).toEqual(expected.handlers)
      expect(actual.template).toEqual(expected.template)
      if (expected.styles?.css) {
        // CSS lives under emit/css for button — parser looks for sibling next to emit.
        expect(actual.styles?.css ?? null).toBeTruthy()
      }
    })
  }
})

describe('import solid', () => {
  it('detects solid emit vs react', () => {
    expect(isSolidEmitSource(readFileSync(join(fixtures, 'emit/solid/hello.tsx'), 'utf8'))).toBe(
      true,
    )
    expect(isSolidEmitSource(readFileSync(join(fixtures, 'emit/react/hello.tsx'), 'utf8'))).toBe(
      false,
    )
  })

  it('imports edited solid emit back to nuc.tsx and refreshes svelte sibling', async () => {
    const tmp = mkdtempSync(join(tmpdir(), 'nuc-import-solid-'))
    try {
      const dir = join(tmp, 'portable')
      mkdirSync(dir, { recursive: true })
      const nucPath = join(dir, 'hello.nuc.tsx')
      // Solid demo emit is also `.tsx`; distinguish via headers (not a product sibling name).
      const solidPath = join(dir, 'hello.tsx')
      const sveltePath = join(dir, 'hello.svelte')
      writeFileSync(nucPath, readFileSync(join(fixtures, 'source/hello.nuc.tsx'), 'utf8'))
      writeFileSync(
        solidPath,
        readFileSync(join(fixtures, 'emit/solid/hello.tsx'), 'utf8').replace(
          'class="hello"',
          'class="hello solid"',
        ),
      )
      writeFileSync(sveltePath, readFileSync(join(fixtures, 'emit/svelte/hello.svelte'), 'utf8'))

      expect(isDirty(readFileSync(solidPath, 'utf8'), 'solid')).toBe(true)
      expect(inferImportFrom(tmp, 'portable/hello.tsx')).toBe('solid')

      const result = await runImport({
        cwd: tmp,
        path: 'portable/hello.tsx',
        from: 'solid',
      })
      expect(result.from).toBe('solid')
      expect(readFileSync(nucPath, 'utf8')).toContain('hello solid')
      expect(readFileSync(sveltePath, 'utf8')).toContain('hello solid')
      // writeOutputs refreshes React sibling over the solid-marked path.
      expect(readFileSync(solidPath, 'utf8')).toContain('hello solid')
      expect(isSolidEmitSource(readFileSync(solidPath, 'utf8'))).toBe(false)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  }, 60_000)

  it('infers --from=solid for solid-marked .tsx', async () => {
    const tmp = mkdtempSync(join(tmpdir(), 'nuc-infer-solid-'))
    try {
      const dir = join(tmp, 'portable')
      mkdirSync(dir, { recursive: true })
      writeFileSync(join(dir, 'hello.nuc.tsx'), readFileSync(join(fixtures, 'source/hello.nuc.tsx'), 'utf8'))
      writeFileSync(
        join(dir, 'hello.tsx'),
        readFileSync(join(fixtures, 'emit/solid/hello.tsx'), 'utf8').replace(
          'class="hello"',
          'class="hello inferred"',
        ),
      )
      expect(inferImportFrom(tmp, 'portable/hello.tsx')).toBe('solid')
      const result = await runImport({ cwd: tmp, path: 'portable/hello.tsx' })
      expect(result.from).toBe('solid')
      expect(readFileSync(join(dir, 'hello.nuc.tsx'), 'utf8')).toContain('hello inferred')
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  }, 60_000)
})

import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import type { IrDocument } from '../src/ir/types'
import { ParseError, parseTsxToIr } from '../src/parse/tsx'

const fixtures = join(dirname(fileURLToPath(import.meta.url)), '../../portable/fixtures')
const sourceDir = join(fixtures, 'source')
const irDir = join(fixtures, 'ir')

function stripMeta(doc: IrDocument): IrDocument {
  const { meta: _meta, ...rest } = doc
  return rest
}

describe('parseTsxToIr golden', () => {
  for (const name of ['hello', 'button', 'list', 'nui_cta', 'counter'] as const) {
    it(`${name}.nuc.tsx → portable/fixtures/ir/${name}.json`, () => {
      const source = readFileSync(join(sourceDir, `${name}.nuc.tsx`), 'utf8')
      const expected = JSON.parse(readFileSync(join(irDir, `${name}.json`), 'utf8')) as IrDocument
      const actual = parseTsxToIr(source, `fixtures/source/${name}.nuc.tsx`)
      expect(stripMeta(actual)).toEqual(stripMeta(expected))
      expect(actual.meta?.sourcePath).toBe(`fixtures/source/${name}.nuc.tsx`)
    })
  }

  it('rejects async setup and effects outside subset', () => {
    expect(() =>
      parseTsxToIr(
        `import { component, state } from '#nuc-compiler/runtime'
export default component({
  name: 'X',
  setup() {
    watch(() => 1)
    return () => <div />
  },
})
`,
        'bad.nuc.tsx',
      ),
    ).toThrow(ParseError)
  })
})

import { mkdtempSync, readFileSync, rmSync, writeFileSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { parseIrDocument } from '../src/ir/schema'
import { EMIT_APP_DIRS, writeOutputs, type EmitApp } from '../src/sync/write-outputs'

const compilerRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const monorepo = join(compilerRoot, '..')
const fixtures = join(monorepo, 'compiler/tests/fixtures')

function prepareEmitApps(tmp: string, apps: EmitApp[] = ['solid']): void {
  for (const app of apps) {
    mkdirSync(join(tmp, app, 'demo'), { recursive: true })
    mkdirSync(join(tmp, EMIT_APP_DIRS[app]), { recursive: true })
  }
  mkdirSync(join(tmp, 'portable'), { recursive: true })
}

function normalizeSolidHint(source: string, name: string): string {
  return source.replace(
    /\/\/ editable; rebuild: pnpm compiler -- build --app=solid --force \(.+\)\n/,
    `// editable; rebuild: pnpm compiler -- build --app=solid --force (fixtures/source/${name}.tsx)\n`,
  )
}

describe('emitSolid golden', () => {
  for (const name of ['hello', 'button', 'list', 'nui_cta', 'counter'] as const) {
    it(`matches compiler/tests/fixtures/emit/solid/${name}.tsx`, async () => {
      const ir = parseIrDocument(
        JSON.parse(readFileSync(join(fixtures, `ir/${name}.json`), 'utf8')),
      )
      const tmp = mkdtempSync(join(tmpdir(), 'nuc-solid-'))
      try {
        prepareEmitApps(tmp, ['solid'])
        const sourcePath = join(tmp, 'portable', `${name}.nuc.tsx`)
        writeFileSync(sourcePath, '//')
        await writeOutputs({ cwd: tmp, sourcePath, ir, target: 'solid' })
        const actual = normalizeSolidHint(
          readFileSync(join(tmp, EMIT_APP_DIRS.solid, `${name}.tsx`), 'utf8'),
          name,
        )
        const expected = readFileSync(join(fixtures, `emit/solid/${name}.tsx`), 'utf8')
        expect(actual).toBe(expected)
      } finally {
        rmSync(tmp, { recursive: true, force: true })
      }
    }, 30_000)
  }
})

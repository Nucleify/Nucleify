import { mkdtempSync, readFileSync, rmSync, writeFileSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { parseIrDocument } from '../src/ir/schema'
import { EMIT_APP_DIRS, writeOutputs, type EmitApp } from '../src/sync/write-outputs'

const compilerRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const monorepo = join(compilerRoot, '..')
const fixtures = join(monorepo, 'portable/fixtures')

function prepareEmitApps(tmp: string, apps: EmitApp[] = ['vue', 'react', 'nuxt', 'next']): void {
  for (const app of apps) {
    mkdirSync(join(tmp, app), { recursive: true })
    mkdirSync(join(tmp, EMIT_APP_DIRS[app]), { recursive: true })
  }
  mkdirSync(join(tmp, 'portable'), { recursive: true })
}

function normalizeReactHint(source: string, name: string): string {
  return source.replace(
    /\/\/ editable; after edits: pnpm compiler -- import --from=react .+\n/,
    `// editable; after edits: pnpm compiler -- import --from=react fixtures/source/${name}.tsx\n`,
  )
}

describe('emitReact golden', () => {
  for (const name of ['hello', 'button', 'list', 'nui_cta'] as const) {
    it(`matches portable/fixtures/emit/react/${name}.tsx`, async () => {
      const ir = parseIrDocument(
        JSON.parse(readFileSync(join(fixtures, `ir/${name}.json`), 'utf8')),
      )
      const tmp = mkdtempSync(join(tmpdir(), 'nuc-react-'))
      try {
        prepareEmitApps(tmp, ['react', 'next'])
        const sourcePath = join(tmp, 'portable', `${name}.nuc.tsx`)
        writeFileSync(sourcePath, '//')
        await writeOutputs({ cwd: tmp, sourcePath, ir, target: 'react' })
        const actual = normalizeReactHint(
          readFileSync(join(tmp, EMIT_APP_DIRS.react, `${name}.tsx`), 'utf8'),
          name,
        )
        const expected = readFileSync(join(fixtures, `emit/react/${name}.tsx`), 'utf8')
        expect(actual).toBe(expected)
      } finally {
        rmSync(tmp, { recursive: true, force: true })
      }
    }, 30_000)
  }

  it('writes only into existing apps (vue+nuxt+react+next + css)', async () => {
    const ir = parseIrDocument(
      JSON.parse(readFileSync(join(fixtures, 'ir/button.json'), 'utf8')),
    )
    const tmp = mkdtempSync(join(tmpdir(), 'nuc-all-'))
    try {
      prepareEmitApps(tmp)
      const sourcePath = join(tmp, 'portable', 'button.nuc.tsx')
      writeFileSync(sourcePath, '//')
      const { written } = await writeOutputs({
        cwd: tmp,
        sourcePath,
        ir,
        target: 'all',
      })
      const rel = written.map((p) => p.replace(/\\/g, '/'))
      expect(rel.some((p) => p.endsWith(`${EMIT_APP_DIRS.vue}/button.vue`))).toBe(true)
      expect(rel.some((p) => p.endsWith(`${EMIT_APP_DIRS.nuxt}/button.vue`))).toBe(true)
      expect(rel.some((p) => p.endsWith(`${EMIT_APP_DIRS.react}/button.tsx`))).toBe(true)
      expect(rel.some((p) => p.endsWith(`${EMIT_APP_DIRS.next}/button.tsx`))).toBe(true)
      expect(rel.some((p) => p.endsWith(`${EMIT_APP_DIRS.vue}/button.css`))).toBe(true)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  }, 60_000)
})

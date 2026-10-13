import { mkdtempSync, readFileSync, rmSync, writeFileSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { emitSvelte } from '../src/emit/svelte'
import { parseIrDocument } from '../src/ir/schema'
import { EMIT_APP_DIRS, writeOutputs, type EmitApp } from '../src/sync/write-outputs'

const compilerRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const monorepo = join(compilerRoot, '..')
const fixtures = join(monorepo, 'compiler/tests/fixtures')

function prepareEmitApps(tmp: string, apps: EmitApp[] = ['svelte']): void {
  for (const app of apps) {
    mkdirSync(join(tmp, app, 'demo'), { recursive: true })
    mkdirSync(join(tmp, EMIT_APP_DIRS[app]), { recursive: true })
  }
  mkdirSync(join(tmp, 'portable'), { recursive: true })
}

function normalizeSvelteHint(source: string, name: string): string {
  return source
    .replace(
      /<!-- editable; after edits: pnpm compiler -- import --from=svelte .+ -->\n/,
      `<!-- editable; after edits: pnpm compiler -- import --from=svelte fixtures/emit/svelte/${name}.svelte -->\n`,
    )
    .replace(
      /<!-- editable; rebuild: pnpm compiler -- build --app=svelte --force \(.+\) -->\n/,
      `<!-- editable; after edits: pnpm compiler -- import --from=svelte fixtures/emit/svelte/${name}.svelte -->\n`,
    )
}

describe('emitSvelte golden', () => {
  for (const name of ['hello', 'button', 'list', 'nui_cta', 'counter'] as const) {
    it(`matches compiler/tests/fixtures/emit/svelte/${name}.svelte`, async () => {
      const ir = parseIrDocument(
        JSON.parse(readFileSync(join(fixtures, `ir/${name}.json`), 'utf8')),
      )
      const tmp = mkdtempSync(join(tmpdir(), 'nuc-svelte-'))
      try {
        prepareEmitApps(tmp, ['svelte'])
        const sourcePath = join(tmp, 'portable', `${name}.nuc.tsx`)
        writeFileSync(sourcePath, '//')
        await writeOutputs({ cwd: tmp, sourcePath, ir, target: 'svelte' })
        const actual = normalizeSvelteHint(
          readFileSync(join(tmp, EMIT_APP_DIRS.svelte, `${name}.svelte`), 'utf8'),
          name,
        )
        const expected = readFileSync(join(fixtures, `emit/svelte/${name}.svelte`), 'utf8')
        expect(actual).toBe(expected)
      } finally {
        rmSync(tmp, { recursive: true, force: true })
      }
    }, 30_000)
  }

  it('emits default slot as {@render children?.()}', () => {
    const doc = {
      irVersion: '0.1.0' as const,
      portable: true as const,
      name: 'Wrap',
      props: [],
      state: [],
      derived: [],
      handlers: [],
      template: {
        kind: 'element' as const,
        tag: 'div',
        props: [],
        children: [{ kind: 'slot' as const }],
      },
    }
    const out = emitSvelte(doc)
    expect(out).toContain('children?: import("svelte").Snippet')
    expect(out).toContain('{ children }')
    expect(out).toContain('{@render children?.()}')
  })
})

import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { parseIrDocument } from '../src/ir/schema'
import { convertProduct } from '../src/sync/convert'
import { scaffoldDemo, scaffoldProduct } from '../src/sync/scaffold'
import { writeOutputs } from '../src/sync/write-outputs'

const monorepo = join(dirname(fileURLToPath(import.meta.url)), '../..')
const fixtures = join(monorepo, 'compiler/tests/fixtures')

describe('tryb B product shells', () => {
  it('scaffolds demo under {framework}/demo', () => {
    const tmp = mkdtempSync(join(tmpdir(), 'nuc-demo-'))
    try {
      const dest = scaffoldDemo('next', tmp)
      expect(dest.replace(/\\/g, '/')).toMatch(/next\/demo$/)
      expect(existsSync(join(dest, 'package.json'))).toBe(true)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })

  it('scaffolds next/web product and receives emit', async () => {
    const ir = parseIrDocument(
      JSON.parse(readFileSync(join(fixtures, 'ir/hello.json'), 'utf8')),
    )
    const tmp = mkdtempSync(join(tmpdir(), 'nuc-b-'))
    try {
      const dest = scaffoldProduct({ product: 'web', framework: 'next', cwd: tmp })
      expect(dest.replace(/\\/g, '/')).toMatch(/next\/web$/)
      mkdirSync(join(tmp, 'portable'), { recursive: true })
      const sourcePath = join(tmp, 'portable', 'hello.nuc.tsx')
      writeFileSync(sourcePath, '//')
      const { written } = await writeOutputs({
        cwd: tmp,
        sourcePath,
        ir,
        target: 'react',
        apps: ['next'],
        force: true,
      })
      const rel = written.map((p) => p.replace(/\\/g, '/'))
      expect(rel.some((p) => p.endsWith('next/web/src/components/hello.tsx'))).toBe(true)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  }, 60_000)

  it('convert web→next copies home sections and public assets', () => {
    const tmp = mkdtempSync(join(tmpdir(), 'nuc-convert-'))
    try {
      const web = join(tmp, 'web')
      mkdirSync(join(web, 'src/pages/home/sections/hero'), { recursive: true })
      mkdirSync(join(web, 'src/assets'), { recursive: true })
      mkdirSync(join(web, 'public/img'), { recursive: true })
      writeFileSync(join(web, 'src/pages/home/index.vue'), '<template><div /></template>\n')
      writeFileSync(
        join(web, 'src/pages/home/sections/hero/index.vue'),
        '<template><section>hero</section></template>\n',
      )
      writeFileSync(
        join(web, 'src/assets/_index.scss'),
        "@import '../../../shared_modules/nuc_colors/styles/variables';\n",
      )
      writeFileSync(join(web, 'public/img/logo.svg'), '<svg />\n')

      const { dest, copied } = convertProduct({
        product: 'web',
        framework: 'next',
        cwd: tmp,
        force: true,
      })
      expect(dest.replace(/\\/g, '/')).toMatch(/next\/web$/)
      expect(existsSync(join(dest, 'src/pages/home/sections/hero/index.vue'))).toBe(true)
      expect(existsSync(join(dest, 'public/img/logo.svg'))).toBe(true)
      expect(existsSync(join(dest, 'src/lib/vue-home-root.client.tsx'))).toBe(true)
      expect(readFileSync(join(dest, 'src/assets/_index.scss'), 'utf8')).toContain(
        '../../../../shared_modules/',
      )
      expect(copied.some((c) => c.startsWith('src/pages'))).toBe(true)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })
})

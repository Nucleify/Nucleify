import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { discoverNucSources } from '../src/sync/discover'

const monorepo = join(dirname(fileURLToPath(import.meta.url)), '../..')

describe('discoverNucSources', () => {
  it('skips product vue sections and has no portable demos by default', () => {
    const found = discoverNucSources(monorepo)
    expect(found.some((p) => p.endsWith('portable/hello.nuc.tsx'))).toBe(false)
    expect(
      found.some((p) =>
        p.replace(/\\/g, '/').includes('web/src/pages/home/sections/compiler_demo/'),
      ),
    ).toBe(false)
  })

  it('discovers *.nuc.tsx under portable when present', () => {
    const tmp = mkdtempSync(join(tmpdir(), 'nuc-discover-'))
    try {
      const portable = join(tmp, 'portable')
      mkdirSync(portable, { recursive: true })
      writeFileSync(join(portable, 'sample.nuc.tsx'), 'export default function Sample() { return null }\n')
      const found = discoverNucSources(tmp)
      expect(found.some((p) => p.endsWith('portable/sample.nuc.tsx'))).toBe(true)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })
})

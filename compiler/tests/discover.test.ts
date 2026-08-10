import { describe, expect, it } from 'vitest'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { discoverNucSources } from '../src/sync/discover'

const monorepo = join(dirname(fileURLToPath(import.meta.url)), '../..')

describe('discoverNucSources', () => {
  it('finds portable authoring', () => {
    const found = discoverNucSources(monorepo)
    expect(found.some((p) => p.endsWith('portable/hello.nuc.tsx'))).toBe(true)
  })
})

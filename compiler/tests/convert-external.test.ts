import { mkdirSync, rmSync, writeFileSync, existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { convertProduct } from '../src/sync/convert'

const monorepo = join(dirname(fileURLToPath(import.meta.url)), '../..')

describe('convert external --path', () => {
  it('converts an external Nuxt-like src tree using web→next profile', () => {
    const ext = join(monorepo, `.nucleify-fixture-ext-${process.pid}`)
    const outName = `ext-web-next-${process.pid}`
    try {
      mkdirSync(join(ext, 'src/pages'), { recursive: true })
      writeFileSync(
        join(ext, 'src/pages/hello.vue'),
        `<script setup lang="ts">\nconst title = 'hi'\n</script>\n<template><h1>{{ title }}</h1></template>\n`,
      )
      const { dest, copied } = convertProduct({
        product: 'web',
        framework: 'next',
        cwd: monorepo,
        force: true,
        sourceRoot: ext,
        outName,
      })
      expect(dest.endsWith(outName)).toBe(true)
      expect(existsSync(join(dest, 'package.json'))).toBe(true)
      expect(copied.some((c) => c.includes('vue→tsx'))).toBe(true)
      const migration = readFileSync(join(dest, 'MIGRATION.md'), 'utf8')
      expect(migration).toContain('--path=')
      expect(migration).toContain(`--out=${outName}`)
    } finally {
      rmSync(ext, { recursive: true, force: true })
      rmSync(join(monorepo, outName), { recursive: true, force: true })
    }
  }, 120_000)
})

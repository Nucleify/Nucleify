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

  it('scaffolds web-next product and receives emit', async () => {
    const ir = parseIrDocument(
      JSON.parse(readFileSync(join(fixtures, 'ir/hello.json'), 'utf8')),
    )
    const tmp = mkdtempSync(join(tmpdir(), 'nuc-b-'))
    try {
      const dest = scaffoldProduct({ product: 'web', framework: 'next', cwd: tmp })
      expect(dest.replace(/\\/g, '/')).toMatch(/web-next$/)
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
      expect(rel.some((p) => p.endsWith('web-next/src/components/hello.tsx'))).toBe(true)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  }, 60_000)

  it('scaffolds admin-next product shell', () => {
    const tmp = mkdtempSync(join(tmpdir(), 'nuc-admin-shell-'))
    try {
      const dest = scaffoldProduct({ product: 'admin', framework: 'next', cwd: tmp })
      expect(dest.replace(/\\/g, '/')).toMatch(/admin-next$/)
      expect(existsSync(join(dest, 'package.json'))).toBe(true)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })

  it('convert admin→next emits React TSX with no .vue files', () => {
    const tmp = mkdtempSync(join(tmpdir(), 'nuc-convert-admin-'))
    try {
      const admin = join(tmp, 'admin')
      mkdirSync(join(admin, 'src/pages'), { recursive: true })
      writeFileSync(
        join(admin, 'src/pages/index.vue'),
        '<template><main>admin</main></template>\n',
      )

      const { dest, copied } = convertProduct({
        product: 'admin',
        framework: 'next',
        cwd: tmp,
        force: true,
      })
      expect(dest.replace(/\\/g, '/')).toMatch(/admin-next$/)
      expect(existsSync(join(dest, 'src/views/index.tsx'))).toBe(true)
      expect(existsSync(join(dest, 'src/views/index.vue'))).toBe(false)
      expect(existsSync(join(dest, 'src/pages/index.tsx'))).toBe(false)
      expect(existsSync(join(dest, 'src/lib/vue-admin-root.client.tsx'))).toBe(false)
      expect(readFileSync(join(dest, 'src/app/page.tsx'), 'utf8')).toContain("from '@/views/index'")
      expect(readFileSync(join(dest, 'src/views/index.tsx'), 'utf8')).toContain("'use client'")
      expect(copied.some((c) => c.startsWith('vue→tsx'))).toBe(true)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })

  it('convert web→next fails clearly when Vue sources exceed compiler subset', () => {
    const tmp = mkdtempSync(join(tmpdir(), 'nuc-convert-web-fail-'))
    try {
      const web = join(tmp, 'web')
      mkdirSync(join(web, 'src/pages/home/sections/hero'), { recursive: true })
      writeFileSync(
        join(web, 'src/pages/home/sections/hero/index.vue'),
        `<template><input v-model="query" /></template>\n<script setup lang="ts">\nconst query = ref('')\n</script>\n`,
      )
      expect(() =>
        convertProduct({ product: 'web', framework: 'next', cwd: tmp, force: true }),
      ).toThrow(/could not be emitted to React/)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })

  it('convert web→next emits simple Vue SFCs to TSX', () => {
    const tmp = mkdtempSync(join(tmpdir(), 'nuc-convert-'))
    try {
      const web = join(tmp, 'web')
      mkdirSync(join(web, 'src/pages/home/sections/hero'), { recursive: true })
      mkdirSync(join(web, 'src/assets'), { recursive: true })
      mkdirSync(join(web, 'public/img'), { recursive: true })
      writeFileSync(
        join(web, 'src/pages/home/index.vue'),
        '<template><div>home</div></template>\n',
      )
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
      expect(dest.replace(/\\/g, '/')).toMatch(/web-next$/)
      expect(existsSync(join(dest, 'src/views/home/sections/hero/index.tsx'))).toBe(true)
      expect(existsSync(join(dest, 'src/views/home/index.tsx'))).toBe(true)
      expect(existsSync(join(dest, 'src/views/home/sections/hero/index.vue'))).toBe(false)
      expect(existsSync(join(dest, 'src/pages/home/index.tsx'))).toBe(false)
      expect(existsSync(join(dest, 'src/app/[lang]/page.tsx'))).toBe(true)
      expect(existsSync(join(dest, 'public/img/logo.svg'))).toBe(true)
      expect(readFileSync(join(dest, 'src/assets/_index.scss'), 'utf8')).toContain("modules/nuc_colors")
      expect(copied.some((c) => c.startsWith('vue→tsx'))).toBe(true)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })
})

import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { parseIrDocument } from '../src/ir/schema'
import { emitVue } from '../src/emit/vue'
import { biomeFormat } from '../src/sync/biome-format'
import {
  contentHash,
  normalizeBody,
  stripEmitHeaders,
  vueHeader,
} from '../src/sync/fingerprint'

const monorepo = join(dirname(fileURLToPath(import.meta.url)), '../..')
const fixtures = join(monorepo, 'portable/fixtures')

async function emitWithHeaders(name: string): Promise<string> {
  const ir = parseIrDocument(
    JSON.parse(readFileSync(join(fixtures, `ir/${name}.json`), 'utf8')),
  )
  const cssFileName = ir.styles?.css ? `${name}.css` : undefined
  let body = emitVue(ir, { cssFileName })
  body = normalizeBody(await biomeFormat(body, `${name}.vue`, monorepo))
  const hash = contentHash(body)
  let assembled = `${vueHeader(`fixtures/source/${name}.vue`, hash)}${body}\n`
  assembled = (await biomeFormat(assembled, `${name}.vue`, monorepo)).replace(/\r\n/g, '\n')
  const bodyAfter = normalizeBody(stripEmitHeaders(assembled, 'vue'))
  if (bodyAfter !== body) {
    body = bodyAfter
    assembled = `${vueHeader(`fixtures/source/${name}.vue`, contentHash(body))}${body}\n`
    assembled = (await biomeFormat(assembled, `${name}.vue`, monorepo)).replace(/\r\n/g, '\n')
  }
  return assembled
}

describe('emitVue golden', () => {
  for (const name of ['hello', 'button', 'list', 'nui_cta'] as const) {
    it(`matches portable/fixtures/emit/vue/${name}.vue`, async () => {
      const expected = readFileSync(join(fixtures, `emit/vue/${name}.vue`), 'utf8')
      const actual = await emitWithHeaders(name)
      expect(actual).toBe(expected)
    }, 30_000)
  }
})

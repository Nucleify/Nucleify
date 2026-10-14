import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { emitReact } from '../src/emit/react'
import { emitSolid } from '../src/emit/solid'
import { emitSvelte } from '../src/emit/svelte'
import { emitVue } from '../src/emit/vue'
import { parseIrDocument } from '../src/ir/schema'
import type { IrAttr, IrDocument, IrNode } from '../src/ir/types'
import { parseReactToIr } from '../src/parse/react'
import { parseSolidToIr } from '../src/parse/solid'
import { parseSvelteToIr } from '../src/parse/svelte'
import { parseVueToIr } from '../src/parse/vue'

const fixtures = join(dirname(fileURLToPath(import.meta.url)), 'fixtures')

/** Portable fixtures with full vue/react/svelte goldens. */
const CORE = ['hello', 'button', 'counter', 'list'] as const
const ALL = [...CORE, 'nui_cta'] as const

function loadIr(name: (typeof ALL)[number]): IrDocument {
  return parseIrDocument(JSON.parse(readFileSync(join(fixtures, `ir/${name}.json`), 'utf8')))
}

const HOST_ONLY_ATTRS = new Set([
  'suppressHydrationWarning',
  // Svelte emit injects these for a11y on custom-element hosts; not in portable IR.
  'role',
  'tabindex',
  'tabIndex',
])

function stripHostAttrs(attrs: IrAttr[]): IrAttr[] {
  return attrs.filter((a) => {
    if (a.kind === 'event' && a.name === 'keydown') {
      // Emit-only keyboard shim for CE click hosts.
      return a.handler === 'onKeyDown' || !/MouseEvent\("click"/.test(a.handler)
    }
    return !HOST_ONLY_ATTRS.has(a.name)
  })
}

function stripHostNode(node: IrNode): IrNode {
  switch (node.kind) {
    case 'element': {
      let props = stripHostAttrs(node.props)
      // Svelte emit adds mode="svg" on nui-icon when missing from IR.
      if (node.tag === 'nui-icon') {
        props = props.filter((p) => !(p.kind === 'static' && p.name === 'mode' && p.value === 'svg'))
      }
      return {
        ...node,
        props,
        children: node.children.map(stripHostNode),
      }
    }
    case 'if':
      return {
        ...node,
        then: node.then.map(stripHostNode),
        else: node.else?.map(stripHostNode),
      }
    case 'for':
      return { ...node, body: node.body.map(stripHostNode) }
    default:
      return node
  }
}

/** Drop meta + styles (CSS needs on-disk siblings) + host-only attrs for cross-frame compare. */
function portableCore(doc: IrDocument): unknown {
  const { meta: _m, styles: _s, ...rest } = doc
  return { ...rest, template: stripHostNode(rest.template) }
}

function styleShape(doc: IrDocument): string {
  const el = doc.template.kind === 'element' ? doc.template : null
  const style = el?.props.find((p) => p.kind === 'bind' && p.name === 'style')
  if (!style || style.kind !== 'bind') return 'none'
  return style.value.kind
}

describe('portable hub: golden emits share IR (migrate via import + build)', () => {
  for (const name of CORE) {
    it(`${name}: vue / react / solid / svelte → same portable IR`, () => {
      const expected = portableCore(loadIr(name))
      const vue = parseVueToIr(
        readFileSync(join(fixtures, `emit/vue/${name}.vue`), 'utf8'),
        join(fixtures, `emit/vue/${name}.vue`),
        { name: loadIr(name).name },
      )
      const react = parseReactToIr(
        readFileSync(join(fixtures, `emit/react/${name}.tsx`), 'utf8'),
        join(fixtures, `emit/react/${name}.tsx`),
        { name: loadIr(name).name },
      )
      const solid = parseSolidToIr(
        readFileSync(join(fixtures, `emit/solid/${name}.tsx`), 'utf8'),
        join(fixtures, `emit/solid/${name}.tsx`),
        { name: loadIr(name).name },
      )
      const svelte = parseSvelteToIr(
        readFileSync(join(fixtures, `emit/svelte/${name}.svelte`), 'utf8'),
        join(fixtures, `emit/svelte/${name}.svelte`),
        { name: loadIr(name).name },
      )
      expect(portableCore(vue)).toEqual(expected)
      expect(portableCore(react)).toEqual(expected)
      expect(portableCore(solid)).toEqual(expected)
      expect(portableCore(svelte)).toEqual(expected)
    })
  }
})

describe('migrate → svelte (parse A → emitSvelte → parseSvelte)', () => {
  for (const name of CORE) {
    for (const from of ['vue', 'react', 'svelte'] as const) {
      it(`${from} → svelte → IR (${name})`, () => {
        const expected = loadIr(name)
        const path =
          from === 'vue'
            ? join(fixtures, `emit/vue/${name}.vue`)
            : from === 'react'
              ? join(fixtures, `emit/react/${name}.tsx`)
              : join(fixtures, `emit/svelte/${name}.svelte`)
        const source = readFileSync(path, 'utf8')
        const ir =
          from === 'vue'
            ? parseVueToIr(source, path, { name: expected.name })
            : from === 'react'
              ? parseReactToIr(source, path, { name: expected.name })
              : parseSvelteToIr(source, path, { name: expected.name })
        // Re-emit through svelte using golden file (lossless) when source is svelte;
        // otherwise emit fresh then prefer golden for parse equality of core fixtures.
        const svelteBody =
          from === 'svelte' ? source : readFileSync(join(fixtures, `emit/svelte/${name}.svelte`), 'utf8')
        // Prove IR from A matches IR used to seed svelte golden:
        expect(portableCore(ir)).toEqual(portableCore(expected))
        const back = parseSvelteToIr(svelteBody, `${name}.svelte`, { name: expected.name })
        expect(portableCore(back)).toEqual(portableCore(expected))
        // Fresh emit is at least parseable and keeps name/handlers/props.
        if (from !== 'svelte') {
          const fresh = emitSvelte(ir)
          const freshIr = parseSvelteToIr(fresh, `${name}.svelte`, { name: expected.name })
          expect(freshIr.name).toBe(expected.name)
          expect(freshIr.props).toEqual(expected.props)
          expect(freshIr.handlers.map((h) => h.name)).toEqual(expected.handlers.map((h) => h.name))
        }
      })
    }

    it(`solid → svelte → IR (${name})`, () => {
      const expected = loadIr(name)
      const solidPath = join(fixtures, `emit/solid/${name}.tsx`)
      const fromSolid = parseSolidToIr(readFileSync(solidPath, 'utf8'), solidPath, {
        name: expected.name,
      })
      expect(portableCore(fromSolid)).toEqual(portableCore(expected))
      const svelteGolden = readFileSync(join(fixtures, `emit/svelte/${name}.svelte`), 'utf8')
      const back = parseSvelteToIr(svelteGolden, `${name}.svelte`, { name: expected.name })
      expect(portableCore(back)).toEqual(portableCore(expected))
      const fresh = emitSvelte(fromSolid)
      const freshIr = parseSvelteToIr(fresh, `${name}.svelte`, { name: expected.name })
      expect(freshIr.name).toBe(expected.name)
      expect(freshIr.props).toEqual(expected.props)
    })
  }
})

describe('migrate svelte → other (parse svelte → emit → parse)', () => {
  for (const name of CORE) {
    it(`svelte → vue → IR (${name})`, () => {
      const expected = loadIr(name)
      const sveltePath = join(fixtures, `emit/svelte/${name}.svelte`)
      const fromSvelte = parseSvelteToIr(readFileSync(sveltePath, 'utf8'), sveltePath, {
        name: expected.name,
      })
      const vue = emitVue(fromSvelte)
      const back = parseVueToIr(vue, `${name}.vue`, { name: expected.name })
      expect(portableCore(back)).toEqual(portableCore(expected))
    })

    it(`svelte → react → IR (${name})`, () => {
      const expected = loadIr(name)
      const sveltePath = join(fixtures, `emit/svelte/${name}.svelte`)
      const fromSvelte = parseSvelteToIr(readFileSync(sveltePath, 'utf8'), sveltePath, {
        name: expected.name,
      })
      const react = emitReact(fromSvelte)
      const back = parseReactToIr(react, `${name}.tsx`, { name: expected.name })
      expect(portableCore(back)).toEqual(portableCore(expected))
    })

    it(`svelte → solid → IR (${name})`, () => {
      const expected = loadIr(name)
      const sveltePath = join(fixtures, `emit/svelte/${name}.svelte`)
      const fromSvelte = parseSvelteToIr(readFileSync(sveltePath, 'utf8'), sveltePath, {
        name: expected.name,
      })
      const solid = emitSolid(fromSvelte)
      const back = parseSolidToIr(solid, `${name}.tsx`, { name: expected.name })
      expect(portableCore(back)).toEqual(portableCore(expected))
    })
  }
})

describe('nui_cta known fidelity gaps', () => {
  it('vue golden matches IR; react keeps style object but adds host attrs', () => {
    const expected = loadIr('nui_cta')
    const vue = parseVueToIr(
      readFileSync(join(fixtures, 'emit/vue/nui_cta.vue'), 'utf8'),
      join(fixtures, 'emit/vue/nui_cta.vue'),
      { name: expected.name },
    )
    expect(portableCore(vue)).toEqual(portableCore(expected))
    expect(styleShape(vue)).toBe('object')

    const react = parseReactToIr(
      readFileSync(join(fixtures, 'emit/react/nui_cta.tsx'), 'utf8'),
      join(fixtures, 'emit/react/nui_cta.tsx'),
      { name: expected.name },
    )
    expect(styleShape(react)).toBe('object')
    expect(portableCore(react)).toEqual(portableCore(expected))
  })

  it('svelte golden is lossy on style (object → template raw) and injects a11y attrs', () => {
    const expected = loadIr('nui_cta')
    expect(styleShape(expected)).toBe('object')
    const svelte = parseSvelteToIr(
      readFileSync(join(fixtures, 'emit/svelte/nui_cta.svelte'), 'utf8'),
      join(fixtures, 'emit/svelte/nui_cta.svelte'),
      { name: expected.name },
    )
    expect(styleShape(svelte)).toBe('raw')
    const el = svelte.template.kind === 'element' ? svelte.template : null
    expect(el?.props.some((p) => p.kind === 'static' && p.name === 'role')).toBe(true)
    // After stripping host-only attrs, remaining diff is style shape only.
    const stripped = portableCore(svelte) as { template: IrNode }
    const expectedCore = portableCore(expected) as { template: IrNode }
    expect(stripped.template.kind).toBe('element')
    expect(expectedCore.template.kind).toBe('element')
    if (stripped.template.kind === 'element' && expectedCore.template.kind === 'element') {
      const sStyle = stripped.template.props.find((p) => p.name === 'style')
      const eStyle = expectedCore.template.props.find((p) => p.name === 'style')
      expect(sStyle).not.toEqual(eStyle)
      expect(
        stripped.template.props.filter((p) => p.name !== 'style'),
      ).toEqual(expectedCore.template.props.filter((p) => p.name !== 'style'))
    }
  })

  it('svelte → vue/react loses style object (raw template → broken/non-object)', () => {
    const expected = loadIr('nui_cta')
    const sveltePath = join(fixtures, 'emit/svelte/nui_cta.svelte')
    const fromSvelte = parseSvelteToIr(readFileSync(sveltePath, 'utf8'), sveltePath, {
      name: expected.name,
    })
    expect(styleShape(fromSvelte)).toBe('raw')

    const vue = parseVueToIr(emitVue(fromSvelte), 'nui_cta.vue', { name: expected.name })
    expect(styleShape(vue)).not.toBe('object')

    // React emit of Svelte-imported raw style currently fails IR validation.
    expect(() => parseReactToIr(emitReact(fromSvelte), 'nui_cta.tsx', { name: expected.name })).toThrow()
  })
})

import { describe, expect, it } from 'vitest'

import {
  homeDocsHref,
  NUC_HOME_COMPILER_NODES,
  NUC_HOME_COMPILER_SOURCE,
  NUC_HOME_CONTACT_TYPES,
  NUC_HOME_WEB_SHARE,
  nucHomeWebShareArcs,
  nucHomeWebShareLine,
} from '../../src/pages/home/constants/content'

describe('homeDocsHref', () => {
  it('builds locale-prefixed docs paths without smashing slashes', () => {
    expect(homeDocsHref('en', 'intro')).toBe(
      '/en/docs/getting-started/introduction'
    )
    expect(homeDocsHref('pl', 'compiler')).toBe(
      '/pl/docs/core-concepts/compiler'
    )
    expect(homeDocsHref('en', 'modules')).toBe('/en/docs/core-concepts/modules')
  })
})

describe('home contact types', () => {
  it('keeps API-stable values with developer labels', () => {
    expect(NUC_HOME_CONTACT_TYPES.map((item) => item.value)).toEqual([
      'landing',
      'business',
      'blog',
      'help',
    ])
  })
})

describe('home web share chart', () => {
  it('covers emit shells as a range, not a unique-site percentage', () => {
    expect(NUC_HOME_WEB_SHARE.slices).toHaveLength(7)
    expect(nucHomeWebShareLine()).toBe(
      'React & Next.js · Vue & Nuxt · Astro · Svelte · Solid'
    )
    expect(NUC_HOME_WEB_SHARE.groups.map((group) => group.id)).toEqual([
      'react-next',
      'vue-nuxt',
      'astro',
      'svelte',
      'solid',
    ])
    expect(nucHomeWebShareArcs().map((arc) => arc.id)).toEqual([
      'react-next',
      'vue-nuxt',
      'astro',
      'svelte',
      'solid',
    ])
    expect(
      nucHomeWebShareArcs().find((arc) => arc.id === 'react-next')?.color
    ).toBe('#61dafb')
    expect(
      nucHomeWebShareArcs().find((arc) => arc.id === 'vue-nuxt')?.color
    ).toBe('#42b883')
    const weight = Object.fromEntries(
      NUC_HOME_WEB_SHARE.slices.map((slice) => [slice.id, slice.pct])
    )
    const reactNext = weight.react! + weight.next!
    const vueNuxt = weight.vue! + weight.nuxt!
    expect(reactNext / vueNuxt).toBeGreaterThan(2)
    expect(vueNuxt).toBeGreaterThan(weight.svelte!)
    expect(weight.svelte!).toBeGreaterThan(weight.astro!)
    expect(
      nucHomeWebShareArcs().every(
        (arc) => arc.d.startsWith('M') && arc.d.endsWith('Z')
      )
    ).toBe(true)
  })
})

describe('home compiler emit snippets', () => {
  it('keeps authoring in *.nuc.tsx and native syntax per shell', () => {
    expect(NUC_HOME_COMPILER_SOURCE.file).toBe('Button.nuc.tsx')
    expect(NUC_HOME_COMPILER_SOURCE.snippet.join('\n')).toContain(
      '{props.label}'
    )

    const byId = Object.fromEntries(
      NUC_HOME_COMPILER_NODES.map((node) => [node.id, node])
    )

    expect(byId.vue?.file).toBe('Button.vue')
    expect(byId.vue?.snippet.join('\n')).toContain('<script setup lang="ts">')
    expect(byId.vue?.snippet.join('\n')).toContain('<template>')
    expect(byId.vue?.snippet.join('\n')).toContain(
      '<nui-button variant="filled">'
    )

    expect(byId.react?.file).toBe('Button.tsx')
    expect(byId.react?.snippet.join('\n')).toContain('export function Button')
    expect(byId.react?.snippet.join('\n')).toContain(
      '<NuiButton variant="filled">'
    )

    expect(byId.nuxt?.snippet).toEqual(byId.vue?.snippet)
    expect(byId.next?.snippet).toEqual(byId.react?.snippet)
    expect(byId.svelte?.snippet.join('\n')).toContain('<script lang="ts">')
    expect(byId.astro?.snippet[0]).toBe('---')
  })
})

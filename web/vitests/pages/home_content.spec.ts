import { describe, expect, it } from 'vitest'

import {
  DEFAULT_HOME_SECTIONS,
  homeDocsHref,
  NUC_HOME_COMPILER_NODES,
  NUC_HOME_COMPILER_SOURCE,
  NUC_HOME_CONTACT_TYPES,
  NUC_HOME_PILLARS,
  NUC_HOME_WEB_SHARE,
  nucHomeWebShareArcs,
  nucHomeWebShareLine,
} from '@web'

describe('homeDocsHref', () => {
  it('builds absolute docs.nucleify.io URLs without smashing slashes', () => {
    expect(homeDocsHref('en', 'intro')).toBe(
      'https://docs.nucleify.io/en/docs/getting-started/introduction'
    )
    expect(homeDocsHref('pl', 'compiler')).toBe(
      'https://docs.nucleify.io/pl/docs/core-concepts/compiler'
    )
    expect(homeDocsHref('en', 'modules')).toBe(
      'https://docs.nucleify.io/en/docs/core-concepts/modules'
    )
    expect(homeDocsHref('en', 'cli')).toBe(
      'https://docs.nucleify.io/en/docs/core-concepts/cli'
    )
    expect(homeDocsHref('en', 'playground')).toBe(
      'https://docs.nucleify.io/en/docs/core-concepts/playground'
    )
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

describe('home developer concretes', () => {
  it('orders Emit before Ship', () => {
    expect(DEFAULT_HOME_SECTIONS.map((s) => s.type)).toEqual([
      'section.hero',
      'section.compiler_demo',
      'section.pillars',
      'section.stack',
      'section.clone',
      'section.close',
    ])
  })

  it('uses ship concretes instead of ROI fluff', () => {
    expect(NUC_HOME_PILLARS.map((p) => p.title)).toEqual([
      'Portable UI → idiomatic emit',
      'Domain stays in shared_modules',
      'Data plane: Supabase',
    ])
    expect(
      NUC_HOME_PILLARS.every(
        (p) =>
          !/\$200k|70%|9 months/i.test(`${p.title} ${p.outcome} ${p.proof}`)
      )
    ).toBe(true)
  })
})

describe('home compiler emit snippets', () => {
  it('shows InboxBadge with distinct idioms per shell', () => {
    expect(NUC_HOME_COMPILER_SOURCE.file).toBe('InboxBadge.nuc.tsx')
    expect(NUC_HOME_COMPILER_SOURCE.snippet.join('\n')).toContain(
      '#nuc-compiler/runtime'
    )
    expect(NUC_HOME_COMPILER_SOURCE.snippet.join('\n')).toContain('InboxBadge')

    const byId = Object.fromEntries(
      NUC_HOME_COMPILER_NODES.map((node) => [node.id, node])
    )

    expect(byId.vue?.file).toBe('InboxBadge.vue')
    expect(byId.vue?.snippet.join('\n')).toContain("from 'vue'")
    expect(byId.vue?.snippet.join('\n')).toContain('ref(3)')

    expect(byId.nuxt?.snippet.join('\n')).toContain('useState(')
    expect(byId.nuxt?.snippet.join('\n')).not.toContain("from 'vue'")

    expect(byId.react?.file).toBe('InboxBadge.tsx')
    expect(byId.react?.snippet.join('\n')).toContain('useCallback')

    expect(byId.next?.snippet.join('\n')).toContain('next/navigation')
    expect(byId.next?.snippet.join('\n')).toContain('usePathname')

    expect(byId.svelte?.snippet.join('\n')).toContain('$state')
    expect(byId.svelte?.snippet.join('\n')).toContain('$derived')

    expect(byId.astro?.snippet[0]).toBe('---')
    expect(byId.astro?.snippet.join('\n')).toContain('<script is:inline>')

    expect(byId.solid?.snippet.join('\n')).toContain('createSignal')
    expect(byId.solid?.snippet.join('\n')).toContain('createMemo')

    expect(NUC_HOME_COMPILER_NODES.map((node) => node.id)).toEqual([
      'vue',
      'react',
      'nuxt',
      'next',
      'astro',
      'svelte',
      'solid',
    ])
  })
})

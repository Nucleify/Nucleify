import { describe, expect, it } from 'vitest'

import {
  DEFAULT_HOME_SECTIONS,
  homeDocsHref,
  NUC_HOME_COMPILER_NODES,
  NUC_HOME_COMPILER_SOURCE,
  NUC_HOME_CONTACT_TYPES,
  NUC_HOME_PILLARS,
  NUC_HOME_SHELLS,
  nucHomeShellArcs,
  nucHomeShellLine,
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

describe('home shells chart', () => {
  it('matches investor equal-shell donut: seven frameworks, one nucleus', () => {
    expect(NUC_HOME_SHELLS).toHaveLength(7)
    expect(nucHomeShellLine()).toBe(
      'Vue · Nuxt · React · Next · Astro · Svelte · Solid'
    )
    expect(NUC_HOME_SHELLS.map((shell) => shell.id)).toEqual([
      'vue',
      'nuxt',
      'react',
      'next',
      'astro',
      'svelte',
      'solid',
    ])
    expect(nucHomeShellArcs().map((arc) => arc.id)).toEqual([
      'vue',
      'nuxt',
      'react',
      'next',
      'astro',
      'svelte',
      'solid',
    ])
    expect(nucHomeShellArcs().find((arc) => arc.id === 'react')?.color).toBe(
      '#61dafb'
    )
    expect(nucHomeShellArcs().find((arc) => arc.id === 'next')?.color).toBe(
      '#e8e8e8'
    )
    expect(nucHomeShellArcs().find((arc) => arc.id === 'solid')?.color).toBe(
      '#2c4f7c'
    )
    expect(
      nucHomeShellArcs().every(
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
      'Any framework → any other',
      'One business core. Many hosts.',
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
  it('shows InboxBadge with distinct idioms per framework', () => {
    expect(NUC_HOME_COMPILER_SOURCE.file).toBe('InboxBadge.vue')
    expect(NUC_HOME_COMPILER_SOURCE.snippet.join('\n')).toContain('defineProps')
    expect(NUC_HOME_COMPILER_SOURCE.snippet.join('\n')).toContain('nui-button')

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

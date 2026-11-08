export const NUC_DOCS_ORIGIN = 'https://docs.nucleify.io'
export const NUC_PLAY_ORIGIN = 'https://play.nucleify.io'
export const NUC_CLI_ORIGIN = 'https://cli.nucleify.io'

export function docsPageHref(lang: string, pathWithinDocs: string): string {
  const path = pathWithinDocs.replace(/^\/+/, '')
  return `${NUC_DOCS_ORIGIN}/${lang}/docs/${path}`
}

export function homePlayHref(): string {
  return NUC_PLAY_ORIGIN
}

export function homeCliHref(): string {
  return NUC_CLI_ORIGIN
}

export interface NucHomePillar {
  icon: string
  index: string
  title: string
  description: string
  outcome: string
  proof: string
}

export interface NucHomeWebShareSlice {
  id: string
  label: string
  pct: number
}

export interface NucHomeWebShareGroup {
  id: string
  label: string
  color: string
  sliceIds: readonly string[]
}

export interface NucHomeWebShareArc {
  id: string
  label: string
  d: string
  color: string
}

/**
 * Relative origin counts among Nucleify emit targets - not % of all websites.
 * HTTP Archive (Jul 2026) for React / Next / Vue / Nuxt / Svelte / Astro;
 * Solid from Wappalyzer live-site count, scaled to the same unit (thousands).
 * Family pairs share one wedge and one color: React/Next blue, Vue/Nuxt green.
 */
export const NUC_HOME_WEB_SHARE = {
  cx: 50,
  cy: 50,
  radius: 46,
  innerRadius: 30,
  gapDeg: 1.6,
  slices: [
    { id: 'react', label: 'React', pct: 1306 },
    { id: 'next', label: 'Next.js', pct: 358 },
    { id: 'vue', label: 'Vue', pct: 610 },
    { id: 'nuxt', label: 'Nuxt', pct: 93 },
    { id: 'astro', label: 'Astro', pct: 41 },
    { id: 'svelte', label: 'Svelte', pct: 90 },
    { id: 'solid', label: 'Solid', pct: 19 },
  ],
  groups: [
    {
      id: 'react-next',
      label: 'React & Next.js',
      color: '#61dafb',
      sliceIds: ['react', 'next'],
    },
    {
      id: 'vue-nuxt',
      label: 'Vue & Nuxt',
      color: '#42b883',
      sliceIds: ['vue', 'nuxt'],
    },
    { id: 'astro', label: 'Astro', color: '#ff5d01', sliceIds: ['astro'] },
    { id: 'svelte', label: 'Svelte', color: '#ff3e00', sliceIds: ['svelte'] },
    { id: 'solid', label: 'Solid', color: '#72b7eb', sliceIds: ['solid'] },
  ],
} as const satisfies {
  cx: number
  cy: number
  radius: number
  innerRadius: number
  gapDeg: number
  slices: readonly NucHomeWebShareSlice[]
  groups: readonly NucHomeWebShareGroup[]
}

export function nucHomeWebShareLine(): string {
  return NUC_HOME_WEB_SHARE.groups.map((group) => group.label).join(' · ')
}

export function nucHomeWebShareLegend(): Array<{
  id: string
  label: string
  color: string
}> {
  return NUC_HOME_WEB_SHARE.groups.map((group) => ({
    id: group.id,
    label: group.label,
    color: group.color,
  }))
}

function polar(
  cx: number,
  cy: number,
  r: number,
  deg: number
): { x: number; y: number } {
  const rad = (deg * Math.PI) / 180
  return {
    x: Number((cx + r * Math.cos(rad)).toFixed(3)),
    y: Number((cy + r * Math.sin(rad)).toFixed(3)),
  }
}

function annularSector(
  cx: number,
  cy: number,
  rInner: number,
  rOuter: number,
  start: number,
  end: number
): string {
  const sweep = end - start
  const large = sweep > 180 ? 1 : 0
  const outerStart = polar(cx, cy, rOuter, start)
  const outerEnd = polar(cx, cy, rOuter, end)
  const innerEnd = polar(cx, cy, rInner, end)
  const innerStart = polar(cx, cy, rInner, start)
  return [
    `M${outerStart.x} ${outerStart.y}`,
    `A${rOuter} ${rOuter} 0 ${large} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L${innerEnd.x} ${innerEnd.y}`,
    `A${rInner} ${rInner} 0 ${large} 0 ${innerStart.x} ${innerStart.y}`,
    'Z',
  ].join(' ')
}

export function nucHomeWebShareArcs(): NucHomeWebShareArc[] {
  const { cx, cy, radius, innerRadius, gapDeg, slices, groups } =
    NUC_HOME_WEB_SHARE
  const byId = Object.fromEntries(slices.map((slice) => [slice.id, slice]))
  const packed = groups.map((group) => {
    const weight = group.sliceIds.reduce((sum, id) => sum + byId[id]!.pct, 0)
    return { group, weight }
  })
  const total = packed.reduce((sum, item) => sum + item.weight, 0)
  let cursor = -90
  return packed.map(({ group, weight }) => {
    const sweep = (weight / total) * 360
    const pad = Math.min(gapDeg / 2, sweep / 6)
    const start = cursor + pad
    const end = cursor + sweep - pad
    cursor += sweep
    return {
      id: group.id,
      label: group.label,
      d: annularSector(cx, cy, innerRadius, radius, start, end),
      color: group.color,
    }
  })
}

export interface NucHomeStackItem {
  label: string
  detail: string
  icon: string
  color: string
  command: string
}

export const NUC_HOME_SEO = {
  title:
    'Nucleify - Migrate Between Frontend Frameworks Without Rewriting Business Logic',
  description:
    'Author shared TypeScript modules and portable UI once. Emit idiomatic Next.js, Nuxt, Astro, Svelte, or Solid - with a shared Supabase gateway. Zero runtime overhead. Zero vendor lock-in.',
  ogImage: 'https://nucleify.io/img/og-image.png',
} as const

export const NUC_HOME_DOCS = {
  intro: 'getting-started/introduction',
  install: 'getting-started/installation',
  compiler: 'core-concepts/compiler',
  cli: 'core-concepts/cli',
  playground: 'core-concepts/playground',
  overrides: 'core-concepts/overriding',
  modules: 'core-concepts/modules',
} as const

export function homeDocsHref(
  lang: string,
  page: keyof typeof NUC_HOME_DOCS
): string {
  return docsPageHref(lang, NUC_HOME_DOCS[page])
}

export function homeThankYouHref(lang: string): string {
  return `/${lang}/thank-you`
}

export function homeHref(lang: string): string {
  return `/${lang}/home`
}

export function homeInvestorHref(lang: string): string {
  return `/${lang}/investor`
}

export const NUC_HOME_COPY = {
  brand: 'Nucleify',
  heroEyebrow: 'IR emit · shared TypeScript',
  headlineLead: 'Keep the product.',
  headlineTrail: 'Migrate the framework.',
  support:
    'Author portable UI and domain logic in shared TypeScript. Emit idiomatic Next.js, Nuxt, Astro, Svelte, or Solid - Supabase gateway and SQL stay in shared_modules. Zero runtime. You own the emit.',
  ctaPrimary: 'Open Playground',
  ctaSecondary: 'Integrate our CLI',
  playgroundHref: 'https://play.nucleify.io',
  cliHref: 'https://cli.nucleify.io',
  githubHref: 'https://github.com/Nucleify/Nucleify',
  heroSignal: 'multi-runtime',
  heroPanelTitle: '~/nucleify',
  heroPanelRunning: 'booting framework…',
  heroPanelDone: 'ready',
  heroInstallLabel: 'Get running',
  navDocs: 'Docs',
  navPlay: 'Playground',
  navCli: 'CLI',
  navPlayground: 'Playground',
  navGitHub: 'GitHub',
  navLogin: 'Login',
  navMenu: 'Menu',
  navClose: 'Close',
  sectionsLabel: 'Sections',
  pillarsEyebrow: 'What you actually ship',
  pillarsTitle: 'One TypeScript nucleus. Framework shells are output.',
  pillarsSupport:
    'Write once in shared_modules and portable .nuc sources. Emit commit-ready UI for seven stacks, keep the same typed API client, and route every shell through one Supabase gateway.',
  pillarsCta: 'Pick a shell',
  pillarsShareUnit: 'emit targets',
  pillarsShareSource: 'One IR surface. Seven framework shells.',
  stackEyebrow: 'Framework = build target',
  stackTitle: 'Single Source of Truth\nin Pure TypeScript.',
  stackSupport:
    'Domain logic, auth helpers, and state live in shared TypeScript. Pick a shell with make web target=… - emit stays human-readable with zero runtime wrappers.',
  stackCta: 'Clone and run',
  stackStageLabel: 'active framework',
  pulseEyebrow: 'Same nucleus',
  pulseTitleLead: 'Seven shells.',
  pulseTitleTrail: 'One product core.',
  pulseSupport:
    'Add another framework shell without rewriting shared modules. Domain types, Supabase handlers, and portable UI stay put - only the host changes.',
  pulseCta: 'Get in touch',
  pulseCompare:
    'Nucleify keeps your TypeScript core intact and converts the framework shell. Emitted source is yours to commit.',
  pulseTraditionalLabel: 'traditional',
  pulseNucleifyLabel: 'nucleify',
  pulseShellsAxis: 'frameworks online',
  pulseStatus: '7 frameworks · zero runtime',
  pulseScaling: 'Scaling',
  pulseCostSuffix: '×',
  pulseUnitLabel: 'product surface',
  coreEyebrow: 'One installable unit',
  coreTitle: 'A module is a product slice.',
  coreSupport:
    'API, Supabase SQL, and UI in one nuc_* package. Drop it on the gateway - every framework stays aligned.',
  coreCta: 'See the modules',
  coreDocsCta: 'Read modules docs',
  coreLaneSdk: 'sdk',
  coreLaneData: 'data',
  coreLaneUi: 'ui',
  coreLive: 'seven frameworks · one module',
  coreInspect: 'live slice',
  startEyebrow: 'Shared nucleus + Supabase',
  startTitle: 'A module is a product slice.',
  startCta: 'Get in touch',
  cloneEyebrow: 'Get running',
  cloneTitleLead: 'Clone the nucleus.',
  cloneTitleTrail: 'Open the Nuxt shell.',
  cloneSupport:
    'Four commands from the repo root.\nThen open localhost, read the docs, or ping us if you want a guided PoC.',
  cloneCta: 'Read the docs',
  cloneCtaNext: 'Star on GitHub',
  closeTitle: 'Migrate without rewriting your domain.',
  closeSupport:
    'Moving Vue → React, Nuxt → Next, or evaluating Svelte/Astro? Tell us where you are and where you want to land - we reply with a concrete next step.',
  closeCta: 'Talk through a migration',
  compilerEyebrow: 'Code you would commit',
  compilerTitleLead: 'Author once.',
  compilerTitleTrail: 'Emit idioms.',
  compilerSupport:
    'Portable .nuc sources compile to React hooks, Vue composables, or Svelte runes - readable source you would actually merge. Domain and Supabase stay in shared_modules beside the UI.',
  compilerHub: '.nuc',
  compilerHubLabel: 'author',
  compilerEmitLabel: 'emit',
  compilerCta: 'Read compiler docs',
  closeModalTitle: 'Tell us about the move',
  closeModalSupport:
    'Current stack, target shell, timeline - we reply with a concrete next step.',
  closeNameLabel: 'Name / organisation',
  closeNamePlaceholder: 'Alex at Acme',
  closeEmailLabel: 'Work email',
  closeEmailPlaceholder: 'you@company.com',
  closeTypeLabel: 'What do you need?',
  closeTypePlaceholder: 'Choose one',
  closeNoteLabel: 'Project note',
  closeNotePlaceholder:
    'Stack today, target framework, timeline, and what success looks like…',
  closeSubmit: 'Send message',
  closeCancel: 'Back',
  closeSending: 'Sending…',
  closeSuccess: 'Message sent. We will reply within 24h.',
  closeErrorGeneric: 'Could not send. Please try again.',
  closeErrorEmail: 'Enter a valid email address.',
  closeErrorType: 'Pick what you need.',
  closeErrorMessage: 'Message is too long.',
  thankYouEyebrow: 'Sent',
  thankYouTitle: 'Thanks - we got it.',
  thankYouSupport:
    'We reply within 24h with a concrete next step and your migration assessment.',
  thankYouCta: 'Back to Nucleify',
  thankYouInvestCta: 'Invest in us?',
  thankYouCubeCaption: 'Nucleus online',
  thankYouProof: ['Reply within 24h', 'Concrete next step', 'Zero lock-in PoC'],
  thankYouSeoTitle: 'Thank you - Nucleify',
  thankYouSeoDescription:
    'Your message was sent. Nucleify will reply within 24 hours.',
} as const

export const NUC_HOME_INSTALL_STEPS = [
  'git clone https://github.com/Nucleify/Nucleify.git',
  'make setup',
  'make web',
  'make admin',
] as const

/** Values stay API-stable; labels are developer-intent. */
export const NUC_HOME_CONTACT_TYPES = [
  { label: 'Migrate an existing app to another framework', value: 'landing' },
  { label: 'Explore a guided migration', value: 'business' },
  { label: 'Enterprise migration support & Code Escrow', value: 'blog' },
  { label: 'Contribute / Open source inquiry', value: 'help' },
] as const

export interface NucHomeHeroShell {
  id: string
  label: string
  command: string
  result: string
  icon: string
  color: string
}

export const NUC_HOME_HERO_SHELLS: NucHomeHeroShell[] = [
  {
    id: 'nuxt',
    label: 'Nuxt',
    command: 'make web target=NUXT',
    result: 'nuxt product · online',
    icon: 'simple-icons:nuxtdotjs',
    color: '#00dc82',
  },
  {
    id: 'next',
    label: 'Next',
    command: 'make web target=NEXT',
    result: 'next product · online',
    icon: 'simple-icons:nextdotjs',
    color: '#e8e8e8',
  },
  {
    id: 'astro',
    label: 'Astro',
    command: 'make web target=ASTRO',
    result: 'astro docs host · online',
    icon: 'simple-icons:astro',
    color: '#ff5d01',
  },
  {
    id: 'svelte',
    label: 'Svelte',
    command: 'make web target=SVELTE',
    result: 'reactive ui · online',
    icon: 'simple-icons:svelte',
    color: '#ff3e00',
  },
  {
    id: 'solid',
    label: 'Solid',
    command: 'make web target=SOLID',
    result: 'fine-grained ui · online',
    icon: 'simple-icons:solid',
    color: '#72b7eb',
  },
]

export const NUC_HOME_SECTIONS = [
  { id: 'intro', label: 'Intro' },
  { id: 'compiler', label: 'Emit' },
  { id: 'architecture', label: 'Ship' },
  { id: 'stack', label: 'Stack' },
  { id: 'clone', label: 'Clone' },
  { id: 'start', label: 'Contact' },
] as const

export type NucHomeModuleLaneId = 'sdk' | 'data' | 'ui'

export interface NucHomeModuleLane {
  id: NucHomeModuleLaneId
  title: string
  path: string
  detail: string
}

export interface NucHomeModule {
  id: string
  name: string
  icon: string
  note: string
  lanes: NucHomeModuleLane[]
}

export const NUC_HOME_MODULES: NucHomeModule[] = [
  {
    id: 'api',
    name: 'nuc_api',
    icon: 'mdi:api',
    note: 'Typed client + Supabase gateway. Every framework.',
    lanes: [
      {
        id: 'sdk',
        title: 'Typed client',
        path: 'shared_modules/nuc_api/utils/api_request.ts',
        detail: 'One helper.\nTyped end to end.',
      },
      {
        id: 'data',
        title: 'Supabase gateway',
        path: 'shared_modules/nuc_api/supabase/api/gateway_dispatch.ts',
        detail: 'Nitro hands off to nuc_*.\nNo second backend.',
      },
      {
        id: 'ui',
        title: 'Feedback',
        path: 'shared_modules/nuc_api/utils/use_toast.ts',
        detail: 'Toasts ride with the API.\nAuth UI included.',
      },
    ],
  },
  {
    id: 'colors',
    name: 'nuc_colors',
    icon: 'mdi:palette-outline',
    note: 'Tokens in, brand on top.',
    lanes: [
      {
        id: 'sdk',
        title: 'Design tokens',
        path: 'shared_modules/nuc_colors/styles/variables/_index.scss',
        detail: 'One token file.\nBrand paints on top.',
      },
      {
        id: 'data',
        title: 'Theme sync',
        path: 'shared_modules/nuc_colors/supabase/api/handle.ts',
        detail: 'Preferences land in Supabase.\nUser and system.',
      },
      {
        id: 'ui',
        title: 'Color picker',
        path: 'shared_modules/nuc_colors/components/color-picker',
        detail: 'Ship the picker.\nSwap the brand.',
      },
    ],
  },
  {
    id: 'languages',
    name: 'nuc_languages',
    icon: 'mdi:translate',
    note: 'Copy, locale, one table.',
    lanes: [
      {
        id: 'sdk',
        title: 'Locale load',
        path: 'shared_modules/nuc_languages/utils/fetch_locale_messages.ts',
        detail: 'Fetch catalogs once.\nKeys stay aligned.',
      },
      {
        id: 'data',
        title: 'Translations',
        path: 'shared_modules/nuc_languages/supabase/api/handle.ts',
        detail: 'Copy lives in Supabase.\nSeeded per locale.',
      },
      {
        id: 'ui',
        title: 'Catalog',
        path: 'shared_modules/nuc_languages/constants/languages.ts',
        detail: 'Locales the picker shows.\nOne shared list.',
      },
    ],
  },
  {
    id: 'stores',
    name: 'nuc_stores',
    icon: 'mdi:database-outline',
    note: 'Shared state. Shared verbs.',
    lanes: [
      {
        id: 'sdk',
        title: 'Shared barrel',
        path: 'shared_modules/nuc_stores/index.ts',
        detail: 'Shared verbs.\nShared barrel.',
      },
      {
        id: 'data',
        title: 'Persist',
        path: 'shared_modules/nuc_stores/cookie/set_item/index.ts',
        detail: 'Cookie, local, session.\nOne set/get.',
      },
      {
        id: 'ui',
        title: 'Primitives',
        path: 'shared_modules/nuc_stores/zustand/use_boolean_store.ts',
        detail: 'Tiny building blocks.\nNo per-app rewrites.',
      },
    ],
  },
  {
    id: 'dark',
    name: 'nuc_dark_mode',
    icon: 'mdi:weather-night',
    note: 'Load. Remember. Apply.',
    lanes: [
      {
        id: 'sdk',
        title: 'useDarkMode',
        path: 'shared_modules/nuc_dark_mode/utils/use_dark_mode.ts',
        detail: 'Composable and hook.\nOne preference.',
      },
      {
        id: 'data',
        title: 'SSR lock',
        path: 'shared_modules/nuc_dark_mode/plugins/dark_mode.server.ts',
        detail: 'Locked before paint.\nNo theme flash.',
      },
      {
        id: 'ui',
        title: 'Apply',
        path: 'shared_modules/nuc_dark_mode/utils/apply_dark_mode.ts',
        detail: 'Class plus tokens.\nUI follows along.',
      },
    ],
  },
  {
    id: 'globals',
    name: 'nuc_globals',
    icon: 'mdi:earth',
    note: 'Breakpoints, types, global SCSS.',
    lanes: [
      {
        id: 'sdk',
        title: 'Media helpers',
        path: 'shared_modules/nuc_globals/media/utils/is_mobile.ts',
        detail: 'Shared helpers every shell already imports.',
      },
      {
        id: 'data',
        title: 'Register',
        path: 'shared_modules/nuc_globals/nuc_globals.ts',
        detail: 'Types, media, and globals - booted once.',
      },
      {
        id: 'ui',
        title: 'Global styles',
        path: 'shared_modules/nuc_globals/styles/_index.scss',
        detail: 'Shared SCSS DNA every shell speaks.',
      },
    ],
  },
]

export type NucHomeSectionId = (typeof NUC_HOME_SECTIONS)[number]['id']

export const NUC_HOME_PILLARS: NucHomePillar[] = [
  {
    icon: 'mdi:file-code-outline',
    index: '01',
    title: 'Portable UI → idiomatic emit',
    description:
      'Author presentational UI once in *.nuc.tsx. The IR compiler emits commit-ready Vue SFCs, React hooks, Svelte runes, Solid, or Astro - no runtime wrappers in the bundle.',
    outcome: '*.nuc.tsx → InboxBadge.vue / .tsx',
    proof: 'pnpm compiler -- emit',
  },
  {
    icon: 'mdi:package-variant',
    index: '02',
    title: 'Domain stays in shared_modules',
    description:
      'Validation, session helpers, and the typed API client live in nuc_* packages. Framework shells only consume them - Next and Nuxt share the same contracts.',
    outcome: 'Same types on every shell',
    proof: 'api_request.ts',
  },
  {
    icon: 'mdi:database-outline',
    index: '03',
    title: 'Data plane: Supabase',
    description:
      'Each module can ship SQL migrations, Nitro gateway handlers, and UI together. Every generated shell hits the same Supabase-backed gateway - auth and tables stay with the nucleus.',
    outcome: 'SQL + handlers + UI in nuc_*',
    proof: 'gateway_dispatch.ts',
  },
]

export const NUC_HOME_STACK: NucHomeStackItem[] = [
  {
    label: 'Vue',
    detail: 'Composition API',
    icon: 'simple-icons:vuedotjs',
    color: '#42b883',
    command: 'make web target=VUE',
  },
  {
    label: 'React',
    detail: 'App components',
    icon: 'simple-icons:react',
    color: '#61dafb',
    command: 'make web target=REACT',
  },
  {
    label: 'Nuxt',
    detail: 'Vue SSR',
    icon: 'simple-icons:nuxtdotjs',
    color: '#00dc82',
    command: 'make web target=NUXT',
  },
  {
    label: 'Next',
    detail: 'React App Router',
    icon: 'simple-icons:nextdotjs',
    color: '#e8e8e8',
    command: 'make web target=NEXT',
  },
  {
    label: 'Astro',
    detail: 'Docs host',
    icon: 'simple-icons:astro',
    color: '#ff5d01',
    command: 'make web target=ASTRO',
  },
  {
    label: 'Svelte',
    detail: 'Reactive UI',
    icon: 'simple-icons:svelte',
    color: '#ff3e00',
    command: 'make web target=SVELTE',
  },
  {
    label: 'Solid',
    detail: 'Fine-grained UI',
    icon: 'simple-icons:solid',
    color: '#72b7eb',
    command: 'make web target=SOLID',
  },
]

export interface NucHomeCompilerNode {
  id: string
  label: string
  icon: string
  color: string
  command: string
  file: string
  snippet: string[]
  /** Percent position in the graph stage (0-100). */
  x: number
  y: number
}

const SNIPPET_VUE = [
  '<script setup lang="ts">',
  "import { ref, computed } from 'vue'",
  '',
  'const props = defineProps<{ inbox: string }>()',
  'const unread = ref(3)',
  'const label = computed(() =>',
  '  unread.value ? `${props.inbox}: ${unread.value}`',
  "    : 'Caught up')",
  'function clear() { unread.value = 0 }',
  '</script>',
  '',
  '<template>',
  '  <nui-button variant="filled" @click="clear">',
  '    {{ label }}',
  '  </nui-button>',
  '</template>',
]

const SNIPPET_NUXT = [
  '<script setup lang="ts">',
  'const props = defineProps<{ inbox: string }>()',
  "const unread = useState('inbox', () => 3)",
  'const label = computed(() =>',
  '  unread.value ? `${props.inbox}: ${unread.value}`',
  "    : 'Caught up')",
  '</script>',
  '',
  '<template>',
  '  <nui-button variant="filled" @click="unread = 0">',
  '    {{ label }}',
  '  </nui-button>',
  '</template>',
]

const SNIPPET_REACT = [
  "'use client'",
  "import { useState, useMemo, useCallback } from 'react'",
  '',
  'type Props = { inbox: string }',
  '',
  'export default function InboxBadge({ inbox }: Props) {',
  '  const [unread, setUnread] = useState(3)',
  '  const label = useMemo(',
  "    () => (unread ? `${inbox}: ${unread}` : 'Caught up'),",
  '    [unread, inbox])',
  '  const clear = useCallback(() => setUnread(0), [])',
  '  return (',
  '    <NuiButton variant="filled" onClick={clear}>',
  '      {label}',
  '    </NuiButton>',
  '  )',
  '}',
]

const SNIPPET_NEXT = [
  "'use client'",
  "import { useState, useMemo } from 'react'",
  "import { usePathname } from 'next/navigation'",
  '',
  'type Props = { inbox: string }',
  '',
  'export default function InboxBadge({ inbox }: Props) {',
  '  const path = usePathname()',
  '  const [unread, setUnread] = useState(3)',
  '  const label = useMemo(() =>',
  "    `${unread ? `${inbox}: ${unread}` : 'Caught up'} · ${path}`,",
  '    [unread, inbox, path])',
  '  return (',
  '    <NuiButton variant="filled" onClick={() => setUnread(0)}>',
  '      {label}',
  '    </NuiButton>',
  '  )',
  '}',
]

const SNIPPET_SVELTE = [
  '<script lang="ts">',
  '  type Props = { inbox: string }',
  '  let { inbox }: Props = $props()',
  '  let unread = $state(3)',
  '  let label = $derived(',
  "    unread ? `${inbox}: ${unread}` : 'Caught up')",
  '</script>',
  '',
  '<nui-button variant="filled" onclick={() => (unread = 0)}>',
  '  {label}',
  '</nui-button>',
]

const SNIPPET_ASTRO = [
  '---',
  'interface Props { inbox: string }',
  'const { inbox } = Astro.props',
  '---',
  '',
  '<nui-button id="badge" variant="filled" data-inbox={inbox}>',
  '  {inbox}: 3',
  '</nui-button>',
  '',
  '<script is:inline>',
  "  const el = document.getElementById('badge')",
  '  let unread = 3',
  '  const paint = () => {',
  "    const box = el?.dataset.inbox ?? ''",
  "    if (el) el.textContent = unread ? `${box}: ${unread}` : 'Caught up'",
  '  }',
  '  el?.addEventListener("click", () => { unread = 0; paint() })',
  '</script>',
]

const SNIPPET_SOLID = [
  "import { createSignal, createMemo } from 'solid-js'",
  '',
  'type Props = { inbox: string }',
  '',
  'export default function InboxBadge(props: Props) {',
  '  const [unread, setUnread] = createSignal(3)',
  '  const label = createMemo(() =>',
  '    unread() ? `${props.inbox}: ${unread()}`',
  "      : 'Caught up')",
  '  return (',
  '    <nui-button variant="filled" onClick={() => setUnread(0)}>',
  '      {label()}',
  '    </nui-button>',
  '  )',
  '}',
]

export const NUC_HOME_COMPILER_SOURCE = {
  file: 'InboxBadge.nuc.tsx',
  snippet: [
    'import { component, state, derived, handler }',
    "  from '#nuc-compiler/runtime'",
    '',
    'export default component({',
    "  name: 'InboxBadge',",
    "  props: { inbox: { type: 'string' } },",
    '  setup(props) {',
    '    const unread = state(3)',
    '    const label = derived(() =>',
    '      unread.value',
    '        ? `${props.inbox}: ${unread.value}`',
    "        : 'Caught up')",
    '    const clear = handler(() => unread.set(0))',
    '    return () => (',
    '      <nui-button variant="filled" onClick={clear}>',
    '        {label.value}',
    '      </nui-button>',
    '    )',
    '  },',
    '})',
  ],
} as const

/** Framework targets around the portable `.nuc` hub (Vite-style emit graph). */
export const NUC_HOME_COMPILER_NODES: NucHomeCompilerNode[] = [
  {
    id: 'vue',
    label: 'Vue',
    icon: 'simple-icons:vuedotjs',
    color: '#42b883',
    command: 'make web target=VUE',
    file: 'InboxBadge.vue',
    snippet: SNIPPET_VUE,
    x: 26,
    y: 28,
  },
  {
    id: 'react',
    label: 'React',
    icon: 'simple-icons:react',
    color: '#61dafb',
    command: 'make web target=REACT',
    file: 'InboxBadge.tsx',
    snippet: SNIPPET_REACT,
    x: 74,
    y: 28,
  },
  {
    id: 'nuxt',
    label: 'Nuxt',
    icon: 'simple-icons:nuxtdotjs',
    color: '#00dc82',
    command: 'make web target=NUXT',
    file: 'InboxBadge.vue',
    snippet: SNIPPET_NUXT,
    x: 18,
    y: 52,
  },
  {
    id: 'next',
    label: 'Next',
    icon: 'simple-icons:nextdotjs',
    color: '#e8e8e8',
    command: 'make web target=NEXT',
    file: 'InboxBadge.tsx',
    snippet: SNIPPET_NEXT,
    x: 82,
    y: 52,
  },
  {
    id: 'astro',
    label: 'Astro',
    icon: 'simple-icons:astro',
    color: '#ff5d01',
    command: 'make web target=ASTRO',
    file: 'InboxBadge.astro',
    snippet: SNIPPET_ASTRO,
    x: 34,
    y: 74,
  },
  {
    id: 'svelte',
    label: 'Svelte',
    icon: 'simple-icons:svelte',
    color: '#ff3e00',
    command: 'make web target=SVELTE',
    file: 'InboxBadge.svelte',
    snippet: SNIPPET_SVELTE,
    x: 66,
    y: 74,
  },
  {
    id: 'solid',
    label: 'Solid',
    icon: 'simple-icons:solid',
    color: '#72b7eb',
    command: 'make web target=SOLID',
    file: 'InboxBadge.tsx',
    snippet: SNIPPET_SOLID,
    x: 50,
    y: 88,
  },
]

export const NUC_HOME_PULSE_SHELLS = [
  'Vue',
  'React',
  'Nuxt',
  'Next',
  'Astro',
  'Svelte',
  'Solid',
] as const
